import {Dictionary} from "lodash";

export interface CurrencyInterface {
    key: string
    name: string
    color: string
}

export const currencies: Dictionary<CurrencyInterface> = {
    BTC: {
        key: 'BTC',
        name: 'Bitcoin',
        color: '#f7931a'
    },
    ETH: {
        key: 'ETH',
        name: 'Ethereum',
        color: '#434348'
    },
    UAH: {
        key: 'UAH',
        name: 'Ukraine Hryvnia',
        color: '#d8c566'
    },
    KUN: {
        key: 'KUN',
        name: 'Kun',
        color: '#11a0ff'
    },
    BCH: {
        key: 'BCH',
        name: 'Bitcoin Cash',
        color: '#f7931a'
    },
    WAVES: {
        key: 'WAVES',
        name: 'Waves',
        color: '#0096C8'
    },
    GBG: {
        key: 'GBG',
        name: 'Golos Gold',
        color: '#dab236'
    },
    GOL: {
        key: 'GOL',
        name: 'Golos',
        color: '#2768aa'
    },
    RMC: {
        key: 'RMC',
        name: 'Russian Miner Coin',
        color: '#d21f26'
    },
    R: {
        key: 'R',
        name: 'Revain',
        color: '#bd2df5'
    },
    ARN: {
        key: 'ARN',
        name: 'Aeron',
        color: '#135180'
    },
    EVR: {
        key: 'EVR',
        name: 'Everus',
        color: '#35beb4'
    }
};

export const getCurrencyByKey = (key: string): CurrencyInterface => {
    return currencies[key];
};