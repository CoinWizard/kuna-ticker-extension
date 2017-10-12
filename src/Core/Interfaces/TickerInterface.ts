export interface TickerInterface {
    key: string;
    baseCurrency: string;
    quoteCurrency: string;
    format: string;

    price?: number;
    volume_base?: number;
    volume_quote?: number;
}