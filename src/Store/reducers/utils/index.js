import { normal_summon } from "../../actions/environmentActions";
import { INITIALIZE_ENVIRONMENT, NORMAL_SUMMON, SET_SUMMON } from "../../actions/actionTypes";
import { ENVIRONMENT, CARD_TYPE, CARD_POS, SIDE } from '../../../Components/Card/utils/constant';
import { emit_summon } from '../../../Client/Sender'


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

export const move_cards_to_graveyard = (cards, side, src, environment) => {
    const current_cards = environment[side][src]
    for (let i = 0; i < current_cards.length; i++) {
        if (!current_cards[i].card) {
            continue
        }
        if (cards.includes(current_cards[i].card.key + '_' + current_cards[i].unique_count)) {
            environment[side][ENVIRONMENT.GRAVEYARD].push(current_cards[i])
            environment[side][src][i] = CARD_TYPE.PLACEHOLDER
        }
    }
    return environment
}

export const draw_card_from_deck = (environment, info) => {
    for (let i = 0; i < info.amount; i++) {
        environment[info.side][ENVIRONMENT.HAND].push(environment[info.side][ENVIRONMENT.DECK].shift())
    }
    return environment
}