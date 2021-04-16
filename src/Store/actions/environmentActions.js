import { UPDATE_ENVIRONMENT, INITIALIZE_ENVIRONMENT, NORMAL_SUMMON, SET_SUMMON, TRIBUTE, DRAW_CARD, PERFORM_ATTACK } from "./actionTypes";
/**
 * Initialize the environment, only called by Game.jsx
 * @param {*} environment 
 */
export const update_environment = environment => ({
    type: UPDATE_ENVIRONMENT,
    payload: {
        environment
    }
});

export const initialize_environment = environment => ({
    type: INITIALIZE_ENVIRONMENT,
    payload: {
        // initialized status
        environment
    }
});

export const perform_attack = info => ({
    type: PERFORM_ATTACK,
    payload: {
        info
    }
})

export const draw_card = info => ({
    type: DRAW_CARD,
    payload: {
        info
    }
})