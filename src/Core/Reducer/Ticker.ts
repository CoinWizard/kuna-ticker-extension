import { Dictionary, each } from 'lodash';

import { kunaMarketMap } from 'kuna-sdk';

import { ActionTypes } from 'Popup/Actions/ActionTypes';
import { ObjectUtility } from 'Core/ObjectUtility';
import { TickerInterface } from 'Core/Interfaces';
import { ITickerStore } from 'Core/Interfaces';

const initialTickerState: ITickerStore = {
    tickers: {} as Dictionary<TickerInterface>,
    currentTickerKey: 'btcuah',
};

each(kunaMarketMap, (pair) => {
    initialTickerState.tickers[pair.key] = {
        ...pair,

        price: 0,
        volume_base: 0,
        volume_quote: 0,
        OHLC: {
            high: 0,
            low: 0,
            open: 0,
            close: 0,
        },
        depth: {
            bid: 0,
            ask: 0,
        },
    };
});


interface ActionInterface {
    type: string

    ticker?: TickerInterface
    tickers?: Map<string, TickerInterface>
    tickerKey?: string
}

function updateTicker(state: ITickerStore, ticker: TickerInterface) {
    const { tickers } = state;
    tickers[ticker.key] = ticker;

    return ObjectUtility.updateObject(state, { tickers: tickers });
}

export default function tickerState(state: ITickerStore = initialTickerState,
                                    action: ActionInterface = null) {
    switch (action.type) {
        case ActionTypes.FETCH_TICKERS: {
            return ObjectUtility.updateObject(state, { tickers: action.tickers });
        }

        case ActionTypes.UPDATE_TICKER: {
            return updateTicker(state, action.ticker);
        }

        case ActionTypes.SET_CURRENT_TICKER: {
            return ObjectUtility.updateObject(state, { currentTickerKey: action.tickerKey });
        }
    }

    return state;
}
