import store from './Store/Store';

import ExtensionPlatform from './../Library/Extension';
const ext = new ExtensionPlatform;

import * as Events from './../Library/EventProtocol/Events';

import {updateTickerPrice} from './Actions/TickerActions';

ext.getExtension().extension.onMessage.addListener((request, sender, sendResponse) => {
    let {event = null, ...payload} = request;

    if (!event) {
        throw Error("Event! Must be set");
    }

    switch (event) {
        case Events.UPDATE_TICKER: {
            store.dispatch(updateTickerPrice(payload));
            break;
        }

        default: {
            throw Error(`Not supported Event ${payload}`);
        }
    }
});