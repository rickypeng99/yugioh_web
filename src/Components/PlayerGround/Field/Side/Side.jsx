import React, { Component } from "react";
import { connect } from 'react-redux';
import CardView from "../../../Card/CardView";
import { ENVIRONMENT, CARD_TYPE, SIDE, CARD_POS} from '../../../Card/utils/constant';
import { CARD_SELECT_TYPE, MONSTER_ATTACK_TYPE, PHASE, DST_DIRECT_ATTACK } from '../../utils/constant'
import { left_panel_mouse_in } from '../../../../Store/actions/mouseActions';
import { CSSTransitionGroup } from 'react-transition-group' // ES6
import { is_monster, is_spell, is_trap } from '../../../Card/utils/utils'
import './Side.css'
import { calculate_battle_style } from '../utils'
import { perform_attack } from '../../../../Store/actions/environmentActions'
import { direct_attack, end_battle, opponent_attack_ack, others_attack } from "../../../../Store/actions/battleMetaActions";
import { get_unique_id_from_ennvironment } from "../../utils/utils";

/**
 * Field for each player
 */
class Side extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            cardClicked: -1,
            // change this style to make the card move
            cardBattleStyle: {
                cardIndex: -1
            },
        }
    }

    onMouseEnterHandler = (info) => {
        if (info.cardEnv.card) {
            this.props.mouse_in_view(info);
        }
    }

    
    onCardClickHandler = (info, cardIndex) => {
        // clicking the card on the field
        if (!info.cardEnv.card) {
            return
        }

        this.setState({cardClicked: cardIndex})
    }
    
    cardMouseMoveHandler = () => {
        this.setState({cardClicked: -1})
    }

    monsterAttackOnClick = (attack_type, info) => {

        if (attack_type == MONSTER_ATTACK_TYPE.DIRECT_ATTACK) {
            // direct attack
            const info_battle = {
                src_monster: get_unique_id_from_ennvironment(info.cardEnv),
                dst: DST_DIRECT_ATTACK,
            }
            this.props.dispatch_direct_attack(info_battle)

        } else {
            return new Promise((resolve, reject) => {
                const info_card_selector = {
                    resolve: resolve,
                    reject: reject,
                    cardEnv: info.cardEnv,
                    type: CARD_SELECT_TYPE.CARD_SELECT_BATTLE_SELECT
                }
                this.props.call_card_selector(info_card_selector)
            }).then((result) => {
                // battle start
                const info_battle = {
                    src_monster: get_unique_id_from_ennvironment(info.cardEnv),
                    // monster can only attack one monster
                    dst: result.cardEnvs[0],
                }
                console.log(info_battle)
                this.props.dispatch_others_attack(info_battle)
            })
        }
    }

    componentDidUpdate(prevProps) {
        const current_battle_animation = this.props.battle_animation;
        if (current_battle_animation.key && current_battle_animation.key != prevProps.battle_animation.key) {
            // perform animation
            this.setState({
                cardBattleStyle: {
                    ...calculate_battle_style(current_battle_animation),
                    side: current_battle_animation.side
                }
            })
        }

        // when the animation has finished
        if (this.state.cardBattleStyle.style) {
            setTimeout(() => this.setState({
                cardBattleStyle: {
                    cardIndex: -1
                }
            }), 300)
            
        }
    }

    returnAttackStatus = (cardEnv) => {

        const disabled_class = 'no_hand_option'
        const enabled_class = 'show_summon'

        // console.log(cardEnv.card)

        // if it is not battle phase or the card is not a monster
        if (!cardEnv.card || this.props.game_meta.current_phase != PHASE.BATTLE_PHASE || 
            !is_monster(cardEnv.card.card_type)) {
                return {
                    can_direct_attack: disabled_class,
                    can_others_attack: disabled_class
                }
        }

        // if there is no monster on enemy's field
        for (let monster of this.props.environment[SIDE.OPPONENT][ENVIRONMENT.MONSTER_FIELD]) {
            if (monster != CARD_TYPE.PLACEHOLDER) {
                return {
                    can_direct_attack: disabled_class,
                    can_others_attack: enabled_class
                }
            }
        }

        return {
            can_direct_attack: enabled_class,
            can_others_attack: disabled_class
        }
        
    }


    render() {
        let side_style = undefined
        const { cardBattleStyle } = this.state
        const { side } = this.props
        if (cardBattleStyle && cardBattleStyle.side && cardBattleStyle.side == side) {
            side_style = cardBattleStyle.side_style
        }

        return <div style={side_style} className={"side_box_" + side}>{this.initializeSide()}</div>;
    }

    initializeSide = () => {
        const { cardBattleStyle } = this.state;
        const { side, environment} = this.props;

        if (!environment) {
            return
        }
        let leftExtraIndex = [0, 7];
        let rightExtraIndex = [6, 13];
        let field_cards = []


        const cards = environment[side][ENVIRONMENT.MONSTER_FIELD].concat(environment[side][ENVIRONMENT.SPELL_FIELD])        
        let count = 0
        let styleIndex = -2
        for (let i = 0; i < 14; i++) {
            if (i == 0 || leftExtraIndex.includes(i) || rightExtraIndex.includes(i)) {
                if (i == 6) {
                    field_cards.push(environment[side][ENVIRONMENT.GRAVEYARD])
                } else {
                    field_cards.push(CARD_TYPE.PLACEHOLDER)
                }
            } else {
                if (count == cardBattleStyle.cardIndex && side == cardBattleStyle.side) {
                    styleIndex = i
                }
                field_cards.push(cards[count])
                count++
            }
        }

        return field_cards.map((cardEnv, index) => {
            const cardView = () => {
                if (index == 6 && cardEnv.length > 0) {
                    // graveyard
                    return (
                        <CardView card={cardEnv[cardEnv.length - 1]} key="side_card" />
                    )
                }

                if (index == 13) {
                    return (
                        <h1 className = "deck_remaining">
                            {environment[side][ENVIRONMENT.DECK].length}
                        </h1>
                    )
                }

                if (cardEnv.card) {
                    if (cardEnv.current_pos == CARD_POS.FACE) {
                        return (
                            <CardView style={index == styleIndex? cardBattleStyle.style : undefined} card={cardEnv} key="side_card" />
                        )
                    } else if (cardEnv.current_pos == CARD_POS.SET) {
                        return <img className="side_card_set" key="side_card_set" src={'https://ms.yugipedia.com//f/fd/Back-Anime-ZX-2.png'}/>
                    }
                }
            }
            const info = {
                cardEnv: cardEnv
            }


            const special_class = (index) => {
                if (leftExtraIndex.includes(index) || rightExtraIndex.includes(index)) {
                    return ' special_class'
                } else {
                    return ''
                }
            }

            const hasOptions = index == this.state.cardClicked ? "show_hand_option" : "no_hand_option"
            const {can_direct_attack, can_others_attack} = this.returnAttackStatus(cardEnv)



            return (
                <div className={"card_box"  + special_class(index)} 
                    key={"side-" + side + index} 
                    onMouseEnter={()=>this.onMouseEnterHandler(info)}
                    onClick={()=>this.onCardClickHandler(info, index)}
                    onMouseLeave={() => this.cardMouseMoveHandler()}>
                    
                    <div className={hasOptions}>
                        <div className={can_direct_attack} 
                            onClick={()=>this.monsterAttackOnClick(MONSTER_ATTACK_TYPE.DIRECT_ATTACK, info)}>
                                Direct Attack
                        </div>
                        <div className={can_others_attack}
                            onClick={()=>this.monsterAttackOnClick(MONSTER_ATTACK_TYPE.OTHERS_ATTACK, info)}>
                                Attack
                        </div>
                    </div>
                    
                    <div className={"card_mask" + (cardEnv.current_pos != CARD_POS.SET ? "" : " side_card_set")}/>
                    <CSSTransitionGroup
                    transitionName="side"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                        {cardView()}
                    </CSSTransitionGroup>

                </div>
            );
        });
    };
}

const mapStateToProps = state => {
    const { left_panel_cardEnv } = state.mouseReducer
    const { environment } = state.environmentReducer
    const { game_meta } = state.gameMetaReducer
    const { battle_meta } = state.battleMetaReducer
    return { left_panel_cardEnv, environment, game_meta, battle_meta};
};

const mapDispatchToProps = dispatch => ({
    // initialize: (environment) => dispatch(initialize_environment(environment)),
    mouse_in_view: (info) => dispatch(left_panel_mouse_in(info)),
    dispatch_direct_attack: (info) => dispatch(direct_attack(info)),
    dispatch_others_attack: (info) => dispatch(others_attack(info)),
    // opponent attack ack will change the battle step to damage step
    dispatch_change_to_damage_step: () => dispatch(opponent_attack_ack()),
    dispatch_perform_attack: (info) => dispatch(perform_attack(info)),
    dispatch_end_battle: () => dispatch(end_battle())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Side);