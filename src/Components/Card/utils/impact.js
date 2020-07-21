import {ENVIRONMENT} from './constant.js'

export const IMPACT_DICT = {
    'DESTROY': () => {
        this.setState({current_place: ENVIRONMENT.GRAVEYARD});
    },
    'ATK_UP': (value) => {
        this.setState({current_atk: this.state.current_atk + value});
    },
}