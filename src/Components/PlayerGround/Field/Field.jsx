import React from 'react';
import { connect } from 'react-redux';
import Side from './Side/Side';
import {  end_battle, opponent_attack_ack } from "../../../Store/actions/battleMetaActions";
import { emit_attack_ack } from '../../../Client/Sender'
import { SIDE } from '../../Card/utils/constant';
import { DST_DIRECT_ATTACK, BATTLE_STEP } from '../utils/constant'
import { perform_attack } from '../../../Store/actions/environmentActions'
import Core from '../../../Core'

import { BATTLE_SELECT } from './utils/constant'

import './Field.css';
class Field extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            // update when needs child component to perform battle action
            battle_animation: {},
            // update when needs child component to select monster to battle
            battle_selection: {},
        }

    }

    updateBattleSelection = (type, info) => {
        // for both sides to call to update battle selection
        // find the monsters that are able to be selected to battle agianst
        if (type == BATTLE_SELECT.START_SELECT) {
            const { environment } = this.props 

            const battle_selection = {
                cards: Core.Utils.get_monsters_to_be_attacked(environment),
                src_monster: info.src_monster,
                src_monster_index: info.src_monster_index
            }
    
            this.setState({battle_selection: battle_selection})
        } else if (type == BATTLE_SELECT.MOUSE_IN_SELECT) {

            const battle_selection = {
                ...this.state.battle_selection,
                mouse_in: info.mouse_in
            }

            this.setState({battle_selection: battle_selection})
        } else if (type == BATTLE_SELECT.CONFIRM_SELECT) {

            const battle_selection = {
                ...this.state.battle_selection,
                selection: info.selection 
            }
    
            this.setState({battle_selection: battle_selection})
        } else {
            this.setState({battle_selection: {}})
        }
        
    }

    componentDidUpdate(prevProps) {
        // opponent is attacking
        const current_battle_meta = this.props.battle_meta
        const prev_battle_meta = prevProps.battle_meta

        // getting attacked this.props.side should NOT equal current_battle_meta.side
        if (current_battle_meta && !prev_battle_meta
            && current_battle_meta.battle_step == BATTLE_STEP.START_STEP
            && current_battle_meta.side == SIDE.OPPONENT) {
                // Started a battle because of the opponent
                // TODO: Effects during battle starts will be triggered here
                const info = {
                    environment: this.props.environment
                }
                emit_attack_ack();
                this.props.dispatch_change_to_damage_step(info);
        }

        if (current_battle_meta && prev_battle_meta
            && current_battle_meta.battle_step == BATTLE_STEP.DAMAGE_STEP
            && current_battle_meta.battle_step != prev_battle_meta.battle_step) {
                // Receive damage step, starting to let monster attack
                // let the child components to perform animation
                this.setState({
                    battle_animation: {
                        key: Math.random(),
                        ...current_battle_meta                        
                    }
                })

                // update the props of environment

                setTimeout(() => {
                    const info = {
                        ...current_battle_meta
                    }
                    this.props.dispatch_perform_attack(info)
                    this.props.dispatch_end_battle()
                }, 300)
                

            }


    }

    render() {
        const { battle_animation, battle_selection } = this.state
        const {transformRotateX, scale, x_pos, y_pos} = this.props

        const fieldStyle = {
            transform: transformRotateX && scale && x_pos != undefined && y_pos !== undefined ? "perspective(1000px) rotateX(" + transformRotateX + ") scale(" + scale + ") translate(" + x_pos + "px, " + y_pos + "px)" 
                : "perspective(1000px) rotateX(45deg) scale(1.0) translate(0px, 0px)",
        }
        return (
            <div className="field_box" style={fieldStyle}>
                <Side battle_animation = {battle_animation} side="OPPONENT" 
                    battle_selection={battle_selection} 
                    updateBattleSelection={this.updateBattleSelection}></Side>
                <div style={{ height: "50px" }}></div>
                <Side battle_animation = {battle_animation} side="MINE" call_card_selector={this.props.call_card_selector} 
                    battle_selection={battle_selection} 
                    updateBattleSelection={this.updateBattleSelection}></Side>
            </div>

        )
    }

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
    // opponent attack ack will change the battle step to damage step
    dispatch_change_to_damage_step: (info) => dispatch(opponent_attack_ack(info)),
    dispatch_perform_attack: (info) => dispatch(perform_attack(info)),
    dispatch_end_battle: () => dispatch(end_battle())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Field);