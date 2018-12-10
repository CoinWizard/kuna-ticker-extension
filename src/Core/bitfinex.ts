import Axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

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

export function fetchBitfinexTicker(symbol: string): Promise<BitfinexTicker> {
    const onSuccess = (response: AxiosResponse) => {
        return response.data;
    };

    const onError = (error: AxiosError) => {

        const { response = null } = error;

        console.error(error);
        console.error(response);
    };

    return axiosClient.get(`/pubticker/${symbol}`).then(onSuccess, onError);
}
