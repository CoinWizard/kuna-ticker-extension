import * as _ from 'lodash';

import ExtensionPlatform from './Library/Extension';
const ext = new ExtensionPlatform;

import * as Events from './Library/EventProtocol/Events';
import * as KunaApiClient from './Library/Kuna/ApiClient';
import BaseKunaTickers from './Library/Kuna/Tikers';


const Tickers = {};

_.each(BaseKunaTickers, (ticker) => {
    Tickers[ticker.key] = {
        ...ticker,
        price: 0
    };
});

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


const initBackground = () => {
    ext.getExtension().extension.onMessage.addListener((request, sender, sendResponse) => {
        console.log(request, sender);
    });

    setInterval(tickerUpdater, 30000);
};

document.addEventListener('DOMContentLoaded', initBackground);