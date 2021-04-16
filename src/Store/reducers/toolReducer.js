import { SHOW_TOOL, CLOSE_TOOL, TOOL_TYPE } from "../actions/actionTypes";
const initialize_tools = () => {
    const res = {}
    for (const tool_name of Object.keys(TOOL_TYPE)) {
        res[TOOL_TYPE[tool_name]] = {
            status: false,
            info: {}
        }
    }
    return res
}

const initialState = {
    tools: initialize_tools()
}



export default function(state = initialState, action) {

    if (action.type == SHOW_TOOL) {
        const { info } = action.payload;

        return {
            tools: {
                ...state.tools,
                [info.tool_type]: {
                    status: true,
                    info: info.info
                }
            }
        };
    } else if (action.type == CLOSE_TOOL) {
        const { info } = action.payload;
        return {
            tools: {
                ...state.tools,
                [info.tool_type]: {
                    status: false,
                    info: {}
                }
            }
        };
    } else {
        return state;
    }
};
