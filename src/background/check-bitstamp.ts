import store from 'Core/Store';
import { map } from 'lodash';
import { fetchBitstampTicker, BitstampTicker } from 'Core/bitstamp';

const symbolsToCheck = [
    // Common
    'btcusd',  // Bitcoin
    'ltcusd',  // Litecoin
    'xrpusd',  // Ripple
    'ethusd',  // Ethereum
    'bchusd',  // Bitcoin Cash
];

const fetchAndStoreTickers = (symbol: string) => {
    fetchBitstampTicker(symbol).then((ticker: BitstampTicker) => {
        store.dispatch({
            type: 'GLOBAL::SET_BITSTAMP_TICKER',
            symbol: symbol,
            ticker: ticker,
        });
    });
};


export const processBitstampTickers = () => {
    map(symbolsToCheck, fetchAndStoreTickers);
};
