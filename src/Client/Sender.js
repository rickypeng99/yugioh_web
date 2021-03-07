/**
 * Called by all compoenents to send data to the websocket server
 */

import socket from './index'

export const exchange_deck_with_opponent = (deck, opponent_id) => {
    console.log(deck)
    socket.emit("exchange_deck", {
        deck: deck,
        opponent_id: opponent_id
    })
}