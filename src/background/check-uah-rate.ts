import store from 'Core/Store'
import kunaClient from 'Core/kuna-client';

export async function checkUahRate() {

    const rates = await kunaClient.getExchangeRates();
    const uahRate = rates.find(rate => rate.currency === 'uah');
    if (uahRate) {
        store.dispatch({
            type: 'GLOBAL::SET_UAH_RATE',
            uahRate: uahRate.usd,
        });
    }
}
