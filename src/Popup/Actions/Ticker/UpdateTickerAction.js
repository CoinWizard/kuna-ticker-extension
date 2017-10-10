import {UPDATE_TICKER_PRICE, REDUCER_TICKER} from '../ActionTypes';
import AbstractAction from '../AbstractAction';

export default class UpdateTickerAction extends AbstractAction {
    constructor(ticker) {
        super(REDUCER_TICKER, UPDATE_TICKER_PRICE);

        this.newTicker = ticker;
    }

    dispatch(state = {}) {
        const {tickers = []} = state;

        tickers[this.newTicker.key].price = this.newTicker.price;


        return Object.assign({}, state, {tickers});
    }

}