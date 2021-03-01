import { INITIALIZE_ENVIRONMENT } from "./actionTypes";
/**
 * Initialize the environment, only called by Game.jsx
 * @param {*} environment 
 */
export const initialize_environment = environment => ({
    type: INITIALIZE_ENVIRONMENT,
    payload: {
        // initialized status
        environment
    }
});