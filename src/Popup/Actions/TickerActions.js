import {ActionTypes} from 'Popup/Actions/ActionTypes';

/**
 * @param ticker
 * @returns {{action, ticker: *}}
 */
export const updateTicker = (ticker) => {
    return {
        type: ActionTypes.UPDATE_TICKER,
        ticker: ticker
    };
};

/**
 * @param tickerKey
 * @returns {{action, tickerKey: *}}
 */
export const setCurrentTickerKey = (tickerKey) => {
    return {
        type: ActionTypes.SET_CURRENT_TICKER,
        tickerKey: tickerKey
    };
};


/**
 * @param tickers
 * @returns {{action, tickers: Array}}
 */
export const fetchTickers = (tickers = []) => {
    return {
        type: ActionTypes.FETCH_TICKERS,
        tickers: tickers
    };
};