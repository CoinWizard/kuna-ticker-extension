import { ActionTypes } from 'Popup/Actions/ActionTypes';
import { ObjectUtility } from 'Core/ObjectUtility';

interface ActionInterface {
    type: string

    ticker?: any
    tickers?: Map<string, any>
    tickerKey?: string
}


interface TickerStateInterface {
    tickers: Map<string, any>
    currentTickerKey?: string
}

const initialTickerState: TickerStateInterface = {
    tickers: ({} as Map<string, any>),
    currentTickerKey: null
};


function updateTicker(state: TickerStateInterface, ticker: any) {
    const { tickers } = state;
    tickers[ticker.key] = ticker;

    return ObjectUtility.updateObject(state, { tickers: tickers });
}

export default function tickerState(state: TickerStateInterface = initialTickerState,
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
