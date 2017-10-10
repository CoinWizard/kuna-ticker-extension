import {GET_CURRENT_TICKER, REDUCER_TICKER} from '../ActionTypes';
import AbstractAction from '../AbstractAction';

export default class GetCurrentTickerAction extends AbstractAction {
    constructor(tickerKey) {
        super(REDUCER_TICKER, GET_CURRENT_TICKER);

        this.tickerKey = tickerKey;
    }

    dispatch(state = {}) {
        return Object.assign({}, state, {currentTickerKey: this.tickerKey});
    }
}