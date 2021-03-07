import { GET_OPPONENT_ID, GET_OPPONENT_DECK } from "../actions/actionTypes";
const initialState = {
    opponent_id: undefined,
    opponent_deck: undefined
}

export default function(state = initialState, action) {

    if (action.type == GET_OPPONENT_ID) {
        const { info } = action.payload;
        return {
            opponent_id: info.opponent_id
        };
    } else if (action.type == GET_OPPONENT_DECK) {
        const { info } = action.payload;
        return {
            opponent_deck: info.deck
        };
    } else {
        return state;
    }
};
