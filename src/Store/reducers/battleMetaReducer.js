import { OPPONENT_ATTACK_START, OPPONENT_ATTACK_ACK, START_BATTLE_DIRECT_ATTACK, START_BATTLE_OTHERS_ATTACK, END_BATTLE } from "../actions/actionTypes";
import { BATTLE_STEP, DST_DIRECT_ATTACK } from '../../Components/PlayerGround/utils/constant'
import { emit_attack_start, emit_attack_ack } from '../../Client/Sender'
import { ENVIRONMENT, SIDE } from '../../Components/Card/utils/constant'
import { get_unique_id_from_ennvironment } from '../../Components/PlayerGround/utils/utils'

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
        const { environment } = info;
        const { src_monster, dst, side } = state.battle_meta

        // side is the attacker's side
        const getting_attacked_side = side == SIDE.MINE ? SIDE.OPPONENT : SIDE.MINE;

    
        const current_cards_attacker = environment[side][ENVIRONMENT.MONSTER_FIELD]
        const current_cards_getting_attacked = environment[getting_attacked_side][ENVIRONMENT.MONSTER_FIELD]
        

        let found = false

        let src_index = -1;
        let dst_index = -1;

        // I know this part of code is stupid but sorry i dont want to maintain a dictionary at the same time
        for (let i = 0; i < current_cards_attacker.length; i++) {
            if (found) {
                break
            }
            const attacker_card = current_cards_attacker[i]
            if (!attacker_card.card) {
                continue
            }
            const attacker_id = get_unique_id_from_ennvironment(attacker_card)
            if (attacker_id == src_monster) {

                // direct attack
                if (dst == DST_DIRECT_ATTACK) {
                    src_index = i;
                    dst_index = DST_DIRECT_ATTACK;
                    break;
                }

                // others attack (attacking other monsters)
                for (let j = 0; j < current_cards_getting_attacked.length; j++) {
                    const getting_attacked_card = current_cards_getting_attacked[j]
                    if (!getting_attacked_card.card) {
                        continue
                    }
                    const getting_attacked_id = get_unique_id_from_ennvironment(getting_attacked_card)
                    if ( getting_attacked_id == dst) {
                        found = true
                        src_index = i;
                        dst_index = j;
                        break
                    }
                }
            }
        }

        return {
            battle_meta: {
                ...state.battle_meta,
                battle_step: BATTLE_STEP.DAMAGE_STEP,
                src_index: src_index,
                dst_index: dst_index,
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
