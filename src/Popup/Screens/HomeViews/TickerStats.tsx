import React from 'react';
import {connect} from 'react-redux';
import Numeral from 'numeral';
import {TickerInterface} from 'Core/Interfaces/TickerInterface';
import {IStore} from "Core/Interfaces/Store";
import {BitfinexTicker} from "Core/bitfinex";
import {UsdStatsView} from "Popup/Screens/HomeViews/extra-view";

interface IProps {
    ticker: TickerInterface;
}

interface IStateProps {
    uahRate?: number;
    bitfinexTicker?: BitfinexTicker;
}

class TickerStatsComponent extends React.Component<IProps & IStateProps> {
    public render() {
        const {ticker, uahRate = null, bitfinexTicker = null} = this.props;

        return (
            <div>
                <label className="current-ticker__info">
                    <span className="current-ticker__info-label">Volume {ticker.baseCurrency}</span>
                    <span className="current-ticker__info-value">
                        {Numeral(ticker.volume_base).format("0,0.[00]")}
                    </span>
                </label>

                <label className="current-ticker__info">
                    <span className="current-ticker__info-label">Volume {ticker.quoteCurrency}</span>
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

                {ticker.quoteCurrency === 'UAH' && uahRate && (
                    <UsdStatsView ticker={ticker} uahRate={uahRate} bitfinexTicker={bitfinexTicker}/>
                )}
            </div>
        )
    }
}

const mapStateToProps = (store: IStore, ownProps: IProps): IStateProps => {

    let bitfinexTicker = null;
    if (ownProps.ticker.compareTo) {
        bitfinexTicker = store.global.bitfinexTickers[ownProps.ticker.compareTo];
    }

    return {
        uahRate: store.global.uahRate,
        bitfinexTicker: bitfinexTicker
    }
};

export const TickerStats = connect(mapStateToProps)(TickerStatsComponent);