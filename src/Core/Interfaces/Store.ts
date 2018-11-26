import { BitfinexTicker } from 'Core/bitfinex';
import { TickerInterface } from './TickerInterface';

export interface IGlobalStore {
    uahRate?: null;
    bitfinexTickers: Record<string, BitfinexTicker>;
}

export interface ITickerStore {
    tickers: Record<string, TickerInterface>;
    currentTickerKey?: string;
}

export interface IStore {
    global: IGlobalStore;
    ticker: ITickerStore;
}