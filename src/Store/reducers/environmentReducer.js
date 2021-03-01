import { INITIALIZE_ENVIRONMENT } from "../actions/actionTypes";

const initialState = {
    environment: undefined,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case INITIALIZE_ENVIRONMENT:
            const { environment } = action.payload;
            return {
                environment: {
                    ...state.environment,
                    ...environment
                }
            };
        default:    
            return state;
    }
};