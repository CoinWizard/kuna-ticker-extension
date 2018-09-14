import { Dictionary } from 'lodash';

export type ArbitrageParams = {
    binanceSymbol: string;

    kunaFee: number;
    binanceFee: number;
};

export const Fees = {
    KUNA_USD_W: 3.8,
    BINANCE_USD_W: 1.91
};

export const arbitrageParamsMap: Dictionary<ArbitrageParams> = {
    'btcuah': {
        binanceSymbol: 'BTCUSDT',
        kunaFee: 0.001,
        binanceFee: 0.0005,
    },
    'ethuah': {
        binanceSymbol: 'ETHUSDT',
        kunaFee: 0.005,
        binanceFee: 0.01,
    },
    'xrpuah': {
        binanceSymbol: 'XRPUSDT',
        kunaFee: 1,
        binanceFee: 0.25,
    },
    'eosuah': {
        binanceSymbol: 'EOSUSDT',
        kunaFee: 0.1,
        binanceFee: 0.05,
    },
    'ltcuah': {
        binanceSymbol: 'LTCUSDT',
        kunaFee: 0.001,
        binanceFee: 0.001,
    },
    'bchuah': {
        binanceSymbol: 'BCCUSDT',
        kunaFee: 0.001,
        binanceFee: 0.001,
    }
};