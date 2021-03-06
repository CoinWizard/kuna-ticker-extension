import { KunaV3ExchangeRate } from 'kuna-sdk';
import React from 'react';
import Numeral from 'numeral';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { TickerInterface } from 'Core/Interfaces';
import { IStore } from 'Core/Interfaces';
import { BitfinexTicker } from 'Core/bitfinex';
import { BitstampTicker } from 'Core/bitstamp';
import { BinanceTicker } from 'Core/binance-helper';

import { compareToExchanges } from 'Core/helper';
import { UsdStatsView } from './extra-view';
import InfoCell from './info-cell';

interface IProps {
    ticker: TickerInterface;
}

interface IStateProps {
    baseRate?: KunaV3ExchangeRate;
    quoteRate?: KunaV3ExchangeRate;
    bitfinexTicker?: BitfinexTicker;
    bitstampTicker?: BitstampTicker;
    binanceTicker?: BinanceTicker;
}

class TickerStatsComponent extends React.Component<IProps & IStateProps> {
    public render() {
        const { ticker, bitfinexTicker, bitstampTicker, binanceTicker } = this.props;

        return (
            <div>
                <InfoCell
                    value={Numeral(ticker.volume_base).format('0,0.[00]')}
                    label={`Volume ${ticker.baseAsset}`}
                />

                <InfoCell
                    value={Numeral(ticker.volume_quote).format('0,0.[00]')}
                    label={`Volume ${ticker.quoteAsset}`}
                />

                <InfoCell
                    value={Numeral(ticker.OHLC.low).format('0,0.[00]')}
                    label="Low price"
                />

                <InfoCell
                    value={Numeral(ticker.OHLC.high).format('0,0.[00]')}
                    label="High price"
                />

                {this.props.quoteRate && (
                    <UsdStatsView
                        rate={this.props.quoteRate}
                        ticker={ticker}
                        bitfinexTicker={bitfinexTicker}
                        bitstampTicker={bitstampTicker}
                        binanceTicker={binanceTicker}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (store: IStore, ownProps: IProps): IStateProps => {
    const { toBinance, toBitfinex, toBitstamp } = compareToExchanges(ownProps.ticker.key);

    const bitfinexTicker = get(store.global.bitfinexTickers, toBitfinex);
    const bitstampTicker = get(store.global.bitstampTickers, toBitstamp);
    const binanceTicker = get(store.global.binanceTickers, toBinance);

    let baseRate = undefined;
    let quoteRate = undefined;

    const rates = store.global.rates;
    try {
        if (rates) {
            const { baseAsset, quoteAsset } = ownProps.ticker;
            baseRate = rates.find(r => r.currency === baseAsset.toLowerCase());
            quoteRate = rates.find(r => r.currency === quoteAsset.toLowerCase());
        }
    } catch (error) {
        console.error(error);
    }

    return {
        baseRate: baseRate,
        quoteRate: quoteRate,
        bitfinexTicker: bitfinexTicker,
        bitstampTicker: bitstampTicker,
        binanceTicker: binanceTicker,
    };
};

export const TickerStats = connect(mapStateToProps)(TickerStatsComponent);
