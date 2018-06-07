import React from 'react';
import {TickerInterface} from 'Core/Interfaces/TickerInterface';
import {BitfinexTicker} from "Core/bitfinex";
import Numeral from "numeral";

interface IUsdPriceProps {
    uahRate: number;
    ticker: TickerInterface;
    bitfinexTicker?: BitfinexTicker;
}

export class UsdStatsView extends React.Component<IUsdPriceProps> {

    protected renderBitfinex(usdPrice: number) {
        const {bitfinexTicker = null} = this.props;

        if (!bitfinexTicker) {
            return null;
        }

        const arbitragePercent = Numeral(usdPrice).subtract(bitfinexTicker.last_price).divide(usdPrice);

        return (
            <React.Fragment>
                <label className="current-ticker__info">
                    <span className="current-ticker__info-label">% Arbitrage</span>
                    <span className="current-ticker__info-value">
                        {arbitragePercent.format('0,0.[00]%')}
                    </span>
                </label>

                <label className="current-ticker__info">
                    <span className="current-ticker__info-label">Bitfinex Price</span>
                    <span className="current-ticker__info-value">
                        ${Numeral(bitfinexTicker.last_price).format("0,0.[00]")}
                    </span>
                </label>
            </React.Fragment>
        );
    }

    public render(): JSX.Element {
        const {ticker, uahRate} = this.props;

        const usdPrice = ticker.price / uahRate;

        return (
            <div>
                <label className="current-ticker__info">
                    <span className="current-ticker__info-label">UAH/USD</span>
                    <span className="current-ticker__info-value">
                        {Numeral(uahRate).format("0,0.[00]")}
                    </span>
                </label>

                <label className="current-ticker__info">
                    <span className="current-ticker__info-label">USD Price</span>
                    <span className="current-ticker__info-value">
                        ${Numeral(usdPrice).format("0,0.[00]")}
                    </span>
                </label>

                {this.renderBitfinex(usdPrice)}
            </div>
        )
    }
}