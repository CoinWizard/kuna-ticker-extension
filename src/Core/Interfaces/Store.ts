import {TickerInterface} from './TickerInterface';
import {BitfinexTicker} from 'Core/bitfinex';
import {Dictionary} from 'lodash';

export interface IGlobalStore {
    uahRate?: null;
    bitfinexTickers: Dictionary<BitfinexTicker>;
}

export interface ITickerStore {
    tickers: Dictionary<TickerInterface>;
    currentTickerKey?: string;
}

export interface IStore {
    global: IGlobalStore;
    ticker: ITickerStore;
}