import Axios, {AxiosInstance, AxiosPromise, AxiosResponse, AxiosError} from 'axios';

const gowAxios = Axios.create({
    baseURL: "https://bank.gov.ua/NBUStatService/v1/"
});

export function fetchUahRate(): Promise<number> {
    const onSuccess = (response: AxiosResponse): number => {
        return response.data[0]['rate'] as number;
    };

    return gowAxios.get("/statdirectory/exchange?json&valcode=USD").then(onSuccess);
}
