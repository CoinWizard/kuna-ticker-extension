import AbstractAction from './../Actions/AbstractAction';

const initialTickerState = {
    tickers: {},
    currentTickerKey: null
};

/**
 * @param state
 * @param action
 * @return {{tickers}}
 */
export default function tickerState(state = initialTickerState, action = null) {

    if (action instanceof AbstractAction && action.getReducerKey() === 'ticker') {
        return action.dispatch(state);
    }

    return state;
}