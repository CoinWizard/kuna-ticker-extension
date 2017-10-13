import React from 'react';
import Numeral from 'numeral';

import {TickerInterface} from 'Core/Interfaces/TickerInterface';

export interface CurrentTickerViewPropsInterface {
    ticker: TickerInterface;
}

class CurrentTickerView extends React.Component<CurrentTickerViewPropsInterface, {}> {

    render() {

        const {ticker = null} = this.props;

        if (!ticker) {
            return <div className="loading">Wait...</div>;
        }

        return (
            <div className="current-ticker">
                <label className="current-ticker__price">
                    {Numeral(ticker.price).format(ticker.format)}
                    <span className="current-ticker__price-currency">{ticker.quoteCurrency}</span>
                </label>

                <div className="current-ticker__market">
                    <a
                        href={`https://kuna.io/markets/${ticker.key}`}
                        className="current-ticker__market-link"
                        target="_blank"
                    >Market {ticker.baseCurrency}/{ticker.quoteCurrency}</a>
                </div>

                <div className="current-ticker__title">Volume 24h</div>

                <label className="current-ticker__vol">
                    <span className="current-ticker__vol-currency">{ticker.baseCurrency}</span>
                    <span className="current-ticker__vol-value">
                        {Numeral(ticker.volume_base).format("0,0.[00]")}
                    </span>
                </label>

                <label className="current-ticker__vol">
                    <span className="current-ticker__vol-currency">{ticker.quoteCurrency}</span>
                    <span className="current-ticker__vol-value">
                        {Numeral(ticker.volume_quote).format("0,0.[00]")}
                    </span>
                </label>
            </div>
        );
    }
}

export default CurrentTickerView;