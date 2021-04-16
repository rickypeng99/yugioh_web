import { SHOW_TOOL, CLOSE_TOOL } from "./actionTypes";

export const show_tool = info => ({
    type: SHOW_TOOL,
    payload: {
        info
    }
});

export const close_tool = info => ({
    type: CLOSE_TOOL,
    payload: {
        info
    }
});