import ENV from "./actionTypes";
/**
 * Initialize the environment, only called by Game.jsx
 * @param {*} environment 
 */
const initialize_environment = environment => ({
    type: ENV.INITIALIZE_ENVIRONMENT,
    payload: {
        // initialized status
        statusKey: 0,
        environment
    }
});

/**
 * Summoning a monster from anywhere else to the field
 * @param {} monster 
 */
const summon_monster = monster => ({
    type: ENV.SUMMON,
    payload: {
        monster
    }
})


export default {
    initialize_environment,
    summon_monster
}