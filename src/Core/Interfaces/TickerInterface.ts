import { KunaMarket } from 'kuna-sdk';

export interface OHLCInterface {
    high?: number;
    low?: number;
    open?: number;
    close?: number;
}

export interface DepthInterface {
    bid?: number;
    ask?: number;
}

export type TickerInterface = KunaMarket & {
    OHLC: OHLCInterface;
    depth: DepthInterface;

    price: number;
    dailyChangePercent: number;
    volume_base?: number;
    volume_quote?: number;
}