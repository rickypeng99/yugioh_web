import {combineReducers} from 'redux';
import environmentReducer from './environmentReducer'
import mouseReducer from './mouseReducer'
import serverReducer from './serverReducer'

export default combineReducers({environmentReducer, mouseReducer, serverReducer});