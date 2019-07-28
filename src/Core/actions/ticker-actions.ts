import { TickerInterface } from 'Core/Interfaces';
import ActionTypes from './action-types';

export default class TickerActions {
    public static updateTicker(ticker: TickerInterface) {
        return {
            type: ActionTypes.UPDATE_TICKER,
            ticker: ticker,
        };
    }

    public static setCurrentTickerKey(tickerKey: string) {
        return {
            type: ActionTypes.SET_CURRENT_TICKER,
            tickerKey: tickerKey,
        };
    }

    public static fetchTickers(tickers: Map<string, TickerInterface>) {
        return {
            type: ActionTypes.FETCH_TICKERS,
            tickers: tickers,
        };
    }
}
