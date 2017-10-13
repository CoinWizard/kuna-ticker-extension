import {ActionTypes} from 'Popup/Actions/ActionTypes';
import {ObjectUtility} from 'Core/ObjectUtility';
import {TickerInterface} from 'Core/Interfaces/TickerInterface';

import {TickerStateInterface} from 'Popup/Reducer/Interfaces/TickerStateInterface';

const initialTickerState: TickerStateInterface = {
    tickers: ({} as Map<string, TickerInterface>),
    currentTickerKey: null
};


interface ActionInterface {
    type: string

    ticker?: TickerInterface
    tickers?: Map<string, TickerInterface>
    tickerKey?: string
}

function updateTicker(state: TickerStateInterface, ticker: TickerInterface) {
    const {tickers} = state;
    tickers[ticker.key] = ticker;

    return ObjectUtility.updateObject(state, {tickers: tickers});
}

export default function tickerState(state: TickerStateInterface = initialTickerState,
                                    action: ActionInterface = null) {
    switch (action.type) {
        case ActionTypes.FETCH_TICKERS: {
            return ObjectUtility.updateObject(state, {tickers: action.tickers});
        }

        case ActionTypes.UPDATE_TICKER: {
            return updateTicker(state, action.ticker);
        }

        case ActionTypes.SET_CURRENT_TICKER: {
            return ObjectUtility.updateObject(state, {currentTickerKey: action.tickerKey});
        }
    }

    return state;
}
