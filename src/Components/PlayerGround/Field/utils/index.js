import { ENVIRONMENT, CARD_TYPE, SIDE, CARD_POS} from '../../../Card/utils/constant';
import { CARD_SELECT_TYPE, MONSTER_ATTACK_TYPE, PHASE, DST_DIRECT_ATTACK } from '../../utils/constant'
import { is_monster, is_spell, is_trap } from '../../../Card/utils/utils'

export const calculate_aim_style = (info) => {
    let {src_index, dst_index } = info;
    console.log(info)
    const res = {
        cardIndex: src_index,
        style: {}
    }
    src_index -= 1
    dst_index -= 1
    const new_dst_index = 4 - dst_index
    const neg = src_index > new_dst_index ? -1 : 1;
    const diff = Math.abs(src_index - new_dst_index)


    if (diff == 1) {
        res.style.transform = `rotate(${neg * 45}deg)`
    } else if (diff == 2) {
        res.style.transform = `rotate(${neg * 55}deg)`
    } else if (diff == 3) {
        res.style.transform = `rotate(${neg * 65}deg)`
    } else if (diff == 4) {
        res.style.transform = `rotate(${neg * 71}deg)`
    }

    return res
}

export const calculate_battle_style = (info) => {
    const {src_index, dst_index } = info;

    const res = {
        cardIndex: get_styled_index_from_environment(src_index),
        style: {
            transform: 'translateY(calc(-200% - 60px))'
        },
        side_style: {
            zIndex: 1
        }
    }

    if (dst_index == DST_DIRECT_ATTACK) {
        // direct attack;
        if (src_index == 2) {
        } else if (src_index == 0 || src_index == 4) {
            const neg = src_index == 0 ? 1 : -1
            res.style.transform = `rotate(${neg * 41}deg) translateY(calc(-300% - 60px))`
        } else {
            // 1 and 3
            const neg = src_index == 1 ? 1 : -1
            res.style.transform = `rotate(${neg * 24}deg) translateY(calc(-200% - 90px))`
        }
    } else {
        // others attack
        const new_dst_index = 4 - dst_index
        const neg = src_index > new_dst_index ? -1 : 1;
        const diff = Math.abs(src_index - new_dst_index)
        if (diff == 0) {
            res.style.transform = `translateY(calc(-100% - 50px))`
        } else if (diff == 1) {
            res.style.transform = `rotate(${neg * 45}deg) translateY(calc(-10vw - 100px))`
        } else if (diff == 2) {
            res.style.transform = `rotate(${neg * 55}deg) translateY(calc(-10vw - 200px))`
        } else if (diff == 3) {
            res.style.transform = `rotate(${neg * 65}deg) translateY(calc(-10vw - 350px))`
        } else if (diff == 4) {
            res.style.transform = `rotate(${neg * 71}deg) translateY(calc(-10vw - 480px))`
        }

    }
    return res
}

export const constructFieldFromEnv = (side, environment) => {
    const field_size = 14
    const env_magic_index = 0
    const graveyard_index = 6
    const extra_deck_index = 7
    const deck_index = 13
    const special_indexes = [env_magic_index, graveyard_index, extra_deck_index, deck_index]

    const cards = environment[side][ENVIRONMENT.MONSTER_FIELD].concat(environment[side][ENVIRONMENT.SPELL_FIELD])

    // render the environment onto the field
    let count = -1
    let field_cards = new Array(field_size).fill(null).map((_, index) =>  {        
        if (special_indexes.includes(index)) {
            // deadling with special indexes
            if (index == graveyard_index) {
                return environment[side][ENVIRONMENT.GRAVEYARD]
            } 
            return CARD_TYPE.PLACEHOLDER
        } else {
            count++
            return cards[count]
        }
    });
    return field_cards

}


export const returnAttackStatus = (cardEnv, game_meta, environment) => {

    const disabled_class = 'no_hand_option'
    const enabled_class = 'show_summon'

    // console.log(cardEnv.card)

    // if it is not battle phase or the card is not a monster
    if (!cardEnv.card || game_meta.current_phase != PHASE.BATTLE_PHASE || 
        !is_monster(cardEnv.card.card_type)) {
            return {
                can_direct_attack: disabled_class,
                can_others_attack: disabled_class
            }
    }

    // if there is no monster on enemy's field
    for (let monster of environment[SIDE.OPPONENT][ENVIRONMENT.MONSTER_FIELD]) {
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



export const get_styled_index_from_environment = (indexes) => {

    if (!indexes) return

    if (indexes == -1) {
        return -2
    }

    if (typeof indexes === 'number') {
        return indexes + 1
    } else {
        return indexes.map((value) => {
            return value + 1
        })
    }
    
}