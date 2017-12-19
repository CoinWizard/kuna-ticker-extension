import React from 'react';
import Numeral from 'numeral';
import classNames from 'classnames';
import {TickerInterface} from 'Core/Interfaces/TickerInterface';

export interface StatsViewPropsInterface {
    ticker: TickerInterface;
}

export default class TickerStats extends React.Component<StatsViewPropsInterface, {}> {
    render() {
        const {ticker} = this.props;

        return (
            <div className="">
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
            </div>
        )
    }
}
