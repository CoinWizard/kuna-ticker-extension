// import './cross-origin-handler';

import * as _ from 'lodash';
import { kunaApiClient } from 'kuna-sdk';

import { STORE_KEY } from 'Core/Constant';
import store from 'Core/Store/index';
import { wrapStore } from 'react-chrome-redux';
import ExtensionPlatform from 'Core/Extension';
import BadgeController from 'background/badge-controller';
import { setupContextMenu } from 'background/ExtensionSetup';

import { checkUahRate } from 'background/check-uah-rate';
import { processBitfinexTickers } from 'background/check-bitfinex';
import { processBitstampTickers } from 'background/check-bitstamp';

const updateTicker = (key, kunaTickerData) => {
    const {ticker} = store.getState();

    const currentTicker = ticker.tickers[key];

    if (!currentTicker) {
        return {
            type: 'NOTHING'
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
            ask: kunaTickerData.sell,
            bid: kunaTickerData.buy,
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
    const tickers = await kunaApiClient.getTickers();

    _.each(tickers, ticker => store.dispatch(updateTicker(ticker.market, ticker)));
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

    let notify = ExtensionPlatform.getExtension().notifications;

    if (!!notify) {
        notify.create({
            type: 'basic',
            iconUrl: '/images/kuna_258.png',
            title: 'Kuna Ticker now in AppStore',
            message: 'Open AppStore to install iOS application'
        });

        const onClick = () => {
            notify.onClicked.removeListener(onClick);

            ExtensionPlatform.getTabs().create({
                url: 'https://itunes.apple.com/us/app/id1441322325'
            });
        };

        notify.onClicked.addListener(onClick);
    }


    switch (event.reason) {
        case 'install':
            break;

        case 'update':
            break;
    }
});