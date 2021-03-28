import { ENVIRONMENT, SIDE, CARD_TYPE} from '../../Components/Card/utils/constant';
import { DST_DIRECT_ATTACK } from '../../Components/PlayerGround/utils/constant' 


const battle = (info, environment) => {
    const { dst, side, src_index, dst_index } = info
    // side is the attacker's side
    const getting_attacked_side = side == SIDE.MINE ? SIDE.OPPONENT : SIDE.MINE;

   
    const current_cards_attacker = environment[side][ENVIRONMENT.MONSTER_FIELD]
    const current_cards_getting_attacked = environment[getting_attacked_side][ENVIRONMENT.MONSTER_FIELD]
    const attacker_card = current_cards_attacker[src_index]


    // direct attack
    if (dst == DST_DIRECT_ATTACK) {
        environment[getting_attacked_side].hp -= attacker_card.current_atk
        return environment
    }

    // others attack (attacking other monsters)
    const getting_attacked_card = current_cards_getting_attacked[dst_index]
            
                
    // calculate damage
    if (attacker_card.current_atk > getting_attacked_card.current_atk) {
        environment = battle_to_graveyard(getting_attacked_card, getting_attacked_side, dst_index, environment)
        environment[getting_attacked_side].hp -= (attacker_card.current_atk - getting_attacked_card.current_atk)

    } else if (attacker_card.current_atk < getting_attacked_card.current_atk) {
        environment = battle_to_graveyard(attacker_card, side, src_index, environment)
        environment[side].hp -= (getting_attacked_card.current_atk - attacker_card.current_atk)

    } else {
        environment = battle_to_graveyard(getting_attacked_card, getting_attacked_side, dst_index, environment)
        environment = battle_to_graveyard(attacker_card, side, src_index, environment)
    }

    return environment
}

const battle_to_graveyard = (card, side, index, environment) => {
    environment[side][ENVIRONMENT.GRAVEYARD].push(card)
    environment[side][ENVIRONMENT.MONSTER_FIELD][index] = CARD_TYPE.PLACEHOLDER
    return environment
}

export default {
    battle
}