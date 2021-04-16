/**
 * Called by all compoenents to send data to the websocket server
 */

import socket from './index'
import { SIDE } from '../Components/Card/utils/constant'

export const exchange_deck_with_opponent = (deck) => {
    console.log(deck)
    socket.emit("exchange_deck", {
        deck: deck,
    })
}

export const emit_summon = (info, type) => {
    socket.emit("summon", {
        ...info,
        side: SIDE.OPPONENT,
        type: type
    })
}

// export const emit_tribute = (info) => {
//     socket.emit("tribute", {
//         ...info,
//     })
// }

export const emit_move_cards_to_graveyard = (info) => {
    socket.emit("move_card_to_graveyard", {
        ...info,
    })
}

export const emit_attack_start = (info) => {
    socket.emit("attack_start", {
        ...info,
    })
}

export const emit_attack_ack = () => {
    socket.emit("attack_ack", {})
}

export const emit_change_phase = (info) => {
    socket.emit('change_phase', {
        ...info
    })
}

// effect related
export const emit_activate_effect = (info) => {
    socket.emit('activate_effect', {
        ...info
    })
}

export const emit_effect_ack = (info) => {
    socket.emit('effect_ack', {
        ...info
    })
}

export const emit_card_finish_operate = (info) => {
    socket.emit('card_finish_operate', {
        ...info
    })
}
