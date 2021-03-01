import { normal_summon } from "../../actions/environmentActions";

import { INITIALIZE_ENVIRONMENT, NORMAL_SUMMON, SET_SUMMON } from "../../actions/actionTypes";
import { ENVIRONMENT, CARD_TYPE, CARD_POS } from '../../../Components/Card/utils/constant';

export const summon = (info, type, environment) => {
    if (type == NORMAL_SUMMON) {
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
    return environment;
}