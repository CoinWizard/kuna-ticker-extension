import * as _ from 'lodash';

import ExtensionPlatform from 'Core/Extension';

import {Events} from 'Core/EventProtocol/Events';
import KunaApiClient from 'Core/Kuna/ApiClient';
import KunaTickerMap from 'Core/Kuna/TickerMap';

import BadgeController from 'Background/BadgeController';
const TickerStorage = {};

_.each(KunaTickerMap, (ticker) => {
    TickerStorage[ticker.key] = {
        ...ticker,
        price: 0,
        volume_base: 0,
        volume_quote: 0,
        OHLC: {
            high: 0,
            low: 0,
            open: 0,
            close: 0,
        },
        depth: {
            bid: 0,
            ask: 0
        }
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

        currentTicker.OHLC = {
            high: kunaTickerData.high,
            low: kunaTickerData.low,
            open: 0,
            close: 0
        };

        currentTicker.depth = {
            bid: kunaTickerData.sell,
            ask: kunaTickerData.buy
        };

        TickerStorage[key] = currentTicker;

        ExtensionPlatform.getExtension().extension.sendMessage({
            event: Events.UPDATE_TICKER,
            ticker: currentTicker
        });

        if (currentTickerKey === currentTicker.key) {
            BadgeController.updateBudgetTexts(TickerStorage[key]);
        }
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


            try {
                BadgeController.updateBudgetTexts(TickerStorage[currentTickerKey]);
            } catch (error) {
                console.log(error);
            }

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

    ExtensionPlatform.getExtension().browserAction.setBadgeBackgroundColor({
        color: '#11a0ff'
    });
};

document.addEventListener('DOMContentLoaded', initBackground);

ExtensionPlatform.getExtension().contextMenus.removeAll();
ExtensionPlatform.getExtension().contextMenus.create({
    title: "by CoinWizard Team",
    contexts: ["browser_action"],
    onclick: () => {
        ExtensionPlatform.getExtension().tabs.create({
            url: "https://coinwizard.me?ref=kuna-extension"
        });
    }
});

ExtensionPlatform.getExtension().contextMenus.create({
    title: "Source code",
    contexts: ["browser_action"],
    onclick: () => {
        ExtensionPlatform.getExtension().tabs.create({
            url: "https://github.com/CoinWizard/kuna-ticker-extension"
        });
    }
});