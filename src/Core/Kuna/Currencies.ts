import {Dictionary} from "lodash";

export interface CurrencyInterface {
    key: string
    name: string
    color: string
    format: string
}

export const currencies: Dictionary<CurrencyInterface> = {
    BTC: {
        key: 'BTC',
        name: 'Bitcoin',
        color: '#f7931a',
        format: '0,0.[000000]'
    },
    ETH: {
        key: 'ETH',
        name: 'Ethereum',
        color: '#434348',
        format: '0,0.[0000]'
    },
    UAH: {
        key: 'UAH',
        name: 'Ukraine Hryvnia',
        color: '#d8c566',
        format: '0,0.[00]'
    },
    KUN: {
        key: 'KUN',
        name: 'Kun',
        color: '#11a0ff',
        format: '0,0'
    },
    BCH: {
        key: 'BCH',
        name: 'Bitcoin Cash',
        color: '#f7931a',
        format: '0,0.[0000]'
    },
    WAVES: {
        key: 'WAVES',
        name: 'Waves',
        color: '#0096C8',
        format: '0,0.[0000]'
    },
    GBG: {
        key: 'GBG',
        name: 'Golos Gold',
        color: '#dab236',
        format: '0,0.[0000]'
    },
    GOL: {
        key: 'GOL',
        name: 'Golos',
        color: '#2768aa',
        format: '0,0.[0000]'
    },
    RMC: {
        key: 'RMC',
        name: 'Russian Miner Coin',
        color: '#d21f26',
        format: '0,0.[00]'
    },
    R: {
        key: 'R',
        name: 'Revain',
        color: '#bd2df5',
        format: '0,0.[0000]'
    },
    ARN: {
        key: 'ARN',
        name: 'Aeron',
        color: '#135180',
        format: '0,0.[0000]'
    },
    EVR: {
        key: 'EVR',
        name: 'Everus',
        color: '#35beb4',
        format: '0,0.[0000]'
    },
    B2B: {
        key: 'B2B',
        name: 'B2bx',
        color: '#00a275',
        format: '0,0.[0000]'
    }
};

export const getCurrencyByKey = (key: string): CurrencyInterface => {
    return currencies[key];
};