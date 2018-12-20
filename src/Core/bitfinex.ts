import Axios, { AxiosInstance } from 'axios';

const axiosClient: AxiosInstance = Axios.create({
    baseURL: 'https://api.bitfinex.com/v1',
});

export interface BitfinexTicker {
    mid: string | number;
    bid: string | number;
    ask: string | number;
    last_price: string | number;
    low: string | number;
    high: string | number;
    volume: string | number;
    timestamp: string;
}

export async function fetchBitfinexTicker(symbol: string): Promise<BitfinexTicker> {
    try {
        const { data } = await axiosClient.get(`/pubticker/${symbol}`);

        return data as BitfinexTicker;
    } catch (error) {
        console.warn(error);
    }
}
