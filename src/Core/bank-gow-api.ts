import Axios, { AxiosResponse } from 'axios';

const gowAxios = Axios.create({
    baseURL: 'https://bank.gov.ua/NBUStatService/v1/',
});

const minfinAxios = Axios.create({
    baseURL: 'https://minfin.com.ua/',
});


function priceExtractor(el: Element, elementClass: string): number {
    const priceText = el.getElementsByClassName(elementClass)[0].innerHTML;

    return parseFloat(priceText.replace(',', '.'));
}

function extractUahPriceReport(el: HTMLElement): number {
    const text: Element = el.getElementsByClassName('mf-currency-block')[1];

    if (!text) {
        throw new Error('No data');
    }

    const bidPrice = priceExtractor(text, 'mf-currency-bid');
    const askPrice = priceExtractor(text, 'mf-currency-ask');

    return (askPrice + bidPrice) / 2;
}


export const fetchGowUAAxios = (): Promise<number> => {
    const onSuccess = (response: AxiosResponse): number => {
        return response.data[0]['rate'] as number;
    };

    return gowAxios
        .get('/statdirectory/exchange?json&valcode=USD')
        .then(onSuccess);
};

export function fetchUahRate(): Promise<number> {
    const onMinfinSuccess = (response: AxiosResponse) => {

        if (!response.data) {
            throw new Error("Can not load URL");
        }

        const el = document.createElement('html');
        el.innerHTML = response.data;


        return extractUahPriceReport(el);
    };

    return minfinAxios.get('/')
        .then(onMinfinSuccess)
        .catch(fetchGowUAAxios);
}
