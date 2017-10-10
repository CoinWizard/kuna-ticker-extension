import store from './Store/Store';
import UpdateTickerAction from './Actions/Ticker/UpdateTickerAction';

import ExtensionPlatform from './../Library/Extension';
const ext = new ExtensionPlatform;

import * as Events from './../Library/EventProtocol/Events';

ext.getExtension().extension.onMessage.addListener((request, sender, sendResponse) => {
    let {event = null, ...payload} = request;

    if (!event) {
        throw Error("Event! Must be set");
    }

    switch (event) {
        case Events.UPDATE_TICKER: {
            store.dispatch(new UpdateTickerAction(payload));
            break;
        }

        default: {
            throw Error(`Not supported Event ${payload}`);
        }
    }
});