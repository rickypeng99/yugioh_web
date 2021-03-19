import { normal_summon } from "../../actions/environmentActions";
import { INITIALIZE_ENVIRONMENT, NORMAL_SUMMON, SET_SUMMON } from "../../actions/actionTypes";
import { ENVIRONMENT, CARD_TYPE, CARD_POS, SIDE } from '../../../Components/Card/utils/constant';
import { DST_DIRECT_ATTACK } from '../../../Components/PlayerGround/utils/constant' 
import { emit_summon, emit_tribute } from '../../../Client/Sender'
import { get_unique_id_from_ennvironment } from '../../../Components/PlayerGround/utils/utils'

export const summon = (info, type, environment) => {
    if (type != SET_SUMMON) {
        info.card.current_pos = CARD_POS.FACE;
    } else {
        info.card.current_pos = CARD_POS.SET;
    }
    let current_monsters = environment[info.side][ENVIRONMENT.MONSTER_FIELD];
    const summon_priorities = [2, 3, 1, 4, 0]
    for (let i = 0; i < summon_priorities.length; i++) {
        if (current_monsters[summon_priorities[i]] == CARD_TYPE.PLACEHOLDER) {
            current_monsters[summon_priorities[i]] = info.card
            break;
        }
    }
    environment[info.side][ENVIRONMENT.MONSTER_FIELD] = current_monsters

    // remove the card from the hand
    environment[info.side][ENVIRONMENT.HAND].splice(info.index, 1);

    if (info.side == SIDE.MINE) {
        emit_summon(info, type)
    }

    return environment;
}


export const tribute = (cards, side, src, environment) => {
    const res = move_cards_to_graveyard(cards, side, src, environment)
    if (side == SIDE.MINE) {
        const info = {
            cardEnvs: cards,
            side: SIDE.OPPONENT,
            src: src,
        }
        emit_tribute(info)
    }
    return res
}

const move_cards_to_graveyard = (cards, side, src, environment) => {
    const current_cards = environment[side][src]
    for (let i = 0; i < current_cards.length; i++) {
        if (!current_cards[i].card) {
            continue
        }
        if (cards.includes(get_unique_id_from_ennvironment(current_cards[i]))) {
            environment[side][ENVIRONMENT.GRAVEYARD].push(current_cards[i])
            environment[side][src][i] = CARD_TYPE.PLACEHOLDER
        }
    }
    return environment
}

const battle_to_graveyard = (card, side, index, environment) => {
    environment[side][ENVIRONMENT.GRAVEYARD].push(card)
    environment[side][ENVIRONMENT.MONSTER_FIELD][index] = CARD_TYPE.PLACEHOLDER
    return environment
}

export const draw_card_from_deck = (environment, info) => {
    for (let i = 0; i < info.amount; i++) {
        environment[info.side][ENVIRONMENT.HAND].push(environment[info.side][ENVIRONMENT.DECK].shift())
    }
    return environment
}

export const battle = (info, environment) => {
    const { src_monster, dst, side } = info

    // side is the attacker's side
    const getting_attacked_side = side == SIDE.MINE ? SIDE.OPPONENT : SIDE.MINE;

   
    const current_cards_attacker = environment[side][ENVIRONMENT.MONSTER_FIELD]
    const current_cards_getting_attacked = environment[getting_attacked_side][ENVIRONMENT.MONSTER_FIELD]
    

    let found = false

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
                environment[getting_attacked_side].hp -= attacker_card.current_atk
                return environment
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
                
                    // if attack is higher
                    if (attacker_card.current_atk > getting_attacked_card.current_atk) {
                        environment = battle_to_graveyard(getting_attacked_card, getting_attacked_side, j, environment)
                        environment[getting_attacked_side].hp -= (attacker_card.current_atk - getting_attacked_card.current_atk)
                    
                    } else if (attacker_card.current_atk < getting_attacked_card.current_atk) {
                        environment = battle_to_graveyard(attacker_card, side, i, environment)
                        environment[side].hp -= (getting_attacked_card.current_atk - attacker_card.current_atk)

                    } else {
                        environment = battle_to_graveyard(getting_attacked_card, getting_attacked_side, j, environment)
                        environment = battle_to_graveyard(attacker_card, side, i, environment)
                    
                    }
                    break
                }
            }
        }
    }

    return environment
}