import { ActionTypes } from 'Popup/Actions/ActionTypes';
import { TickerInterface } from 'Core/Interfaces';

export class TickerActions {

    static updateTicker(ticker: TickerInterface) {
        return {
            type: ActionTypes.UPDATE_TICKER,
            ticker: ticker,
        };
    }

    static setCurrentTickerKey(tickerKey: string) {
        return {
            type: ActionTypes.SET_CURRENT_TICKER,
            tickerKey: tickerKey,
        };
    }

    static fetchTickers(tickers: Map<string, TickerInterface>) {
        return {
            type: ActionTypes.FETCH_TICKERS,
            tickers: tickers,
        };
    }
}