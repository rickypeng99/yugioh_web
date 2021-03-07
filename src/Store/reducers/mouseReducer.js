import { LEFT_PANEL_MOUSE } from "../actions/actionTypes";
const initialState = {
    left_panel_cardEnv: undefined,
}

export default function(state = initialState, action) {

    if (action.type == LEFT_PANEL_MOUSE) {
        const { info } = action.payload;
        return {
            left_panel_cardEnv: info.cardEnv
        };
    } else {
        return state;
    }
};
