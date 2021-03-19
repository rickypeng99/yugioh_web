import { io } from "socket.io-client";
import store from '../Store/store';
import { get_opponent_id, get_opponent_deck } from '../Store/actions/serverActions'
import { NORMAL_SUMMON, SET_SUMMON } from '../Store/actions/actionTypes'
import { normal_summon, set_summon, tribute } from '../Store/actions/environmentActions'
import { opponent_attack_start, opponent_attack_ack } from '../Store/actions/battleMetaActions'
import { change_phase } from '../Store/actions/gameMetaActions'
/**
 * The address of the websocket server
 */
const ENDPOINT = "http://127.0.0.1:4001";

const socket = io(ENDPOINT);

socket.on("connect", () => {
    socket.send(`Hello from ${socket.id}!`);
});

socket.on('message', (data) => {
    console.log(data)
})

socket.on("matched", (data) => {
    console.log(`Matched with ${data.opponent}`)
    // send the deck info of this player to the server
    // for testing
    // const heros = [20721928, 21844576, 58932615, 84327329, 89943723]
    // socket.to(data.opponent).emit("exchanging_deck", {
    //     deck: heros
    // })
    socket.opponent = data.opponent
    const info = {
        my_id: data.my_id,
        opponent_id: socket.opponent,
        player_starts: data.player_starts
    }
    store.dispatch(get_opponent_id(info))
})

socket.on("receive_deck", (data) => {
    console.log(`Received opponent's deck!`)
    const info = {
        deck: data.deck,
    }
    store.dispatch(get_opponent_deck(info))
})

socket.on("opponent_summon", (data) => {
    switch (data.data.type) {
        case NORMAL_SUMMON:
            store.dispatch(normal_summon(data.data))
            break;
        case SET_SUMMON:
            store.dispatch(set_summon(data.data))
            break;

    }

})

socket.on("opponent_change_phase", (data) => {
    store.dispatch(change_phase(data.data))
})

socket.on("opponent_tribute", (data) => {
    store.dispatch(tribute(data.data))
})

socket.on("opponent_attack_start", (data) => {
    store.dispatch(opponent_attack_start(data.data))
})

socket.on("opponent_attack_ack", (data) => {
    store.dispatch(opponent_attack_ack())
})

export default socket;
