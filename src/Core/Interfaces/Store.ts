import { BitfinexTicker } from 'Core/bitfinex';
import { BitstampTicker } from 'Core/bitstamp';
import { TickerInterface } from './TickerInterface';


export interface IGlobalStore {
    uahRate?: null;
    bitfinexTickers: Record<string, BitfinexTicker>;
    bitstampTickers: Record<string, BitstampTicker>;
}

export interface ITickerStore {
    tickers: Record<string, TickerInterface>;
    currentTickerKey?: string;
}

export interface IStore {
    global: IGlobalStore;
    ticker: ITickerStore;
}