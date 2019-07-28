import Redux from 'redux';
import { each } from 'lodash';
import kunaClient from 'Core/kuna-client';
import { IStore } from 'Core/Interfaces';
import { checkUahRate } from '../check-uah-rate';
import { processBitfinexTickers } from '../check-bitfinex';
import { processBitstampTickers } from '../check-bitstamp';
import { processBinanceTickers } from '../check-binance';


export class RootController {
    protected store: Redux.Store<IStore>;

    public constructor(store: Redux.Store<any>) {
        this.store = store;

        this.tickerUpdater();
        setInterval(() => this.tickerUpdater(), 60 * 1000);

        checkUahRate();
        setInterval(checkUahRate, 60 * 60 * 1000);

        processBitfinexTickers();
        processBinanceTickers();
        processBitstampTickers();

        setInterval(() => {
            processBitfinexTickers();
            processBinanceTickers();
            processBitstampTickers();
        }, 10 * 60 * 1000);
    }


    protected async tickerUpdater() {
        const tickers = await kunaClient.getTickers();

        each(tickers, (ticker) => this.store.dispatch(
            this.updateTicker(ticker.symbol, ticker),
        ));
    }

    /**
     * @param {string} key
     * @param {KunaV3Ticker} kunaTickerData
     * @returns {*}
     */
    protected updateTicker(key: string, kunaTickerData) {
        const {ticker} = this.store.getState();

        const currentTicker = ticker.tickers[key];

        if (!currentTicker) {
            return {
                type: 'NOTHING',
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
                close: 0,
            };

            currentTicker.depth = {
                ask: kunaTickerData.ask,
                bid: kunaTickerData.bid,
            };

            return {
                type: 'UPDATE_TICKER',
                ticker: currentTicker,
            };
        } catch (error) {
            console.error(error);
        }

        return {
            type: 'NOTHING',
        };
    }
}
