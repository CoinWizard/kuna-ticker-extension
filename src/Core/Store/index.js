import {createStore} from 'redux';
import rootReducer from 'Core/Reducer';

const store = createStore(
    rootReducer
);

export default store;