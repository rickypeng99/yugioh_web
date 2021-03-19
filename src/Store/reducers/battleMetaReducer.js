import { OPPONENT_ATTACK_START, OPPONENT_ATTACK_ACK, START_BATTLE_DIRECT_ATTACK, START_BATTLE_OTHERS_ATTACK, END_BATTLE } from "../actions/actionTypes";
import { BATTLE_STEP } from '../../Components/PlayerGround/utils/constant'
import { emit_attack_start, emit_attack_ack } from '../../Client/Sender'
import { SIDE } from '../../Components/Card/utils/constant'

const initialState = {
    battle_meta: undefined,
}

export default function(state = initialState, action) {

    if (action.type == START_BATTLE_DIRECT_ATTACK || action.type == START_BATTLE_OTHERS_ATTACK) {
        const { info } = action.payload;
        // console.log(info)
        const battle_meta = {
            src_monster: info.src_monster,
            dst: info.dst,
            battle_step: BATTLE_STEP.START_STEP,
            side: SIDE.MINE
        }
        emit_attack_start(battle_meta)
        console.log(battle_meta)
        return {
            battle_meta: battle_meta
        };
    } else if (action.type == OPPONENT_ATTACK_START) {
        const { info } = action.payload;
        console.log(info)
        return{
            battle_meta: {
                src_monster: info.src_monster,
                dst: info.dst,
                battle_step: BATTLE_STEP.START_STEP,
                side: SIDE.OPPONENT
            }
        }
    } else if (action.type == OPPONENT_ATTACK_ACK) {
        const { info } = action.payload;
        return {
            battle_meta: {
                ...state.battle_meta,
                battle_step: BATTLE_STEP.DAMAGE_STEP

            }
        }
    } else if (action.type == END_BATTLE) {
        return {
            battle_meta: undefined
        }
    }
    
    else {
        return state;
    }
};
