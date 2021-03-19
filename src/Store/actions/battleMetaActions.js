import { START_BATTLE_DIRECT_ATTACK, 
    START_BATTLE_OTHERS_ATTACK,
    OPPONENT_ATTACK_START,
    OPPONENT_ATTACK_ACK, 
    END_BATTLE} from "./actionTypes";


export const direct_attack = info => ({
    type: START_BATTLE_DIRECT_ATTACK,
    payload: {
        info
    }
})

export const others_attack = info => ({
    type: START_BATTLE_OTHERS_ATTACK,
    payload: {
        info
    }
})


export const opponent_attack_start = info => ({
    type: OPPONENT_ATTACK_START,
    payload: {
        info
    }
})

export const opponent_attack_ack = info => ({
    type: OPPONENT_ATTACK_ACK,
    payload: {
        info
    }
})

export const end_battle = () => ({
    type: END_BATTLE,
    payload: {}
})
