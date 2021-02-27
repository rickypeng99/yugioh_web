import phase from "../../actions/phase/actionTypes";
/**
 * Changing phases
 * @param {*} phase
 */
export const initialize_environment = phase => ({
    type: INITIALIZE_ENVIRONMENT,
    payload: {
        // initialized status
        statusKey: 0,
        environment
    }
});