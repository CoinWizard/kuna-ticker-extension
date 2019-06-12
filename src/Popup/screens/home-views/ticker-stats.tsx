import React from 'react';
import Numeral from 'numeral';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { TickerInterface } from 'Core/Interfaces/TickerInterface';
import { IStore } from 'Core/Interfaces/Store';
import { BitfinexTicker } from 'Core/bitfinex';
import { BitstampTicker } from 'Core/bitstamp';
import { BinanceTicker } from 'Core/binance-helper';

import { UsdStatsView } from './extra-view';
import { compareToExchanges } from 'Core/helper';


interface IProps {
    ticker: TickerInterface;
}

interface IStateProps {
    uahRate?: number;
    bitfinexTicker?: BitfinexTicker;
    bitstampTicker?: BitstampTicker;
    binanceTicker?: BinanceTicker;
}

class TickerStatsComponent extends React.Component<IProps & IStateProps> {
    public render() {
        const { ticker, uahRate, bitfinexTicker, bitstampTicker, binanceTicker } = this.props;

        return (
            <div>
                <label className="current-ticker__info">
                    <span className="current-ticker__info-label">Volume {ticker.baseAsset}</span>
                    <span className="current-ticker__info-value">
                        {Numeral(ticker.volume_base).format("0,0.[00]")}
                    </span>
                </label>

                <label className="current-ticker__info">
                    <span className="current-ticker__info-label">Volume {ticker.quoteAsset}</span>
                    <span className="current-ticker__info-value">
                        {Numeral(ticker.volume_quote).format("0,0.[00]")}
                    </span>
                </label>


                <label className="current-ticker__info">
                    <span className="current-ticker__info-label">Low price</span>
                    <span className="current-ticker__info-value">
                        {Numeral(ticker.OHLC.low).format("0,0.[00]")}
                    </span>
                </label>

                <label className="current-ticker__info">
                    <span className="current-ticker__info-label">High price</span>
                    <span className="current-ticker__info-value">
                        {Numeral(ticker.OHLC.high).format("0,0.[00]")}
                    </span>
                </label>

                {ticker.quoteAsset === 'UAH' && uahRate && (
                    <UsdStatsView ticker={ticker}
                                  uahRate={uahRate}
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

    return {
        uahRate: store.global.uahRate,
        bitfinexTicker: bitfinexTicker,
        bitstampTicker: bitstampTicker,
        binanceTicker: binanceTicker,
    };
};

export const TickerStats = connect(mapStateToProps)(TickerStatsComponent);
