import {combineReducers} from 'redux';

import global from './Global';
import ticker from './Ticker';

export default combineReducers({
    global,
    ticker
});