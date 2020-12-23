import Redux from 'redux';
import { each } from 'lodash';
import { KunaV3Currency, KunaV3Market, KunaV3Ticker } from 'kuna-sdk';
import kunaClient from 'Core/kuna-client';
import { IStore } from 'Core/Interfaces';
import { checkUahRate } from '../check-uah-rate';
import { checkRates } from '../check-rates';
import { processBitfinexTickers } from '../check-bitfinex';
import { processBitstampTickers } from '../check-bitstamp';
import { processBinanceTickers } from '../check-binance';
import { KunaAssetUnit } from 'kuna-sdk/lib/asset';


export class RootController {
  protected store: Redux.Store<IStore>;

  public constructor(store: Redux.Store<any>) {
    this.store = store;

    this.marketListUpdater().then(() => {
      this.tickerUpdater();
      setInterval(() => this.tickerUpdater(), 60 * 1000);
    });

    setInterval(() => this.marketListUpdater(), 4 * 60 * 60 * 1000);

    checkUahRate();
    checkRates();
    setInterval(checkUahRate, 60 * 60 * 1000);

    processBitfinexTickers();
    processBinanceTickers();
    processBitstampTickers();

    setInterval(() => {
      checkRates().catch((error: Error) => {
        console.error(error);
      });

      processBitfinexTickers();
      processBinanceTickers();
      processBitstampTickers();
    }, 10 * 60 * 1000);
  }


  protected async marketListUpdater(): Promise<void> {
    const markets = await kunaClient.getMarkets();
    const currencies = await kunaClient.getCurrencies();

    this.store.dispatch(this.updateMarkets(markets));
    this.store.dispatch(this.updateCurrencies(currencies));
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
    const { ticker, global } = this.store.getState();

    if (!global.markets) {
      return {
        type: 'NOTHING',
      };
    }

    const marketIndex = global.markets.findIndex((m: KunaV3Market) => m.id === key);

    if (marketIndex === -1) {
      return {
        type: 'NOTHING',
      };
    }

    const market = global.markets[marketIndex];

    try {
      const newTicker: any = {
        key: key,
        index: marketIndex,
        baseAsset: market.base_unit.toUpperCase(),
        quoteAsset: market.quote_unit.toUpperCase(),
        format: '0,0.00[0000]',
        decimal: market.quote_precision,

        price: kunaTickerData.lastPrice || 0,
        dailyChangePercent: kunaTickerData.dailyChangePercent || 0,
        volume_base: kunaTickerData.volume,
        volume_quote: kunaTickerData.volume * kunaTickerData.lastPrice,

        OHLC: {
          high: kunaTickerData.high,
          low: kunaTickerData.low,
          open: 0,
          close: 0,
        },

        depth: {
          ask: kunaTickerData.ask,
          bid: kunaTickerData.bid,
        },
      };

      return {
        type: 'UPDATE_TICKER',
        ticker: newTicker,
      };
    } catch (error) {
      console.error(error);
    }

    return {
      type: 'NOTHING',
    };
  }


  protected updateCurrencies(currencies: KunaV3Currency[]): Redux.AnyAction {
    return {
      type: 'GLOBAL::SET_CURRENCIES',
      currencies: currencies,
    };
  }


  protected updateMarkets(markets: KunaV3Market[]): Redux.AnyAction {
    return {
      type: 'GLOBAL::SET_MARKETS',
      markets: markets,
    };
  }
}
