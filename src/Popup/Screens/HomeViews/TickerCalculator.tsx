import React from 'react';
import Numeral from 'numeral';
import classNames from 'classnames';
import {TickerInterface} from 'Core/Interfaces/TickerInterface';
import {getCurrencyByKey, CurrencyInterface} from 'Core/Kuna/Currencies';

export interface CalculatorViewPropsInterface {
    ticker: TickerInterface;
}

export interface CalculatorViewStateInterface {
    revert: boolean;
    sellValue: string | null;
}

const fee: number = 0.0025;

export default class TickerStats extends React.Component<CalculatorViewPropsInterface, CalculatorViewStateInterface> {

    constructor(props) {
        super(props)

        this.state = {
            revert: false,
            sellValue: null
        }
    }

    onInputChange(event) {
        this.setState({sellValue: event.currentTarget.value});
    }

    render() {
        const {ticker} = this.props;
        const {revert = false, sellValue = null} = this.state;

        let value = parseFloat(sellValue.replace(',', '.'));

        let buyValue: number,
            baseCoin: CurrencyInterface, 
            quoteCoin: CurrencyInterface;

        if (revert) {
            baseCoin = getCurrencyByKey(ticker.quoteCurrency);
            quoteCoin = getCurrencyByKey(ticker.baseCurrency);
            buyValue = value / ticker.price
        } else {
            baseCoin = getCurrencyByKey(ticker.baseCurrency);
            quoteCoin = getCurrencyByKey(ticker.quoteCurrency);
            buyValue = value * ticker.price
        }

        let feeValue = buyValue * fee;

        const inputProps = {
            value: this.state.sellValue,
            onChange: this.onInputChange.bind(this)
        };

        return (
            <div className="calculator">
                <input {...inputProps} />
                <br/>
                <label>{Numeral(buyValue - feeValue).format(quoteCoin.format)} {quoteCoin.key}</label>
                <br/>
                <label>Fee: {Numeral(feeValue).format(quoteCoin.format)} {quoteCoin.key}</label>
            </div>
        )
    }
}
