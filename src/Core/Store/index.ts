import { createStore, applyMiddleware, AnyAction } from 'redux';
import BadgeController from 'background/badge-controller';
import { ActionTypes } from 'Popup/Actions/ActionTypes';
import rootReducer from '../Reducer';
import { IStore, TickerInterface } from '../Interfaces';

const trackBudgeMiddleware = (store: IStore) => (next) => (action: AnyAction) => {
    next(action);

    const {ticker} = store;

    switch (action.type) {
        case ActionTypes.UPDATE_TICKER: {
            if (ticker.currentTickerKey === action.ticker.key) {
                BadgeController.updateBudgetTexts(action.ticker);
            }

            break;
        }

        case ActionTypes.SET_CURRENT_TICKER: {
            const newTicker = ticker.tickers[action.currentTickerKey] as TickerInterface;
            if (newTicker) {
                BadgeController.updateBudgetTexts(newTicker);
            }
            break;
        }
    }
};

const store = createStore<IStore>(
    rootReducer,

    // tslint:disable-next-line
    applyMiddleware(trackBudgeMiddleware),
);

export default store;
