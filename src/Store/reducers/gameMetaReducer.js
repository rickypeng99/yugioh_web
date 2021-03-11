import { CHANGE_PHASE, INITIALIZE_META } from "../actions/actionTypes";
const initialState = {
    game_meta: undefined,
}

export default function(state = initialState, action) {

    if (action.type == CHANGE_PHASE) {
        const { info } = action.payload;
        state.game_meta.current_phase = info.next_phase;
        return {
            game_meta: {
                ...state.game_meta
            }
        };
    } else if (action.type == INITIALIZE_META) {
        const { game_meta } = action.payload;
        state.game_meta = game_meta
        return {
            game_meta: {
                ...state.game_meta
            }
        }
    }
    
    else {
        return state;
    }
};
