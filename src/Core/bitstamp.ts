import Axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const axiosClient: AxiosInstance = Axios.create({
    baseURL: 'https://www.bitstamp.net/api/v2',
});

export interface BitstampTicker {
    high: string;
    last: string;
    timestamp: string;
    bid: string;
    vwap: string;
    volume: string;
    low: string;
    ask: string;
    open: string;
}

export async function fetchBitstampTicker(symbol: string): Promise<BitstampTicker> {
    try {
        const response: AxiosResponse = await axiosClient.get(`/ticker/${symbol}`);

        return response.data;
    } catch (error) {
        const { response = null } = error as AxiosError;

        console.error(error);
        console.error(response);

        throw error;
    }
}
