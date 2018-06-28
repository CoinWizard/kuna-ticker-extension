import {Dictionary} from "lodash";

export enum CoinUnits {
    Bitcoin = 'BTC',
    Ethereum = 'ETH',
    Dash = 'DASH',
    Litecoin = 'LTC',
    BitcoinCash = 'BCH',

    Waves = 'WAVES',
    Golos = 'GOL',
    GolosGold = 'GBG',

    RussianMinerCoin = 'RMC',
    Revain = 'R',
    Aeron = 'ARN',
    Karbo = 'KRB',
    Remme = 'REM',
    Nem = 'XEM',

    KunaToken = 'KUN',

    UrainianHrivna = 'UAH'
}

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
    DASH: {
        key: 'DASH',
        name: 'Dash',
        color: '#0096C8',
        format: '0,0.[0000]'
    },
    LTC: {
        key: 'LTC',
        name: 'Litecoin',
        color: '#0096C8',
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
    },
    XRP: {
        key: 'XRP',
        name: 'Ripple',
        color: '#0096C8',
        format: '0,0.[0000]'
    },
    EOS: {
        key: 'EOS',
        name: 'EOS',
        color: '#0096C8',
        format: '0,0.[0000]'
    },
    FOOD: {
        key: 'FOOD',
        name: 'FoodCoin',
        color: '#0096C8',
        format: '0,0.[0000]'
    },
    OTX: {
        key: 'OTX',
        name: 'Octanox',
        color: '#0096C8',
        format: '0,0.[0000]'
    },
    HKN: {
        key: 'HKN',
        name: 'Hacken',
        color: '#0096C8',
        format: '0,0.[0000]'
    },
    XLM: {
        key: 'XLM',
        name: 'Stellar',
        color: '#0096C8',
        format: '0,0.[0000]'
    },
    TUSD: {
        key: 'TUSD',
        name: 'Tether',
        color: '#0096C8',
        format: '0,0.[0000]'
    },
    ZEC: {
        key: 'ZEC',
        name: 'ZCash',
        color: '#0096C8',
        format: '0,0.[0000]'
    },
    VENUS: {
        key: 'VENUS',
        name: 'Venus',
        color: '#0096C8',
        format: '0,0.[0000]'
    },
    ERC20: {
        key: 'ERC20',
        name: 'ERC20',
        color: '#0096C8',
        format: '0,0.[0000]'
    },
    REM: {
        key: 'rem',
        name: 'Remme',
        color: '#0096C8',
        format: '0,0.[0000]'
    },
    KRB: {
        key: 'krb',
        name: 'Karbo',
        color: '#0096C8',
        format: '0,0.[0000]'
    },
    XEM: {
        key: 'xem',
        name: 'Nem',
        color: '#0096C8',
        format: '0,0.[0000]'
    }
};

export const getCurrencyByKey = (key: string): CurrencyInterface => {
    return currencies[key];
};