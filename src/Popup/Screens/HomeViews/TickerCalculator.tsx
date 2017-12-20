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
            sellValue: ''
        }
    }

    onInputChange(event) {
        this.setState({sellValue: event.currentTarget.value});
    }

    onRevert(event) {
        this.setState({revert: !this.state.revert});
    }

    render() {
        const {ticker} = this.props;
        const {revert = false, sellValue = ''} = this.state;

        let value = parseFloat(sellValue.replace(',', '.'));

        let buyValue: number,
            baseCoin: CurrencyInterface, 
            quoteCoin: CurrencyInterface;

        if (revert) {
            baseCoin = getCurrencyByKey(ticker.quoteCurrency);
            quoteCoin = getCurrencyByKey(ticker.baseCurrency);
            buyValue = value / ticker.price;
        } else {
            baseCoin = getCurrencyByKey(ticker.baseCurrency);
            quoteCoin = getCurrencyByKey(ticker.quoteCurrency);
            buyValue = value * ticker.price;
        }

        if (!buyValue) {
            buyValue = 0;
        }

        let feeValue = buyValue * fee;

        const inputProps = {
            className: 'calculator-sell__input',
            placeholder: `Amount of ${baseCoin.key}`,
            value: this.state.sellValue,
            onChange: this.onInputChange.bind(this)
        };

        return (
            <div className="calculator">
                <div className="calculator-sell">
                    <input {...inputProps} />
                    <label className="calculator-sell__label">{baseCoin.key}</label>
                </div>
                <div className="calculator-buy">
                    <label className="calculator-buy__amount">
                        {Numeral(buyValue - feeValue).format(quoteCoin.format)} <span>{quoteCoin.key}</span>
                    </label>
                    <label className="calculator-buy__fee">
                        Fee: <b>{Numeral(feeValue).format(quoteCoin.format)}</b> <span>{quoteCoin.key}</span>
                    </label>
                </div>

                <button className="calculator-revert" onClick={this.onRevert.bind(this)}>Revers</button>
            </div>
        )
    }
}
