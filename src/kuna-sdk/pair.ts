import { Dictionary } from 'lodash';
import { KunaAssetUnit } from './asset';

export type KunaPair = {
    key: string;
    baseAsset: KunaAssetUnit;
    quoteAsset: KunaAssetUnit;
    format: string;
    compareTo?: string;
};

export const kunaPairMap: Dictionary<KunaPair> = {
    btcuah: {
        key: 'btcuah',
        baseAsset: KunaAssetUnit.Bitcoin,
        quoteAsset: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[00]',
        compareTo: 'btcusd',
    },
    ethuah: {
        key: 'ethuah',
        baseAsset: KunaAssetUnit.Ethereum,
        quoteAsset: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[00]',
        compareTo: 'ethusd',
    },
    dashuah: {
        key: 'dashuah',
        baseAsset: KunaAssetUnit.Dash,
        quoteAsset: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[00]',
        compareTo: 'dshusd',
    },
    xrpuah: {
        key: 'xrpuah',
        baseAsset: KunaAssetUnit.Ripple,
        quoteAsset: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[00]',
        compareTo: 'xrpusd',
    },
    ltcuah: {
        key: 'ltcuah',
        baseAsset: KunaAssetUnit.Litecoin,
        quoteAsset: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[00]',
        compareTo: 'ltcusd',
    },
    eosuah: {
        key: 'eosuah',
        baseAsset: KunaAssetUnit.EOS,
        quoteAsset: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[00]',
        compareTo: 'eosusd',
    },
    krbuah: {
        key: 'krbuah',
        baseAsset: KunaAssetUnit.Karbo,
        quoteAsset: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[00]',
    },
    xemuah: {
        key: 'xemuah',
        baseAsset: KunaAssetUnit.Nem,
        quoteAsset: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[00]',
    },
    remuah: {
        key: 'remuah',
        baseAsset: KunaAssetUnit.Remme,
        quoteAsset: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[00]',
    },
    wavesuah: {
        key: 'wavesuah',
        baseAsset: KunaAssetUnit.Waves,
        quoteAsset: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[00]',
    },
    zecuah: {
        key: 'zecuah',
        baseAsset: KunaAssetUnit.ZCash,
        quoteAsset: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[00]',
    },
    bchuah: {
        key: 'bchuah',
        baseAsset: KunaAssetUnit.BitcoinCash,
        quoteAsset: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[00]',
    },
    gbguah: {
        key: 'gbguah',
        baseAsset: KunaAssetUnit.GolosGold,
        quoteAsset: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[00]',
    },

    // to Bitcoin
    kunbtc: {
        key: 'kunbtc',
        baseAsset: KunaAssetUnit.KunaToken,
        quoteAsset: KunaAssetUnit.Bitcoin,
        format: '0,0.[000000]',
    },
    bchbtc: {
        key: 'bchbtc',
        baseAsset: KunaAssetUnit.BitcoinCash,
        quoteAsset: KunaAssetUnit.Bitcoin,
        format: '0,0.[000000]',
    },
    rmcbtc: {
        key: 'rmcbtc',
        baseAsset: KunaAssetUnit.RussianMinerCoin,
        quoteAsset: KunaAssetUnit.Bitcoin,
        format: '0,0.[000000]',
    },
    rbtc: {
        key: 'rbtc',
        baseAsset: KunaAssetUnit.Revain,
        quoteAsset: KunaAssetUnit.Bitcoin,
        format: '0,0.[000000]',
    },
    arnbtc: {
        key: 'arnbtc',
        baseAsset: KunaAssetUnit.Aeron,
        quoteAsset: KunaAssetUnit.Bitcoin,
        format: '0,0.[000000]',
    },
    evrbtc: {
        key: 'evrbtc',
        baseAsset: KunaAssetUnit.Everus,
        quoteAsset: KunaAssetUnit.Bitcoin,
        format: '0,0.[000000]',
    },
    foodbtc: {
        key: 'foodbtc',
        baseAsset: KunaAssetUnit.FoodCoin,
        quoteAsset: KunaAssetUnit.Bitcoin,
        format: '0,0.[000000]',
    },
    erc20btc: {
        key: 'erc20btc',
        baseAsset: KunaAssetUnit.ERC20,
        quoteAsset: KunaAssetUnit.Bitcoin,
        format: '0,0.[00000]',
    },
    hknbtc: {
        key: 'hknbtc',
        baseAsset: KunaAssetUnit.Hacken,
        quoteAsset: KunaAssetUnit.Bitcoin,
        format: '0,0.[000000]',
    },
    venusbtc: {
        key: 'venusbtc',
        baseAsset: KunaAssetUnit.Venus,
        quoteAsset: KunaAssetUnit.Bitcoin,
        format: '0,0.[000000]',
    },
    xlmuah: {
        key: 'xlmuah',
        baseAsset: KunaAssetUnit.Stellar,
        quoteAsset: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[000000]',
    },
    tusduah: {
        key: 'tusduah',
        baseAsset: KunaAssetUnit.TrueUSD,
        quoteAsset: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[000000]',
    },

    // to Golos Gold
    golgbg: {
        key: 'golgbg',
        baseAsset: KunaAssetUnit.Golos,
        quoteAsset: KunaAssetUnit.GolosGold,
        format: '0,0.[0000]',
    },

    // to Ethereum
    remeth: {
        key: 'remeth',
        baseAsset: KunaAssetUnit.Remme,
        quoteAsset: KunaAssetUnit.Ethereum,
        format: '0,0.[00000000]',
    },
};
