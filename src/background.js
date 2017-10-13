import * as _ from 'lodash';

import ExtensionPlatform from 'Core/Extension';

import {Events} from 'Core/EventProtocol/Events';
import KunaApiClient from 'Core/Kuna/ApiClient';
import KunaTickerMap from 'Core/Kuna/TickerMap';


const Tickers = {};

_.each(KunaTickerMap, (ticker) => {
    Tickers[ticker.key] = {
        ...ticker,
        price: 0,
        volume_base: 0,
        volume_quote: 0
    };
});

let currentTickerKey = KunaTickerMap.btcuah.key;

const updateTicker = (key) => {
    KunaApiClient.extractTicker(key).then((ticker) => {
        Tickers[key].price = ticker.last;
        Tickers[key].volume_base = ticker.vol;
        Tickers[key].volume_quote = ticker.price;

        ExtensionPlatform.getExtension().extension.sendMessage({
            event: Events.UPDATE_TICKER,
            ticker: Tickers[key]
        });
    });
};

const tickerUpdater = () => {
    _.each(Tickers, (ticker) => updateTicker(ticker.key));
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
                tickers: Tickers
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