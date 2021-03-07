import { io } from "socket.io-client";
import store from '../Store/store';
import { get_opponent_id, get_opponent_deck } from '../Store/actions/serverActions'

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
        opponent_id: socket.opponent  
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

export default socket;
