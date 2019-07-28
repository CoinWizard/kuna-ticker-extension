import { createStore, applyMiddleware, AnyAction, MiddlewareAPI, Dispatch } from 'redux';
import BadgeController from 'background/badge-controller';
import { ActionTypes } from 'Core/actions';
import rootReducer from '../Reducer';
import { IStore, TickerInterface } from '../Interfaces';

const trackBudgeMiddleware = (api: MiddlewareAPI<IStore>) => {
    return (next: Dispatch<IStore>) => {
        return (action: AnyAction) => {
            next(action);

            const {ticker} = api.getState();

            if (!ticker) {
                return;
            }

            switch (action.type) {
                case ActionTypes.UPDATE_TICKER: {
                    if (ticker.currentTickerKey === action.ticker.key) {
                        BadgeController.updateBudgetTexts(action.ticker);
                    }

                    break;
                }

                case ActionTypes.SET_CURRENT_TICKER: {
                    const newTicker = ticker.tickers[action.tickerKey] as TickerInterface;
                    if (newTicker) {
                        BadgeController.updateBudgetTexts(newTicker);
                    }
                    break;
                }
            }
        };
    };
};

const store = createStore<IStore>(
    rootReducer,
    applyMiddleware(
        trackBudgeMiddleware as any,
    ),
);

export default store;
