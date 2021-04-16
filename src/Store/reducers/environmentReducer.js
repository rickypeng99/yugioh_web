import { UPDATE_ENVIRONMENT, INITIALIZE_ENVIRONMENT, DRAW_CARD, PERFORM_ATTACK } from "../actions/actionTypes";

import Core from '../../Core'

const initialState = {
    environment: undefined,
}

export default function(state = initialState, action) {


    if (action.type == UPDATE_ENVIRONMENT) {
        const { environment } = action.payload;
        return {
            environment: {
                ...environment
            }
        };
    } else if (action.type == INITIALIZE_ENVIRONMENT) {
        const { environment } = action.payload;
        return {
            environment: {
                ...environment
            }
        };
    } else if (action.type == DRAW_CARD) {
        const { info } = action.payload;
        const new_environment = Core.Misc.draw_card_from_deck(state.environment, info);
        return {
            environment: {
                ...new_environment
            }
        }
    } else if (action.type == PERFORM_ATTACK) {
        const { info } = action.payload;
        const new_environment = Core.Battle.battle(info, state.environment);
        return {
            environment: {
                ...new_environment
            }
        }
    }
    
    else {
        return state;
    }
};
