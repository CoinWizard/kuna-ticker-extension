import { IGlobalStore } from 'Core/Interfaces/Store';
import { ObjectUtility } from 'Core/ObjectUtility';
import { BitfinexTicker } from 'Core/bitfinex';
import { BitstampTicker } from 'Core/bitstamp';
import { BinanceTicker } from 'Core/binance-helper';

const initialState: IGlobalStore = {
    uahRate: null,
    bitfinexTickers: {},
    bitstampTickers: {},
    binanceTickers: {},
};

interface ActionInterface {
    type: string;

    [key: string]: any;
}

function updateBitfinexTicker(state: IGlobalStore, symbol: string, ticker: BitfinexTicker) {
    const { bitfinexTickers } = state;
    bitfinexTickers[symbol] = ticker;

    return ObjectUtility.updateObject(state, {
        bitfinexTickers: bitfinexTickers,
    });
}

function updateBitstampTicker(state: IGlobalStore, symbol: string, ticker: BitstampTicker) {
    const { bitstampTickers } = state;

    bitstampTickers[symbol] = ticker;

    return ObjectUtility.updateObject(state, {
        bitstampTickers: bitstampTickers,
    });
}


function updateBinanceTicker(state: IGlobalStore, tickers: BinanceTicker[]) {
    const { binanceTickers } = state;

    tickers.map((t: BinanceTicker) => {
        binanceTickers[t.symbol] = t;
    });

    return ObjectUtility.updateObject(state, {
        binanceTickers: binanceTickers,
    });
}


/**
 * @param {IGlobalStore} state
 * @param {ActionInterface} action
 * @returns {IGlobalStore}
 */
export default function globalState(state: IGlobalStore = initialState, action: ActionInterface = null) {

    switch (action.type) {
        case 'GLOBAL::SET_UAH_RATE': {
            return ObjectUtility.updateObject(state, { uahRate: action.uahRate });
        }

        case 'GLOBAL::SET_BITFINEX_TICKER': {
            return updateBitfinexTicker(state, action.symbol, action.ticker);
        }

        case 'GLOBAL::SET_BITSTAMP_TICKER': {
            return updateBitstampTicker(state, action.symbol, action.ticker);
        }

        case 'GLOBAL::SET_BINANCE_TICKER': {
            return updateBinanceTicker(state, action.tickers);
        }
    }

    return state;
}
