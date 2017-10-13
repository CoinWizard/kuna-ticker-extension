import Axios from 'axios';

export class KunApiClient {

    private axiosClient: Axios;

    constructor() {
        this.axiosClient = Axios.create({
            baseURL: 'https://kuna.io/api/v2'
        });
    }

    extractTicker(tickerKey: string): Promise {

        /**
         * @param response
         * @returns {Object} ticker
         */
        const onSuccess = (response) => {
            const {data} = response;

            return data.ticker;
        };

        /**
         * @param response
         * @param error
         */
        const onError = ({response, ...error}) => {
            console.error(error);
            console.error(response);
        };

        return AxiosClient.get(`/tickers/${tickerKey}`)
            .then(onSuccess);
    }
}


const kunaApiClientInstance: KunApiClient = new KunApiClient();
export default kunaApiClientInstance;