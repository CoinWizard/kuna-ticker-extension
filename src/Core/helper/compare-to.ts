type CompareToResult = {
    toBinance?: string;
    toBitfinex?: string;
    toBitstamp?: string;
};

export default function compareToKeys(symbol: string): CompareToResult {
    switch (symbol) {
        case 'btcuah':
            return { toBinance: 'btcusdt', toBitfinex: 'btcusd', toBitstamp: 'btcusd' };

        case 'bchuah':
            return { toBinance: 'bchusdt', toBitfinex: 'bchusd', toBitstamp: 'bchusd' };

        case 'ethuah':
            return { toBinance: 'ethusdt', toBitfinex: 'ethusd', toBitstamp: 'ethusd' };

        case 'ltcuah':
            return { toBinance: 'ltcusdt', toBitfinex: 'ltcusd', toBitstamp: 'ltcusd' };

        case 'dashuah':
            return { toBinance: 'dashusdt', toBitfinex: 'dshusd', toBitstamp: 'dashusd' };

        case 'xrpuah':
            return { toBinance: 'xrpusdt', toBitfinex: 'xrpusd', toBitstamp: 'xrpusd' };

        case 'eosuah':
            return { toBinance: 'eosusdt', toBitfinex: 'eosusd', toBitstamp: 'eosusd' };


        default:
            return { toBinance: undefined, toBitfinex: undefined, toBitstamp: undefined };
    }
}
