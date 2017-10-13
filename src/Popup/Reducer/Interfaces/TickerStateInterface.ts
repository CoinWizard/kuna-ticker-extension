import {TickerInterface} from 'Core/Interfaces/TickerInterface';

export interface TickerStateInterface {
    tickers: Map<string, TickerInterface>
    currentTickerKey?: string
}