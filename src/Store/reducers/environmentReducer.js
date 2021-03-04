import { INITIALIZE_ENVIRONMENT, NORMAL_SUMMON, SET_SUMMON, TRIBUTE } from "../actions/actionTypes";
import { SIDE, ENVIRONMENT } from '../../Components/Card/utils/constant';
import { summon, move_cards_to_graveyard } from './utils'
const initialState = {
    environment: undefined,
}

export default function(state = initialState, action) {

    if (action.type == INITIALIZE_ENVIRONMENT) {
        const { environment } = action.payload;
        return {
            environment: {
                ...environment
            }
        };
    } else if (action.type == NORMAL_SUMMON || action.type == SET_SUMMON) {
        const { info } = action.payload;
        state.environment = summon(info, action.type, state.environment)
        return {
            environment: {
                ...state.environment
            }
        }
    }  else if (action.type == TRIBUTE) {
        const { info } = action.payload;
        const tributed_monsters = info.cardEnvs
        state.environment = move_cards_to_graveyard(tributed_monsters, SIDE.MINE, ENVIRONMENT.MONSTER_FIELD, state.environment)
        return {
            environment: {
                ...state.environment
            }
        }
    }
    
    else {
        return state;
    }
};
