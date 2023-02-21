import React from 'react';
import { connect } from 'react-redux';
import { ENVIRONMENT, CARD_TYPE, SIDE} from '../../Card/utils/constant';
import { CARD_SELECT_TYPE, PHASE } from '../utils/constant'
import { is_monster, is_spell, is_trap } from '../../Card/utils/utils'
import CardView from '../../Card/CardView';
import { left_panel_mouse_in } from '../../../Store/actions/mouseActions';
import { TransitionGroup } from 'react-transition-group' // ES6

import Core from '../../../Core'

import './Hand.css'
import { get_unique_id_from_ennvironment } from '../utils/utils';
import { NORMAL_SUMMON, SET_SUMMON, TOOL_TYPE } from '../../../Store/actions/actionTypes';
import { show_tool } from '../../../Store/actions/toolActions';

class Hand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // which card in the hand is clicked (to show the options)
            cardClicked: -1,
        }
    }


    cardOnClickHandler = (cardIndex) => {
        this.setState({cardClicked: cardIndex})
    }

    cardMouseMoveHandler = () => {
        this.setState({cardClicked: -1})
    }

    summon_final = (info, type, event) => {
        const { environment, side } = this.props

        Core.Summon.summon(info, type, environment)

        this.setState({cardClicked: -1})
        event.stopPropagation();
    }

    summonOnclick = (info, type) => event => {
        const { environment } = this.props
        if (info.card.card.level > 4) {
            // tribute summon; Send a promise to call card selector
            return new Promise((resolve, reject) => {
                const info_show_tool = {
                    tool_type: TOOL_TYPE.CARD_SELECTOR,
                    info: {
                        resolve: resolve,
                        reject: reject,
                        cardEnv: info.card,
                        type: CARD_SELECT_TYPE.CARD_SELECT_TRIBUTE_SUMMON
                    }
                }
                // this.props.call_card_selector(info_card_selector)
                this.props.dispatch_show_tool(info_show_tool)
            }).then((result) => {
                Core.Summon.tribute(result.cardEnvs, SIDE.MINE, ENVIRONMENT.MONSTER_FIELD, environment)
                setTimeout(()=>this.summon_final(info, type, event), 500)
                
            })
        } else {
            this.summon_final(info, type, event)
        }
    }

    activateOnClick = (cardEnv) => event => {

        const { environment, call_card_selector} = this.props
        const tools = {
            call_card_selector: call_card_selector
        }

        for (const effect of cardEnv.card.effects) {
            if (effect.condition(environment)) {

                Core.Effect.activate(cardEnv, ENVIRONMENT.HAND, SIDE.MINE, environment)

                // TODO: remove the card from field to the graveyard
            }
        }

        this.setState({cardClicked: -1})
        event.stopPropagation()
    }

    onMouseEnterHandler = (info) => {
        if (info.cardEnv.card) {
            this.props.dispatch_mouse_in_view(info);
        }
    }

    render() {
        const {side, environment, game_meta} = this.props;
        let hand_array = []
        if (environment) {
            hand_array = side == SIDE.MINE ? environment[side][ENVIRONMENT.HAND].map((cardEnv, cardIndex) => {
                const hasOptions = cardIndex == this.state.cardClicked ? "show_hand_option" : "no_hand_option"
                const info_in = {
                    cardEnv: cardEnv
                }
                const get_hand_card_view = () => {
                    if (is_monster(cardEnv.card.card_type)) {
                        const can_normal_summon = cardEnv.card.can_normal_summon(cardEnv.card, environment) ? "show_summon" : "no_hand_option"
                        const can_set = cardEnv.card.can_normal_summon(cardEnv.card, environment) ? "show_summon" : "no_hand_option"
                        const can_special_summon = cardEnv.card.can_special_summon(cardEnv.card, environment)? "show_summon" : "no_hand_option"
                        const info = {
                            side: side,
                            card: cardEnv,
                            src_location: ENVIRONMENT.HAND
                        }
                        return (
                                <div>
                                    <div className={hasOptions}>
                                        <div className={can_normal_summon} onClick={this.summonOnclick(info, NORMAL_SUMMON)}>Summon</div>
                                        <div className={can_special_summon}>Special</div>
                                        <div className={can_set} onClick={this.summonOnclick(info, SET_SUMMON)}>Set</div>
                                    </div>
                                    <CardView card={cardEnv} />
                                </div>
                        )
                    } else if (is_spell(cardEnv.card.card_type)) {
                        //TODO: can activate the spell or not
                        const can_activate = Core.Effect.can_activate(cardEnv.card, environment) ? "show_summon" : "no_hand_option"
                        const can_set = game_meta.current_phase == PHASE.MAIN_PHASE_1 ? "show_summon" : "no_hand_option"
                        return (
                            <div>
                                <div className={hasOptions}>
                                    <div className={can_activate} onClick={this.activateOnClick(cardEnv)}>Activate</div>
                                    <div className={can_set}>Set</div>
                                </div>
                                <CardView card={cardEnv} />
                            </div>
                        )
                    } else {
                        //traps
                        return <p>fuck</p>
                    }
    
                }

                return (
                    <div className = "hand_card" key = {"hand_card_" + get_unique_id_from_ennvironment(cardEnv)} 
                        onClick={() => this.cardOnClickHandler(cardIndex)} 
                        onMouseLeave={() => this.cardMouseMoveHandler()} 
                        onMouseEnter={()=>this.onMouseEnterHandler(info_in)}>
                            {get_hand_card_view()}
                    </div>
                )


            }) : environment[side][ENVIRONMENT.HAND].map(() => {
                return (
                    // back side for the opponent's
                    <img style={{width: '5%', marginRight: '10px'}} src={'https://ms.yugipedia.com//f/fd/Back-Anime-ZX-2.png'}/>
                )
            })
        }
        return(
                
            <TransitionGroup
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
                className={side == SIDE.MINE ? "hand_container_mine" : "hand_container_opponent"}>
                {hand_array}
            </TransitionGroup>
        
        )
    }
}


const mapStateToProps = state => {
    const { left_panel_cardEnv } = state.mouseReducer
    const { environment } = state.environmentReducer
    const { game_meta } = state.gameMetaReducer
    return { left_panel_cardEnv, environment, game_meta };
};

const mapDispatchToProps = dispatch => ({
    // initialize: (environment) => dispatch(initialize_environment(environment)),
    dispatch_mouse_in_view: (info) => dispatch(left_panel_mouse_in(info)),
    dispatch_show_tool: (info) => dispatch(show_tool(info))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Hand);