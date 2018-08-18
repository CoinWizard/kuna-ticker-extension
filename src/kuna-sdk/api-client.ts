import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import { map } from 'lodash';
import { KunaTicker } from './ticker';

function mapTicker(pairKey: string, tickerResponse: any): KunaTicker {
    return {
        pair: pairKey,
        ...tickerResponse,
    };
}

export class KunaApiClient {

    private readonly baseURL: string = 'https://kuna.io/api/v2';
    private axiosClient: AxiosInstance;

    public constructor(baseURL?: string) {
        if (baseURL) {
            this.baseURL = baseURL;
        }

        this.axiosClient = Axios.create({
            baseURL: this.baseURL,
        });
    }

    public async getTicker(pair: string): Promise<KunaTicker> {
        const { data }: AxiosResponse = await this.axiosClient.get(`/tickers/${pair}`);

        return mapTicker(pair, data.ticker);
    }

    public async getTickers(): Promise<KunaTicker[]> {
        const response: AxiosResponse = await this.axiosClient.get(`/tickers`);

        return map(response.data, (tickerResponse: any, pair: string) => {
            return mapTicker(pair, tickerResponse.ticker);
        });
    }
}
