import React, { Component } from "react";
import { connect } from 'react-redux';
import CardView from "../../../Card/CardView";
import { ENVIRONMENT, CARD_TYPE, SIDE, CARD_POS} from '../../../Card/utils/constant';
import { CARD_SELECT_TYPE, MONSTER_ATTACK_TYPE, PHASE, DST_DIRECT_ATTACK } from '../../utils/constant'
import { left_panel_mouse_in } from '../../../../Store/actions/mouseActions';
import { TransitionGroup } from 'react-transition-group' // ES6
import './Side.css'
import { calculate_battle_style } from '../utils'
import { perform_attack } from '../../../../Store/actions/environmentActions'
import { direct_attack, end_battle, opponent_attack_ack, others_attack } from "../../../../Store/actions/battleMetaActions";
import { get_unique_id_from_ennvironment } from "../../utils/utils";
import { returnAttackStatus, constructFieldFromEnv, get_styled_index_from_environment, calculate_aim_style} from '../utils';
import { BATTLE_SELECT, ANIMATION_TYPE } from '../utils/constant'
import { is_spell } from "../../../Card/utils/utils";

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


    // mouse enter
    onMouseEnterHandler = (info) => {
        if (info.cardEnv.card) {
            this.props.mouse_in_view(info);
        } else {
            return
        }

        const { battle_selection, side } = this.props

        if (side == SIDE.OPPONENT && battle_selection?.cards) {
            const info_battle_select = {
                mouse_in: info.cardIndex
            }
            this.props.updateBattleSelection(BATTLE_SELECT.MOUSE_IN_SELECT, info_battle_select)
        } 

    }

    // mouse leave
    cardMouseMoveHandler = () => {
        const { battle_selection, side } = this.props
        if (side == SIDE.OPPONENT && battle_selection?.cards) {
            const info_battle_select = {
                mouse_in: -1
            }
            this.props.updateBattleSelection(BATTLE_SELECT.MOUSE_IN_SELECT, info_battle_select)
        }
        this.setState({cardClicked: -1})
    }

    
    onCardClickHandler = (info, cardIndex) => {
        // clicking the card on the field
        if (!info.cardEnv.card) {
            return
        }

        if (this.props?.battle_selection?.cards) {
            if (this.props.side == SIDE.OPPONENT) {
                // wait to pick a monster
                const info_battle_select = {
                    selection: get_unique_id_from_ennvironment(info.cardEnv)
                }
                this.props.updateBattleSelection(BATTLE_SELECT.CONFIRM_SELECT, info_battle_select)
            } 
            return
        }

        

        this.setState({cardClicked: cardIndex})
    }
    

    monsterAttackOnClick = (attack_type, info) => {

        const src_monster_id = get_unique_id_from_ennvironment(info.cardEnv)
        
        if (attack_type == MONSTER_ATTACK_TYPE.DIRECT_ATTACK) {
            // direct attack
            const info_battle = {
                src_monster: src_monster_id,
                dst: DST_DIRECT_ATTACK,
            }
            this.props.dispatch_direct_attack(info_battle)

        } else {
            const info_battle_select = {
                src_monster: src_monster_id,
                src_monster_index: info.cardIndex
            }
            this.props.updateBattleSelection(BATTLE_SELECT.START_SELECT, info_battle_select)
        }
    }

    componentDidUpdate(prevProps) {
        const { battle_animation, side, battle_selection } = this.props;
        if (battle_animation.key && battle_animation.key != prevProps.battle_animation.key) {
            // perform animation
            console.log(battle_animation)
            this.setState({
                cardBattleStyle: {
                    ...calculate_battle_style(battle_animation),
                    side: battle_animation.side,
                    type: ANIMATION_TYPE.ATTACK_ANIMATION
                }
            })
        }

        // when the attack animation has finished
        if (this.state.cardBattleStyle.style && this.state.cardBattleStyle.type == ANIMATION_TYPE.ATTACK_ANIMATION) {
            setTimeout(() => this.setState({
                cardBattleStyle: {
                    cardIndex: -1
                }
            }), 300)
            
        }

        if (side == SIDE.MINE && battle_selection?.selection 
            && (battle_selection.selection != prevProps.battle_selection?.selection)) {

            this.props.updateBattleSelection(BATTLE_SELECT.END_SELECT)
            const info_battle = {
                src_monster: battle_selection.src_monster,
                // monster can only attack one monster
                dst: battle_selection.selection
            }
            this.props.dispatch_others_attack(info_battle)
        }

        if (side == SIDE.MINE && battle_selection?.mouse_in && !battle_selection?.selection
                && (battle_selection?.mouse_in != prevProps.battle_selection?.mouse_in)) {

            if (battle_selection.mouse_in != -1) {
                const info = {
                    src_index: battle_selection.src_monster_index,
                    dst_index: battle_selection.mouse_in
                }
                this.setState({cardBattleStyle: {
                    // cardIndex: battle_selection.src_monster_index,
                    // style: {
                    //     transform: 'rotate(45deg)'
                    // },
                    ...calculate_aim_style(info),
                    type: ANIMATION_TYPE.AIM_ANIMATION
                }})
            } else {
                this.setState({cardBattleStyle: {
                    cardIndex: -1
                }})
            }
            
        }
    }

    


    render() {
        let side_style = undefined
        const { cardBattleStyle } = this.state
        const { side } = this.props
        if (cardBattleStyle?.side == side) {
            side_style = cardBattleStyle.side_style
        }

        return <div style={side_style} className={"side_box_" + side}>{this.initializeSide()}</div>;
    }

    initializeSide = () => {
        const { cardBattleStyle } = this.state;
        const { side, environment, game_meta, battle_selection} = this.props;

        if (!environment) {
            return
        }
        
        const field_cards = constructFieldFromEnv(side, environment)
        const highlightIndexes = side == SIDE.OPPONENT ? get_styled_index_from_environment(battle_selection?.cards) : undefined
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
                    if (cardEnv.current_pos == CARD_POS.FACE || is_spell(cardEnv.card.card_type)) {
                        return (
                            <CardView style={side == cardBattleStyle.side && index == cardBattleStyle.cardIndex? cardBattleStyle.style : undefined} card={cardEnv} key="side_card" />
                        )
                    } else if (cardEnv.current_pos == CARD_POS.SET) {
                        return <img className="side_card_set" key="side_card_set" src={'https://ms.yugipedia.com//f/fd/Back-Anime-ZX-2.png'}/>
                    }
                }
            }
            const info = {
                cardEnv: cardEnv,
                cardIndex: index
            }

            const hasOptions = index == this.state.cardClicked ? "show_hand_option" : "no_hand_option"

            const {can_direct_attack, can_others_attack} = returnAttackStatus(cardEnv, game_meta, environment)



            return (
                <div 
                    className={`card_outer_box ${highlightIndexes?.includes(index) ? 'card_flashing' : ''}`}
                    key={"side_" + side + index} 
                    onMouseEnter={()=>this.onMouseEnterHandler(info)}
                    onClick={()=>this.onCardClickHandler(info, index)}
                    onMouseLeave={() => this.cardMouseMoveHandler()}>
                    <div className={`card_box`}>
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
                        <TransitionGroup
                        transitionName="side"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}>
                            {cardView()}
                        </TransitionGroup>

                    </div>
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