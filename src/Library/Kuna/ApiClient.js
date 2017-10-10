import Axios from 'axios';

const AxiosClient = Axios.create({
    baseURL: 'https://kuna.io/api/v2'
});

/**
 * @param tickerKey
 */
export const extractTicker = (tickerKey) => {

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
};