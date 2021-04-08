import { ENVIRONMENT, CARD_TYPE, SIDE } from '../../Components/Card/utils/constant';
import { get_unique_id_from_ennvironment } from '../../Components/PlayerGround/utils/utils'

export const cards_existed = (environment, cards, locations) => {
    if (!Array.isArray(cards)) {
        cards = [cards]
    }

    if (!Array.isArray(locations)) {
        locations = [locations]
    }


    const existed = {}
    for (const card of cards) {
        for (const location of locations) {
            for (const environment_cardEnv of environment[SIDE.MINE][location]) {
                if (environment_cardEnv.card && card == environment_cardEnv.card.key) {
                    existed[card] = true
                }
            }
        }
        if (!existed[card]) {
            return false
        }
    }
    return true
}

// src is the unique key
export const get_fusion_material = (environment, src) => {
    const locations = [ENVIRONMENT.MONSTER_FIELD, ENVIRONMENT.HAND]
    let res = []
    


    const fusion_monster_env = get_cardEnv_by_unique_id(environment, SIDE.MINE, ENVIRONMENT.EXTRA_DECK, src)
    const fusion_materials_raw = fusion_monster_env.card.fusion_materials
    
    
    for (const location of locations) {
        for (const environment_cardEnv of environment[SIDE.MINE][location]) {
            if (environment_cardEnv.card && fusion_materials_raw.includes(environment_cardEnv.card.key)) {
                // res.push({
                //     unique_key: get_unique_id_from_ennvironment(environment_cardEnv),
                //     location: location
                // })
                res.push(environment_cardEnv)
            }
        }
    }

    return res
}

export const move_cards_to_graveyard = (cards, side, src, environment) => {
    const current_cards = environment[side][src]
    for (let i = 0; i < current_cards.length; i++) {
        if (!current_cards[i].card) {
            continue
        }
        if (cards.includes(get_unique_id_from_ennvironment(current_cards[i]))) {
            environment[side][ENVIRONMENT.GRAVEYARD].push(current_cards[i])
            if (src == ENVIRONMENT.HAND) {
                environment[side][src].splice(i, 1)
            } else {
                environment[side][src][i] = CARD_TYPE.PLACEHOLDER
            }            

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

export const is_fusion_monster = (cardEnv) => {
    return cardEnv.card.card_type == CARD_TYPE.MONSTER.FUSION
}

export const get_cards_by_filter_and_location = (environment, location, filterFunc) => {
    return environment[SIDE.MINE][location].filter(cardEnv => filterFunc(cardEnv))
}


export const get_cardEnv_by_unique_id = (environment, side, location, unique_id) => {
    for (const monsterEnv of environment[side][location]) {
        if (get_unique_id_from_ennvironment(monsterEnv) == unique_id) {
            return monsterEnv
        }
    }
}

export default {
    move_cards_to_graveyard,
    get_monsters_to_be_attacked,
    get_cards_by_filter_and_location,
    is_fusion_monster,
    cards_existed,
    get_fusion_material,
    get_cardEnv_by_unique_id
}