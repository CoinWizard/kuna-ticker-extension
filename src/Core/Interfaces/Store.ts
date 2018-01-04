import {TickerInterface} from './TickerInterface';
import {Dictionary} from 'lodash';

export interface IGlobalStore {
}

export interface ITickerStore {
    tickers: Dictionary<TickerInterface>;
    currentTickerKey?: string;
}

export interface IStore {
    global: IGlobalStore;
    ticker: ITickerStore;
}