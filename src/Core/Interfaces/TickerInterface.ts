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

export interface TickerInterface {
    key: string;
    baseCurrency: string;
    quoteCurrency: string;
    format: string;

    OHLC: OHLCInterface;
    depth: DepthInterface;

    price?: number;
    volume_base?: number;
    volume_quote?: number;
}