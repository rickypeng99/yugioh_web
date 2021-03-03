import {combineReducers} from 'redux';
import environmentReducer from './environmentReducer'
import mouseReducer from './mouseReducer'

export default combineReducers({environmentReducer, mouseReducer});