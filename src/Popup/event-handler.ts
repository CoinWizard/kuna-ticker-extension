import store from 'Popup/store';
import ExtensionPlatform from 'Core/Extension';
import { Events } from 'Core/EventProtocol/Events';
import { TickerActions } from 'Core/actions';

ExtensionPlatform.getExtension().extension.onMessage.addListener((request, sender, sendResponse) => {
    let { event = null, ...payload } = request;

    if (!event) {
        throw Error('Event! Must be set');
    }

    switch (event) {
        case Events.UPDATE_TICKER: {
            if ('key' in payload) {
                store.dispatch(TickerActions.updateTicker(payload));
            }
            break;
        }

        default: {
            throw Error(`Not supported Event ${payload}`);
        }
    }
});