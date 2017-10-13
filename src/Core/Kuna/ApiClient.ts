import Axios, {AxiosInstance, AxiosPromise, AxiosResponse, AxiosError} from 'axios';
import {TickerInterface} from 'Core/Interfaces/TickerInterface';

export class KunApiClient {

    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = Axios.create({
            baseURL: 'https://kuna.io/api/v2'
        });
    }

    extractTicker(tickerKey: string): AxiosPromise {

        const onSuccess = (response: AxiosResponse) => {

            const {data} = response;

            return data.ticker;
        };

        const onError = (error: AxiosError) => {

            const {response = null} = error;

            console.error(error);
            console.error(response);
        };

        return this.axiosClient
            .get(`/tickers/${tickerKey}`)
            .then(onSuccess, onError);
    }
}


const kunaApiClientInstance: KunApiClient = new KunApiClient();
export default kunaApiClientInstance;