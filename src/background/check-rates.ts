import store from 'Core/Store';
import kunaClient from 'Core/kuna-client';

export async function checkRates() {
    const rates = await kunaClient.getExchangeRates();

    store.dispatch({
        type: 'GLOBAL::SET_RATES',
        rates: rates,
    });
}
