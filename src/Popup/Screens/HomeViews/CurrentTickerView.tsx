import React from 'react';
import Numeral from 'numeral';

import {sendScreenView} from 'Popup/Analytics';
import {TickerInterface} from 'Core/Interfaces/TickerInterface';

export interface CurrentTickerViewPropsInterface {
    ticker: TickerInterface;
}

export default class CurrentTickerView extends React.Component<CurrentTickerViewPropsInterface, {}> {

    componentDidMount () {
        const {ticker} = this.props;
        sendScreenView();
    }

    render () {
        const {ticker} = this.props;

        return (
            <div className="current-ticker">
                <div className="current-ticker__bugged">
                    <label className="current-ticker__price">
                        <span className="current-ticker__price-base">
                        1<span className="current-ticker__price-currency">{ticker.baseCurrency}</span>
                        </span>
                        <span className="current-ticker__price-separator">=</span>
                        <span className="current-ticker__price-quote">
                            {Numeral(ticker.price).format(ticker.format)}
                            <span className="current-ticker__price-currency">{ticker.quoteCurrency}</span>
                        </span>
                    </label>

                    <div className="current-ticker__market">
                        <a
                            href={`https://kuna.io/markets/${ticker.key}?ref=coinwizard-kuna-ticker`}
                            className="current-ticker__market-link"
                            target="_blank"
                        >Market {ticker.baseCurrency}/{ticker.quoteCurrency}</a>
                    </div>
                </div>

                <div className="current-ticker__info-container">
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
            </div>
        );
    }
}
