import ENV from "../../actions/environment/actionTypes";

const initialState = {
    environment: {
        statusKey: 0,
    },
}

export default function(state = initialState, action) {
    switch(action.type) {
        case ENV.INITIALIZE_ENVIRONMENT:
            const { environment } = action.payload;
            return {
                environment: {
                    ...state.environment,
                    ...environment
                }
            };

        case ENV.SUMMON:
            const { monster } = action.payload;
            //2 1 3 0 4
            const placeOffsets = [0, -1, 1, -2, 2];
            const monsterFieldCpacity = state.environment['MONSTER_FIELD'].my_cards.length;
            state.environment['MONSTER_FIELD'].my_cards[2 + placeOffsets[monsterFieldCpacity]] = monster;
            return {
                environment: {
                    ...state.environment
                }
            }
        default:    
            return state;
    }
};