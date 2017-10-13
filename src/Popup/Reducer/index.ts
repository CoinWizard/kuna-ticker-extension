import {combineReducers} from 'redux';

import {GlobalStateInterface} from 'Popup/Reducer/Interfaces/GlobalStateInterface';
import {TickerStateInterface} from 'Popup/Reducer/Interfaces/TickerStateInterface';

import Global from './Global';
import Ticker from './Ticker';


export interface PopupState {
    global: GlobalStateInterface;
    ticker: TickerStateInterface;
}

export default combineReducers<PopupState>({
    global: Global,
    ticker: Ticker
});