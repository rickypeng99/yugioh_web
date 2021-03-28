
import { ENVIRONMENT, CARD_TYPE } from '../../Components/Card/utils/constant';


export const draw_card_from_deck = (environment, info) => {
    for (let i = 0; i < info.amount; i++) {
        environment[info.side][ENVIRONMENT.HAND].push(environment[info.side][ENVIRONMENT.DECK].shift())
    }
    return environment
}



export default {
    draw_card_from_deck
}