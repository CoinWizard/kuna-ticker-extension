import {IGlobalStore} from 'Core/Interfaces/Store';
import {ObjectUtility} from "Core/ObjectUtility";
import {BitfinexTicker} from "Core/bitfinex";

const initialState: IGlobalStore = {
    uahRate: null,
    bitfinexTickers: {}
};

interface ActionInterface {
    type: string;

    [key: string]: any;
}

function updateBitfinexTicker(state: IGlobalStore, symbol: string, ticker: BitfinexTicker) {
    const {bitfinexTickers} = state;
    bitfinexTickers[symbol] = ticker;

    return ObjectUtility.updateObject(state, {
        bitfinexTickers: bitfinexTickers
    });
}

/**
 * @param {IGlobalStore} state
 * @param {ActionInterface} action
 * @returns {IGlobalStore}
 */
export default function globalState(state: IGlobalStore = initialState, action: ActionInterface = null) {

    switch (action.type) {
        case "GLOBAL::SET_UAH_RATE": {
            return ObjectUtility.updateObject(state, {uahRate: action.uahRate});
        }

        case "GLOBAL::SET_BITFINEX_TICKER": {
            return updateBitfinexTicker(state, action.symbol, action.ticker);
        }
    }

    return state;
}
