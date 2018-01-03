import React from 'react';
import Numeral from 'numeral';
import {TickerInterface} from 'Core/Interfaces/TickerInterface';
import {getCurrencyByKey, CurrencyInterface} from 'Core/Kuna/Currencies';

export interface PropsInterface {
    ticker: TickerInterface;
}

export interface StateInterface {
    activeInput?: string;
    value: string;
}

const InputType = {
    Base: 'base',
    Quote: 'quote'
};

const fee: number = 0.0025;

export default class TickerStats extends React.Component<PropsInterface, StateInterface> {

    constructor(props, context) {
        super(props, context);

        this.state = {
            activeInput: null,
            value: ''
        };
    }

    onChangeInput(activateInput: string) {
        return (event) => {
            this.setState({
                value: event.target.value,
                activeInput: activateInput
            });
        }
    }

    drawFeeComponent(calculatedValue: number, coin: CurrencyInterface): void | any {

        if (calculatedValue <= 0) {
            return;
        }

        return (<div className="calculator-fee">
            <span>Fee:</span> <b>{Numeral(calculatedValue * fee).format(coin.format)} {coin.key}</b>
        </div>);
    }

    render() {
        const {ticker} = this.props;

        const {value = '', activeInput} = this.state;

        let numberValue = parseFloat(value.replace(',', '.')) || 0;
        let calculatedValue = 0;

        switch (activeInput) {
            case InputType.Quote:
                calculatedValue = numberValue / ticker.price;
                break;

            case InputType.Base:
                calculatedValue = numberValue * ticker.price;
                break;
        }

        let baseCoin: CurrencyInterface = getCurrencyByKey(ticker.baseCurrency),
            quoteCoin: CurrencyInterface = getCurrencyByKey(ticker.quoteCurrency);

        return (
            <div className="calculator">

                <div className="calculator-form">
                    <label className="calculator-side">
                    <span className="calculator-side-value">
                        {
                            activeInput === InputType.Quote && calculatedValue > 0
                                ? Numeral(calculatedValue).format(baseCoin.format)
                                : null
                        }
                    </span>
                        <input
                            className="calculator-side-input"
                            placeholder={!value ? "0.00" : null}
                            value={activeInput === InputType.Base ? value : ''}
                            onChange={this.onChangeInput(InputType.Base)}
                        />
                        <span className="calculator-side-coin-key">{baseCoin.key}</span>
                    </label>

                    <label className="calculator-side">
                    <span className="calculator-side-value">
                        {
                            activeInput === InputType.Base && calculatedValue > 0
                                ? Numeral(calculatedValue).format(quoteCoin.format)
                                : null
                        }
                    </span>
                        <input
                            className="calculator-side-input"
                            placeholder={!value ? "0.00" : null}
                            value={activeInput === InputType.Quote ? value : ''}
                            onChange={this.onChangeInput(InputType.Quote)}
                        />
                        <span className="calculator-side-coin-key">{quoteCoin.key}</span>
                    </label>
                </div>
                {this.drawFeeComponent(
                    calculatedValue,
                    activeInput === InputType.Quote ? baseCoin : quoteCoin
                )}
            </div>
        )
    }
}
