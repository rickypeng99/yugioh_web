import { GET_OPPONENT_ID, GET_OPPONENT_DECK } from "./actionTypes";


export const get_opponent_id = info => ({
    type: GET_OPPONENT_ID,
    payload: {
        info
    }
})

export const get_opponent_deck = info => ({
    type: GET_OPPONENT_DECK,
    payload: {
        info
    }
})

