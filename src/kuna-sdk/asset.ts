import { Dictionary } from 'lodash';

export type KunaAsset = {
    key: KunaAssetUnit | string;
    name: string
    color: string
    format: string
}

export enum KunaAssetUnit {
    Bitcoin = 'BTC',
    Ethereum = 'ETH',
    Dash = 'DASH',
    Litecoin = 'LTC',
    BitcoinCash = 'BCH',
    Ripple = 'XRP',

    Waves = 'WAVES',
    Golos = 'GOL',
    GolosGold = 'GBG',

    RussianMinerCoin = 'RMC',
    Revain = 'R',
    Aeron = 'ARN',
    Karbo = 'KRB',
    Remme = 'REM',
    Nem = 'XEM',
    Everus = 'EVR',
    ERC20 = 'ERC20',
    Venus = 'VENUS',
    EOS = 'EOS',
    B2bx = 'B2B',
    FoodCoin = 'FOOD',
    Octanox = 'OTX',
    Hacken = 'HKN',
    ZCash = 'ZEC',
    TrueUSD = 'TUSD',
    Tether = 'USDT',
    StatisEuro = 'EURS',
    Stellar = 'XLM',

    KunaToken = 'KUN',

    UkrainianHryvnia = 'UAH',
    USDollar = 'USD',
    Euro = 'EUR',
}

export const kunaAssets: Dictionary<KunaAsset> = {
    [KunaAssetUnit.Bitcoin]: {
        key: KunaAssetUnit.Bitcoin,
        name: 'Bitcoin',
        color: '#f7931a',
        format: '0,0.[000000]',
    },
    [KunaAssetUnit.Ethereum]: {
        key: KunaAssetUnit.Ethereum,
        name: 'Ethereum',
        color: '#434348',
        format: '0,0.[0000]',
    },
    [KunaAssetUnit.Dash]: {
        key: KunaAssetUnit.Dash,
        name: 'Dash',
        color: '#0096C8',
        format: '0,0.[0000]',
    },
    [KunaAssetUnit.Litecoin]: {
        key: KunaAssetUnit.Litecoin,
        name: 'Litecoin',
        color: '#cbc6c6',
        format: '0,0.[0000]',
    },
    [KunaAssetUnit.UkrainianHryvnia]: {
        key: KunaAssetUnit.UkrainianHryvnia,
        name: 'Ukrainian Hryvnia',
        color: '#d8c566',
        format: '0,0.[00]',
    },
    [KunaAssetUnit.KunaToken]: {
        key: KunaAssetUnit.KunaToken,
        name: 'Kun',
        color: '#11a0ff',
        format: '0,0',
    },
    [KunaAssetUnit.BitcoinCash]: {
        key: KunaAssetUnit.BitcoinCash,
        name: 'Bitcoin Cash',
        color: '#f7931a',
        format: '0,0.[0000]',
    },
    [KunaAssetUnit.Waves]: {
        key: KunaAssetUnit.Waves,
        name: 'Waves',
        color: '#0096C8',
        format: '0,0.[0000]',
    },
    [KunaAssetUnit.GolosGold]: {
        key: KunaAssetUnit.GolosGold,
        name: 'Golos Gold',
        color: '#dab236',
        format: '0,0.[0000]',
    },
    [KunaAssetUnit.Golos]: {
        key: KunaAssetUnit.Golos,
        name: 'Golos',
        color: '#2768aa',
        format: '0,0.[0000]',
    },
    [KunaAssetUnit.RussianMinerCoin]: {
        key: KunaAssetUnit.RussianMinerCoin,
        name: 'Russian Miner Coin',
        color: '#d21f26',
        format: '0,0.[00]',
    },
    [KunaAssetUnit.Revain]: {
        key: KunaAssetUnit.Revain,
        name: 'Revain',
        color: '#bd2df5',
        format: '0,0.[0000]',
    },
    [KunaAssetUnit.Aeron]: {
        key: KunaAssetUnit.Aeron,
        name: 'Aeron',
        color: '#135180',
        format: '0,0.[0000]',
    },
    [KunaAssetUnit.Everus]: {
        key: KunaAssetUnit.Everus,
        name: 'Everus',
        color: '#35beb4',
        format: '0,0.[0000]',
    },
    [KunaAssetUnit.B2bx]: {
        key: KunaAssetUnit.B2bx,
        name: 'B2bx',
        color: '#00a275',
        format: '0,0.[0000]',
    },
    [KunaAssetUnit.Ripple]: {
        key: KunaAssetUnit.Ripple,
        name: 'Ripple',
        color: '#0096C8',
        format: '0,0.[0000]',
    },
    [KunaAssetUnit.EOS]: {
        key: KunaAssetUnit.EOS,
        name: 'EOS',
        color: '#0096C8',
        format: '0,0.[0000]',
    },
    [KunaAssetUnit.FoodCoin]: {
        key: KunaAssetUnit.FoodCoin,
        name: 'FoodCoin',
        color: '#0096C8',
        format: '0,0.[0000]',
    },
    [KunaAssetUnit.Octanox]: {
        key: KunaAssetUnit.Octanox,
        name: 'Octanox',
        color: '#0096C8',
        format: '0,0.[0000]',
    },
    [KunaAssetUnit.Hacken]: {
        key: KunaAssetUnit.Hacken,
        name: 'Hacken',
        color: '#0096C8',
        format: '0,0.[0000]',
    },
    [KunaAssetUnit.Stellar]: {
        key: KunaAssetUnit.Stellar,
        name: 'Stellar',
        color: '#0096C8',
        format: '0,0.[0000]',
    },
    [KunaAssetUnit.TrueUSD]: {
        key: KunaAssetUnit.TrueUSD,
        name: 'TrueUSD',
        color: '#0096C8',
        format: '0,0.[0000]',
    },
    [KunaAssetUnit.ZCash]: {
        key: KunaAssetUnit.ZCash,
        name: 'ZCash',
        color: '#0096C8',
        format: '0,0.[0000]',
    },
    [KunaAssetUnit.Venus]: {
        key: KunaAssetUnit.Venus,
        name: 'Venus',
        color: '#0096C8',
        format: '0,0.[0000]',
    },
    [KunaAssetUnit.ERC20]: {
        key: KunaAssetUnit.ERC20,
        name: 'ERC20',
        color: '#0096C8',
        format: '0,0.[0000]',
    },
    [KunaAssetUnit.Remme]: {
        key: KunaAssetUnit.Remme,
        name: 'Remme',
        color: '#0096C8',
        format: '0,0.[0000]',
    },
    [KunaAssetUnit.Karbo]: {
        key: KunaAssetUnit.Karbo,
        name: 'Karbo',
        color: '#0096C8',
        format: '0,0.[0000]',
    },
    [KunaAssetUnit.Nem]: {
        key: KunaAssetUnit.Nem,
        name: 'Nem',
        color: '#0096C8',
        format: '0,0.[0000]',
    },
};

export function getAsset(assetUnit: KunaAssetUnit): KunaAsset {
    return kunaAssets[assetUnit] || {
        key: assetUnit,
        name: '<no assets>',
        color: '#0096C8',
        format: '0,0.[0000]',
    };
}
