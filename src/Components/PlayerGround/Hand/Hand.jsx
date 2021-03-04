import React from 'react';
import { connect } from 'react-redux';
import { ENVIRONMENT, CARD_TYPE, SIDE} from '../../Card/utils/constant';
import { CARD_SELECT_TYPE } from '../utils/constant'
import { is_monster, is_spell, is_trap } from '../../Card/utils/utils'
import CardView from '../../Card/CardView';
import { normal_summon, set_summon } from '../../../Store/actions/environmentActions';
import { left_panel_mouse_in } from '../../../Store/actions/mouseActions';
import { CSSTransitionGroup } from 'react-transition-group' // ES6

import './Hand.css'


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

    normal_summon_final = (info, event) => {
        this.props.dispatch_normal_summon(info)
        this.setState({cardClicked: -1})
        event.stopPropagation();
    }

    normalSummonOnclick = (info) => event => {
        if (info.card.card.level > 4) {
            // tribute summon; Send a promise to call card selector
            return new Promise((resolve, reject) => {
                const info_card_selector = {
                    resolve: resolve,
                    reject: reject,
                    cardEnv: info.card,
                    type: CARD_SELECT_TYPE.CARD_SELECT_TRIBUTE_SUMMON
                }
                this.props.call_card_selector(info_card_selector)
            }).then((result) => {
                this.normal_summon_final(info, event)
            })
        } else {
            this.normal_summon_final(info, event)
        }

    }

    setSummonOnclick = (info) => event =>{
        this.props.dispatch_set_summon(info)
        this.setState({cardClicked: -1})
        event.stopPropagation();

    }

    onMouseEnterHandler = (info) => {
        if (info.cardEnv.card) {
            this.props.mouse_in_view(info);
        }
    }

    render() {
        const {side, environment} = this.props;
        let hand_array = []
        if (environment) {
            hand_array = side == SIDE.MINE ? environment[side][ENVIRONMENT.HAND].map((cardEnv, cardIndex) => {
                if (is_monster(cardEnv.card.card_type)) {
                    const hasOptions = cardIndex == this.state.cardClicked ? "show_hand_option" : "no_hand_option"
                    const can_normal_summon = cardEnv.card.can_normal_summon(cardEnv.card, environment) ? "show_summon" : "no_hand_option"
                    const can_set = cardEnv.card.can_normal_summon(cardEnv.card, environment) ? "show_summon" : "no_hand_option"
                    const can_special_summon = cardEnv.card.can_special_summon(cardEnv.card, environment)? "show_summon" : "no_hand_option"
                    const info = {
                        side: side,
                        card: cardEnv,
                        index: cardIndex
                    }

                    const info_in = {
                        cardEnv: cardEnv
                    }
                    return (
                        <div className = "hand_card" key = {"hand_card_" + cardEnv.card.key + "_" + cardEnv.unique_count} onClick={() => this.cardOnClickHandler(cardIndex)} onMouseLeave={() => this.cardMouseMoveHandler()} onMouseEnter={()=>this.onMouseEnterHandler(info_in)}>
                            <div className={hasOptions}>
                                <div className={can_normal_summon} onClick={this.normalSummonOnclick(info)}>Summon</div>
                                <div className={can_special_summon}>Special</div>
                                <div className={can_set} onClick={this.setSummonOnclick(info)}>Set</div>
                            </div>
                            <CardView card={cardEnv} />
                        </div>
                    )
                } else if (is_spell(cardEnv.card.card_type)) {
                    return <p>fuck</p>
                } else {
                    //traps
                    return <p>fuck</p>
                }
            }) : environment[side][ENVIRONMENT.HAND].map(() => {
                return (
                    // back side for the opponent's
                    <img style={{width: '5%', marginRight: '10px'}} src={'https://ms.yugipedia.com//f/fd/Back-Anime-ZX-2.png'}/>
                )
            })
        }
        return(
                
            <CSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
                className={side == SIDE.MINE ? "hand_container_mine" : "hand_container_opponent"}>
                {hand_array}
            </CSSTransitionGroup>
        
        )
    }
}


const mapStateToProps = state => {
    const { left_panel_cardEnv } = state.mouseReducer
    const { environment } = state.environmentReducer
    return { left_panel_cardEnv, environment };
};

const mapDispatchToProps = dispatch => ({
    // initialize: (environment) => dispatch(initialize_environment(environment)),
    mouse_in_view: (info) => dispatch(left_panel_mouse_in(info)),
    dispatch_normal_summon: (info) => dispatch(normal_summon(info)),
    dispatch_set_summon: (info) => dispatch(set_summon(info)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Hand);