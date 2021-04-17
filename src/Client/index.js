import { io } from "socket.io-client";
import store from '../Store/store';
import { get_opponent_id, get_opponent_deck } from '../Store/actions/serverActions'
import { NORMAL_SUMMON, SET_SUMMON } from '../Store/actions/actionTypes'
import { normal_summon, set_summon, tribute } from '../Store/actions/environmentActions'
import { opponent_attack_start, opponent_attack_ack } from '../Store/actions/battleMetaActions'
import { change_phase } from '../Store/actions/gameMetaActions'
import Core from "../Core";
import { ENVIRONMENT, SIDE } from "../Components/Card/utils/constant";
/**
 * The address of the websocket server
 */
const ENDPOINT = "http://127.0.0.1:4001";

const socket = io(ENDPOINT);

const getCurrentEnvironment = () => {
    return store.getState().environmentReducer.environment
}

socket.on("connect", () => {
    socket.send(`Hello from ${socket.id}!`);
});

socket.on('message', (data) => {
    console.log(data)
})

socket.on("matched", (data) => {
    console.log(`Matched with ${data.opponent}`)
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
    const environment = getCurrentEnvironment()
    Core.Summon.summon(data.data, data.data.type, environment)
})

// socket.on("opponent_tribute", (data) => {

//     const { cardEnvs, side, src } = data.data
//     const environment = getCurrentEnvironment()
//     Core.Summon.tribute(cardEnvs, side, src, environment)
// })

socket.on("opponent_move_card_to_graveyard", (data) => {
    const { cards, side, src } = data.data
    const environment = getCurrentEnvironment()
    Core.Misc.move_cards_to_graveyard(cards, side, src, environment)
})


socket.on("opponent_change_phase", (data) => {
    store.dispatch(change_phase(data.data))
})

socket.on("opponent_attack_start", (data) => {
    store.dispatch(opponent_attack_start(data.data))
})

socket.on("opponent_attack_ack", (data) => {
    const info = {
        environment: store.getState().environmentReducer.environment
    }
    store.dispatch(opponent_attack_ack(info))
})

socket.on("opponent_card_activate", (data) => {
    const environment = getCurrentEnvironment()
    Core.Effect.opponent_activate(data, environment)
})

socket.on("card_operate", (data) => {
    const environment = getCurrentEnvironment()
    Core.Effect.operate(data, environment)
})

socket.on("opponent_card_operated", (data) => {
    const environment = getCurrentEnvironment()
    Core.Effect.opponent_operated(data, environment)
})

socket.on("opponent_effect_ack", (data) => {
    const environment = getCurrentEnvironment()
    Core.Effect.opponent_effect_ack(data, environment)
})

export default socket;
