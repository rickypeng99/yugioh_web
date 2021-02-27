const DRAW_PHASE = "DRAW_PHASE";
const STAND_BY_PHASE = "STAND_BY_PHASE";
const MAIN_PHASE_1 = "MAIN_PHASE_1";
const BATTLE_PHASE = {
    START_STEP: {
        type: 'START_STEP',
        is_battle: true,
    },
    BATTLE_STEP: {
        type: 'BATTLE_STEP',
        is_battle: true,
    },
    DAMAGE_STEP: {
        START_DAMAGE: 'START_DAMAGE',
        BEFORE_DAMAGE: 'BEFORE_DAMAGE',
        DAMAGE_CALC: 'DAMAGE_CALC',
        AFTER_DAMAGE: 'AFTER_DAMAGE',
        END_DAMAGE: 'END_DAMAGE',
    },
    END_STEP: 'END_STEP'
};
const MAIN_PHASE_2 = "MAIN_PHASE_2";
const END_PHASE = "END_PHASE";

export default {
    DRAW_PHASE,
    STAND_BY_PHASE,
    MAIN_PHASE_1,
    BATTLE_PHASE,
    MAIN_PHASE_2,
    END_PHASE
}