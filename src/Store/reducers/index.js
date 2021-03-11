import {combineReducers} from 'redux';
import environmentReducer from './environmentReducer'
import mouseReducer from './mouseReducer'
import serverReducer from './serverReducer'
import gameMetaReducer from './gameMetaReducer'
export default combineReducers({environmentReducer, mouseReducer, serverReducer, gameMetaReducer});