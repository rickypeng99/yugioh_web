import { GET_OPPONENT_ID, GET_OPPONENT_DECK } from "../actions/actionTypes";
const initialState = {
    my_id: undefined,
    opponent_id: undefined,
    opponent_deck: undefined,
    player_starts: undefined
}

export default function(state = initialState, action) {

    if (action.type == GET_OPPONENT_ID) {
        const { info } = action.payload;
        return {
            ...state,
            my_id: info.my_id,
            opponent_id: info.opponent_id,
            player_starts: info.player_starts
        };
    } else if (action.type == GET_OPPONENT_DECK) {
        const { info } = action.payload;
        return {
            ...state,
            opponent_deck: info.deck
        };
    } else {
        return state;
    }
};
