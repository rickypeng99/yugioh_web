import { DST_DIRECT_ATTACK } from '../../utils/constant'
import { ENVIRONMENT, CARD_TYPE, SIDE, CARD_POS} from '../../../Card/utils/constant';

export const calculate_battle_style = (info) => {
    const {src_index, dst_index } = info;

    const res = {
        cardIndex: src_index,
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
            res.style.transform = `rotate(${neg * 38}deg) translateY(-300px)`
        } else if (diff == 2) {
            res.style.transform = `rotate(${neg * 50}deg) translateY(-420px)`
        } else if (diff == 3) {
            res.style.transform = `rotate(${neg * 67}deg) translateY(-600px)`
        } else if (diff == 4) {
            res.style.transform = `rotate(${neg * 74}deg) translateY(-760px)`
        }

    }
    return res
}

export const constructFieldFromEnv = (environment, cardBattleStyle) => {
    const field_size = 28
    const side_size = 14
    const env_magic_index = 0
    const graveyard_index = 6
    const extra_deck_index = 7
    const deck_index = 13
    const special_indexes = [env_magic_index, graveyard_index, extra_deck_index, deck_index]

    const cards_opponent_side = environment[SIDE.OPPONENT][ENVIRONMENT.MONSTER_FIELD].concat(environment[SIDE.OPPONENT][ENVIRONMENT.SPELL_FIELD])
    const cards_my_side = environment[SIDE.MINE][ENVIRONMENT.MONSTER_FIELD].concat(environment[SIDE.MINE][ENVIRONMENT.SPELL_FIELD])
    const all_field_cards = cards_opponent_side.concat(cards_my_side)

    const index_to_perform_action = -2

    // render the environment onto the field
    let count = -1
    let field_cards = new Array(field_size).fill(CARD_TYPE.PLACEHOLDER).map((raw_index) =>  {
        const side = raw_index >= side_size ? SIDE.MINE : SIDE.OPPONENT
        const index = raw_index % field_size  
        
        if (special_indexes.includes(index)) {
            // deadling with special indexes
            if (index == graveyard_index) {
                return environment[side][ENVIRONMENT.GRAVEYARD]
            } else {
                count++
                if (count == cardBattleStyle.cardIndex) {
                    index_to_perform_action = raw_index
                }
                return all_field_cards[count]
            }
        }
    });

    return {
        field_cards,
        index_to_perform_action
    }

}
