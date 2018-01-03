import * as _ from 'lodash';

import {STORE_KEY} from 'Core/Constant';
import store from 'Core/Store';
import {wrapStore} from 'react-chrome-redux';
import ExtensionPlatform from 'Core/Extension';
import {Events} from 'Core/EventProtocol/Events';
import KunaApiClient from 'Core/Kuna/ApiClient';
import BadgeController from 'Background/BadgeController';
import {setupContextMenu} from 'Background/ExtensionSetup';

const updateTicker = (key, kunaTickerData) => {

    const {ticker} = store.getState();

    const currentTicker = ticker.tickers[key];

    if (!currentTicker) {
        return {
            type: "NOTHING"
        };
    }

    try {
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

        if (ticker.currentTickerKey === currentTicker.key) {
            BadgeController.updateBudgetTexts(currentTicker);
        }

        return {
            type: 'UPDATE_TICKER',
            ticker: currentTicker
        };
    } catch (error) {
        console.error(error);
    }

    return {
        type: "NOTHING"
    };
};


const tickerUpdater = () => {
    KunaApiClient.extractTickers().then((tickers) => {
        _.each(tickers, (ticker, key) => store.dispatch(updateTicker(key, ticker.ticker)));
    });
};

const initBackground = () => {

    wrapStore(store, {
        portName: STORE_KEY
    });

    window.getState = () => {
        return store.getState();
    };

    tickerUpdater();
    setInterval(tickerUpdater, 60000);

    ExtensionPlatform.getExtension().browserAction.setBadgeBackgroundColor({
        color: '#11a0ff'
    });
};

document.addEventListener('DOMContentLoaded', initBackground);

setupContextMenu();