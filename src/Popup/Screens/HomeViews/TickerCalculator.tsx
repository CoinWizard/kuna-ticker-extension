import React from 'react';
import Numeral from 'numeral';
import classNames from 'classnames';
import {TickerInterface} from 'Core/Interfaces/TickerInterface';

export interface CalculatorViewPropsInterface {
    ticker: TickerInterface;
}

export default class TickerStats extends React.Component<CalculatorViewPropsInterface, {}> {
    render() {
        const {ticker} = this.props;

        return (
            <div className="s">
                Calculate datas!
            </div>
        )
    }
}
