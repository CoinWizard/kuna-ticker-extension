import store from 'Core/Store';
import { fetchBinanceTickers, BinanceTicker } from 'Core/binance-helper';

export const processBinanceTickers = () => {
    fetchBinanceTickers().then((tickers: BinanceTicker[]) => {
        store.dispatch({
            type: 'GLOBAL::SET_BINANCE_TICKER',
            tickers: tickers,
        });
    });
};
