import { ENVIRONMENT, CARD_TYPE, SIDE } from '../../Components/Card/utils/constant';
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

export const get_monsters_to_be_attacked = (environment) => {
    const opponent_cards = environment[SIDE.OPPONENT][ENVIRONMENT.MONSTER_FIELD]
    let res = []
    opponent_cards.forEach((cardEnv, index) => {
        if (cardEnv.card) {
            res.push(index)
        }
    })
    return res
}

export default {
    move_cards_to_graveyard,
    get_monsters_to_be_attacked
}