import store from "Core/Store";
import {map} from 'lodash';
import {fetchBitfinexTicker, BitfinexTicker} from 'Core/bitfinex';

const symbolsToCheck = [
    'btcusd',
    'ltcusd',
    'xrpusd',
    'ethusd'
];

export const fetchAndStoreTickers = (symbol: string) => {
    fetchBitfinexTicker(symbol).then((ticker: BitfinexTicker) => {
        store.dispatch({
            type: "GLOBAL::SET_BITFINEX_TICKER",
            symbol: symbol,
            ticker: ticker
        });
    })
};


export const processBitfinexTickers = () => {
    map(symbolsToCheck, fetchAndStoreTickers);
};