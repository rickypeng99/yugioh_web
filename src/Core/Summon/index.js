import { SET_SUMMON, UPDATE_ENVIRONMENT } from "../../Store/actions/actionTypes";
import { ENVIRONMENT, CARD_TYPE, CARD_POS, SIDE } from '../../Components/Card/utils/constant';
import { emit_summon, emit_tribute } from '../../Client/Sender'
import { move_cards_to_graveyard } from '../Misc'
import store from "../../Store/store";
import { update_environment } from "../../Store/actions/environmentActions";
import { get_unique_id_from_ennvironment } from "../../Components/PlayerGround/utils/utils";

const summon = (info, type, environment) => {
    // TODO: make summon function more generic
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
    environment[info.side][info.src_location].splice(environment[info.side][info.src_location].findIndex((cardEnv) => get_unique_id_from_ennvironment(cardEnv) == get_unique_id_from_ennvironment(info.card)), 1);

    if (info.side == SIDE.MINE) {
        emit_summon(info, type)
    }

    store.dispatch(update_environment(environment))

    return environment;
}
const tribute = (cards, side, src, environment) => {
    const res = move_cards_to_graveyard(cards, side, src, environment)
    // if (side == SIDE.MINE) {
    //     const info = {
    //         cardEnvs: cards,
    //         side: SIDE.OPPONENT,
    //         src: src,
    //     }
    //     emit_tribute(info)
    // }

    store.dispatch(update_environment(res))
    return res
}


export default {
    summon, 
    tribute
}