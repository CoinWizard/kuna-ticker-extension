import React from 'react';
import Numeral from 'numeral';
import { connect } from 'react-redux';
import { TickerInterface } from 'Core/Interfaces/TickerInterface';
import { IStore } from 'Core/Interfaces/Store';
import { BitfinexTicker } from 'Core/bitfinex';
import { BitstampTicker } from 'Core/bitstamp';


import { UsdStatsView } from './extra-view';


interface IProps {
    ticker: TickerInterface;
}

interface IStateProps {
    uahRate?: number;
    bitfinexTicker?: BitfinexTicker;
    bitstampTicker?: BitstampTicker;
}

class TickerStatsComponent extends React.Component<IProps & IStateProps> {
    public render() {
        const { ticker, uahRate = null, bitfinexTicker = null, bitstampTicker = null } = this.props;

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
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (store: IStore, ownProps: IProps): IStateProps => {

    let bitfinexTicker = null;
    let bitstampTicker = null;
    if (ownProps.ticker.compareTo) {
        bitfinexTicker = store.global.bitfinexTickers[ownProps.ticker.compareTo] || undefined;
        bitstampTicker = store.global.bitstampTickers[ownProps.ticker.compareTo] || undefined;
    }

    return {
        uahRate: store.global.uahRate,
        bitfinexTicker: bitfinexTicker,
        bitstampTicker: bitstampTicker,
    };
};

export const TickerStats = connect(mapStateToProps)(TickerStatsComponent);