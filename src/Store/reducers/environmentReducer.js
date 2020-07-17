import { INITIALIZE_ENVIRONMENT } from "../actions/actionTypes";

const initialState = {
    environment: {
        statusKey: 0,
    },
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