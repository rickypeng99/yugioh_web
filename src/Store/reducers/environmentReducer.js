import { INITIALIZE_ENVIRONMENT, NORMAL_SUMMON, SET_SUMMON } from "../actions/actionTypes";
import { summon } from './utils'
const initialState = {
    environment: undefined,
}

export default function(state = initialState, action) {

    if (action.type == INITIALIZE_ENVIRONMENT) {
        const { environment } = action.payload;
        return {
            environment: {
                ...environment
            }
        };
    } else if (action.type == NORMAL_SUMMON || action.type == SET_SUMMON) {
        const { info } = action.payload;
        state.environment = summon(info, action.type, state.environment)
        return {
            environment: {
                ...state.environment
            }
        }
    } else {
        return state;
    }
};
