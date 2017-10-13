import {createStore, applyMiddleware, Store} from 'redux'
import rootReducer from 'Popup/Reducer';

const store: Store<any> = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;