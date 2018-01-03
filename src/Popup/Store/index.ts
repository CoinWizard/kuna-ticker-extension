import {Store} from 'react-chrome-redux';

import {STORE_KEY} from 'Core/Constant';
import {IStore} from 'Core/Interfaces/Store';

const proxyStore = new Store({
    portName: STORE_KEY
});

export default proxyStore;

export const getState = (): IStore => proxyStore.getState();