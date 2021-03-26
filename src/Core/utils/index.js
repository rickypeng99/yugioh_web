
import { ENVIRONMENT, CARD_TYPE } from '../../Components/Card/utils/constant';
import { get_unique_id_from_ennvironment } from '../../Components/PlayerGround/utils/utils'


export const move_cards_to_graveyard = (cards, side, src, environment) => {
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

export const battle_to_graveyard = (card, side, index, environment) => {
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

export default {
    move_cards_to_graveyard,
    battle_to_graveyard,
    draw_card_from_deck
}