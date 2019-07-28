import { map, get } from 'lodash';
import Binance, { Ticker } from 'binance-api-node';

const binanceClient = Binance();

export interface BinanceTicker {
    symbol: string;
    ticker: Ticker;
    last_price: string | number;
}

export async function fetchBinanceTickers(): Promise<BinanceTicker[]> {
    try {
        const tickers = await binanceClient.allBookTickers();

        return map(tickers, (ticker, symbol) => ({
            symbol: symbol.toLocaleLowerCase(),
            ticker: ticker,
            last_price: get(ticker, 'askPrice', 0),
        }));
    } catch (error) {
        console.error(error);

        throw error;
    }
}
