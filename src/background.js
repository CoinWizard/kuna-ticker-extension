import * as _ from 'lodash';

import ExtensionPlatform from './Library/Extension';
const ext = new ExtensionPlatform;

import * as Events from './Library/EventProtocol/Events';
import * as KunaApiClient from './Library/Kuna/ApiClient';
import KunaTickerMap from './Library/Kuna/TickerMap';


const Tickers = {};

_.each(KunaTickerMap, (ticker) => {
    Tickers[ticker.key] = {
        ...ticker,
        price: 0
    };
});

let currentTickerKey = KunaTickerMap.btcuah.key;

const updateTickerPrice = (key) => {
    KunaApiClient.extractTicker(key).then((ticker) => {
        Tickers[key].price = ticker.last;

        ext.getExtension().extension.sendMessage({
            event: Events.UPDATE_TICKER,
            ticker: Tickers[key]
        });
    });
};

const tickerUpdater = () => {
    _.each(Tickers, (ticker) => updateTickerPrice(ticker.key));
};

/**
 * @param request
 * @param sender
 * @param sendResponse
 */
const extensionEventListener = (request, sender, sendResponse) => {
    const {event = null} = request;

    console.log(request, sender);

    if (!event) {
        return;
    }

    switch (event) {
        case Events.GET_CURRENT_TICKER: {
            sendResponse({
                currentTickerKey: currentTickerKey
            });
            break;
        }

        case Events.SET_CURRENT_TICKER: {
            const {tickerKey} = request;
            if (!tickerKey) {
                currentTickerKey = tickerKey;
                sendResponse({
                    currentTicker: currentTickerKey
                });
            }
            break;
        }

        case Events.GET_TICKERS: {
            sendResponse({
                tickers: Tickers
            });
            break;
        }
    }
};


const initBackground = () => {

    ext.getExtension().extension.onMessage.addListener(extensionEventListener);

    tickerUpdater();
    setInterval(tickerUpdater, 30000);
};

document.addEventListener('DOMContentLoaded', initBackground);