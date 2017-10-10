import {GET_TICKERS, REDUCER_TICKER} from '../ActionTypes';
import AbstractAction from '../AbstractAction';

export default class GetTickersAction extends AbstractAction {
    constructor(tickers) {
        super(REDUCER_TICKER, GET_TICKERS);

        this.tickers = tickers;
    }

    dispatch(state = {}) {
        return Object.assign({}, state, {tickers: this.tickers});
    }

}