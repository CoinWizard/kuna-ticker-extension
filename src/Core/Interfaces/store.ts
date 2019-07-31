import { BitfinexTicker } from 'Core/bitfinex';
import { BitstampTicker } from 'Core/bitstamp';
import { BinanceTicker } from 'Core/binance-helper';
import { KunaV3ExchangeRate } from 'kuna-sdk';
import { TickerInterface } from './TickerInterface';

export interface IGlobalStore {
    rates?: KunaV3ExchangeRate[];
    uahRate?: number;
    bitfinexTickers: Record<string, BitfinexTicker>;
    bitstampTickers: Record<string, BitstampTicker>;
    binanceTickers: Record<string, BinanceTicker>;
}

export interface ITickerStore {
    tickers: Record<string, Partial<TickerInterface>>;
    currentTickerKey?: string;
}

export interface IStore {
    global: IGlobalStore;
    ticker: ITickerStore;
}