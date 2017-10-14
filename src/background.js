import * as _ from 'lodash';

import ExtensionPlatform from 'Core/Extension';

import {Events} from 'Core/EventProtocol/Events';
import KunaApiClient from 'Core/Kuna/ApiClient';
import KunaTickerMap from 'Core/Kuna/TickerMap';


const TickerStorage = {};

_.each(KunaTickerMap, (ticker) => {
    TickerStorage[ticker.key] = {
        ...ticker,
        price: 0,
        volume_base: 0,
        volume_quote: 0
    };
});

let currentTickerKey = 'btcuah';

const updateTicker = (key) => {
    KunaApiClient.extractTicker(key).then((kunaTickerData) => {

        const currentTicker = TickerStorage[key];

        if (!currentTicker) {
            return;
        }

        currentTicker.price = kunaTickerData.last;
        currentTicker.volume_base = kunaTickerData.vol;
        currentTicker.volume_quote = kunaTickerData.price;

        TickerStorage[key] = currentTicker;

        ExtensionPlatform.getExtension().extension.sendMessage({
            event: Events.UPDATE_TICKER,
            ticker: currentTicker
        });
    });
};

const tickerUpdater = () => {
    _.each(TickerStorage, (ticker) => updateTicker(ticker.key));
};

/**
 * @param request
 * @param sender
 * @param sendResponse
 */
const extensionEventListener = (request, sender, sendResponse) => {
    const {event = null} = request;

    if (!event) {
        return;
    }

    switch (event) {
        case Events.FETCH_CURRENT_TICKER: {
            sendResponse({
                currentTickerKey: currentTickerKey
            });
            break;
        }

        case Events.SET_CURRENT_TICKER: {
            const {tickerKey} = request;
            if (!tickerKey) {
                break;
            }

            currentTickerKey = tickerKey;
            sendResponse({
                currentTicker: currentTickerKey
            });
            break;
        }

        case Events.GET_TICKERS: {
            sendResponse({
                tickers: TickerStorage
            });
            break;
        }
    }
};

const initBackground = () => {
    ExtensionPlatform.getExtension().extension.onMessage.addListener(extensionEventListener);

    tickerUpdater();
    setInterval(tickerUpdater, 30000);
};

document.addEventListener('DOMContentLoaded', initBackground);