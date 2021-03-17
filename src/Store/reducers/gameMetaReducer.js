import { CHANGE_PHASE, INITIALIZE_META } from "../actions/actionTypes";
import { PHASE } from '../../Components/PlayerGround/utils/constant'
import { draw_card } from '../actions/environmentActions';
import store from '../store';


const initialState = {
    game_meta: undefined,
}

export default function(state = initialState, action) {

    if (action.type == CHANGE_PHASE) {
        const { info } = action.payload;

        let current_turn = state.game_meta.current_turn
        if (info.next_phase == PHASE.END_PHASE) {
            const { my_id, opponent_id } = state.game_meta
            if (current_turn == my_id) {
                current_turn = opponent_id
            } else {
                current_turn = my_id
            }

        }

        return JSON.parse(JSON.stringify({
            game_meta: {
                ...state.game_meta,
                current_phase: info.next_phase,
                current_turn: current_turn
            }
        }));
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
