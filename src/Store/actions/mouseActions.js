import { LEFT_PANEL_MOUSE } from "./actionTypes";

export const left_panel_mouse_in = info => ({
    type: LEFT_PANEL_MOUSE,
    payload: {
        // initialized status
        info
    }
});