import { CHANGE_PHASE, INITIALIZE_META } from "./actionTypes";

export const change_phase = info => ({
    type: CHANGE_PHASE,
    payload: {
        // initialized status
        info
    }
});

export const initialize_meta = game_meta => ({
    type: INITIALIZE_META,
    payload: {
        // initialized status
        game_meta
    }
});