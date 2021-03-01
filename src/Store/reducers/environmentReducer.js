import { INITIALIZE_ENVIRONMENT, NORMAL_SUMMON } from "../actions/actionTypes";
import { ENVIRONMENT, CARD_TYPE } from '../../Components/Card/utils/constant';
const initialState = {
    environment: undefined,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case INITIALIZE_ENVIRONMENT:
            const { environment } = action.payload;
            return {
                environment: {
                    ...environment
                }
            };
        case NORMAL_SUMMON:
            const { info } = action.payload;
            let current_monsters = state.environment[info.side][ENVIRONMENT.MONSTER_FIELD];
            const summon_priorities = [2, 3, 1, 4, 0]
            for (let i = 0; i < summon_priorities.length; i++) {
                if (current_monsters[summon_priorities[i]] == CARD_TYPE.PLACEHOLDER) {
                    current_monsters[summon_priorities[i]] = info.card
                    break;
                }
            }
            state.environment[info.side][ENVIRONMENT.MONSTER_FIELD] = current_monsters
            console.log(state.environment)
            return {
                environment: {
                    ...state.environment
                }
            }
        default:    
            return state;
    }
};
