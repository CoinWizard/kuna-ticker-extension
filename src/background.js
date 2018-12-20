// import './cross-origin-handler';

import * as _ from 'lodash';
import { wrapStore } from 'react-chrome-redux';
import { STORE_KEY } from 'Core/Constant';
import store from 'Core/Store';
import kunaClient from 'Core/kuna-client';
import ExtensionPlatform from 'Core/Extension';
import BadgeController from 'background/badge-controller';
import { checkUahRate } from 'background/check-uah-rate';
import { setupContextMenu } from 'background/ExtensionSetup';
import { processBitfinexTickers } from 'background/check-bitfinex';
import { processBitstampTickers } from 'background/check-bitstamp';


/**
 * @param {string} key
 * @param {KunaV3Ticker} kunaTickerData
 * @returns {*}
 */
const updateTicker = (key, kunaTickerData) => {
    const {ticker} = store.getState();

    const currentTicker = ticker.tickers[key];

    if (!currentTicker) {
        return {
            type: 'NOTHING'
        };
    }

    try {

        currentTicker.price = kunaTickerData.lastPrice || 0;
        currentTicker.dailyChangePercent = kunaTickerData.dailyChangePercent || 0;
        currentTicker.volume_base = kunaTickerData.volume;
        currentTicker.volume_quote = kunaTickerData.volume * kunaTickerData.lastPrice;

        currentTicker.OHLC = {
            high: kunaTickerData.high,
            low: kunaTickerData.low,
            open: 0,
            close: 0
        };

        currentTicker.depth = {
            ask: kunaTickerData.ask,
            bid: kunaTickerData.bid,
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
        type: 'NOTHING'
    };
};


const tickerUpdater = async () => {
    const tickers = await kunaClient.getTickers();

    _.each(tickers, (ticker) => store.dispatch(updateTicker(ticker.symbol, ticker)));
};

const initBackground = () => {
    wrapStore(store, {
        portName: STORE_KEY
    });

    window.getState = () => {
        return store.getState();
    };


    tickerUpdater();
    setInterval(tickerUpdater, 60 * 1000);


    checkUahRate();
    setInterval(checkUahRate, 60 * 60 * 1000);


    processBitfinexTickers();
    processBitstampTickers();
    setInterval(() => {
        processBitfinexTickers();
        processBitstampTickers();
    }, 10 * 60 * 1000);

    ExtensionPlatform.getExtension().browserAction.setBadgeBackgroundColor({
        color: '#5850FA'
    });
};

document.addEventListener('DOMContentLoaded', initBackground);

setupContextMenu();

ExtensionPlatform.getRuntime().onInstalled.addListener((event) => {
    switch (event.reason) {
        case 'install':
            break;

        case 'update':
            break;
    }
});