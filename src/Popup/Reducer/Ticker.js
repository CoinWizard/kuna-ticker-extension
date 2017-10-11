import * as Actions from './../Actions/ActionTypes';
import {updateObject, updateItemInArray} from './../../Library/ObjectUtility';

const initialTickerState = {
    tickers: {},
    currentTickerKey: null
};


/**
 * @param state
 * @param ticker
 * @returns {({}&U)|({}&U&V&W)|({}&U&V)|any}
 */
function updateTicker(state, ticker) {
    const {tickers = []} = state;
    tickers[ticker.key] = ticker;

    return updateObject(state, {tickers: tickers});
}

/**
 * @param state
 * @param action
 * @return {{tickers}}
 */
export default function tickerState(state = initialTickerState, action = null) {

    switch (action.type) {
        case Actions.FETCH_TICKERS: {
            return updateObject(state, {tickers: action.tickers});
        }

        case Actions.UPDATE_TICKER: {
            return updateTicker(state, action.ticker);
        }

        case Actions.SET_CURRENT_TICKER: {
            return updateObject(state, {currentTickerKey: action.tickerKey});
        }
    }

    return state;
}