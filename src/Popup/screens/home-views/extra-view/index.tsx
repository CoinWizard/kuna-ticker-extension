import React from 'react';
import { map } from 'lodash';
import cn from 'classnames';
import Numeral from 'numeral';
import { TickerInterface } from 'Core/Interfaces';
import { BitfinexTicker } from 'Core/bitfinex';
import { BitstampTicker } from 'Core/bitstamp';
import { BinanceTicker } from 'Core/binance-helper';


interface IUsdPriceProps {
    uahRate: number;
    ticker: TickerInterface;
    bitfinexTicker?: BitfinexTicker;
    bitstampTicker?: BitstampTicker;
    binanceTicker?: BinanceTicker;
}


enum ExchangeMode {
    Bitstamp = 'bitstamp',
    Bitfinex = 'bitfinex',
    Binance = 'binance'
}


type UsdStatsViewState = {
    mode?: ExchangeMode
};


type CompareTickerParams = {
    arbitragePercent: Numeral;
    lastPrice: Numeral;
};


export class UsdStatsView extends React.Component<IUsdPriceProps, UsdStatsViewState> {

    public constructor(props: IUsdPriceProps) {
        super(props);

        this.state = {
            mode: this.__checkAvailableMode(props),
        };
    }

    public componentWillUpdate(nextProps: IUsdPriceProps) {
        if (this.props.ticker.key !== nextProps.ticker.key) {
            this.setState({
                mode: this.__checkAvailableMode(nextProps),
            });
        }
    }


    public render(): JSX.Element {
        const { ticker, uahRate } = this.props;

        const usdPrice = ticker.price / uahRate;

        return (
            <div>
                <label className="current-ticker__info">
                    <span className="current-ticker__info-label">UAH/USD</span>
                    <span className="current-ticker__info-value">
                        {Numeral(uahRate).format('0,0.[00]')}
                    </span>
                </label>

                <label className="current-ticker__info">
                    <span className="current-ticker__info-label">USD Price</span>
                    <span className="current-ticker__info-value">
                        ${Numeral(usdPrice).format('0,0.[00]')}
                    </span>
                </label>

                {this.__renderCompares(usdPrice)}
            </div>
        );
    }

    protected __checkAvailableMode = (props: IUsdPriceProps): ExchangeMode | undefined => {
        const { bitstampTicker, bitfinexTicker, binanceTicker } = props;

        if (bitstampTicker) {
            return ExchangeMode.Bitstamp;
        }

        if (bitfinexTicker) {
            return ExchangeMode.Bitfinex;
        }

        if (binanceTicker) {
            return ExchangeMode.Binance;
        }
    };


    protected __renderCompares(usdPrice: number) {

        const { mode } = this.state;

        if (!mode) {
            return undefined;
        }

        const params = this.__getCompareTickersParams(usdPrice);

        return (
            <div>
                <div className="compare-mode__container">
                    {map(ExchangeMode, (value: ExchangeMode, key: string) => {
                        const active = mode === value;

                        return (
                            <button key={value}
                                    onClick={this.__onClickMode(value)}
                                    className={cn('compare-mode__btn', { '-active': active })}
                            >{key}</button>
                        );
                    })}
                </div>

                {this.__renderCompareToValues(params, mode)}
            </div>
        );
    }


    protected __renderCompareToValues = (params: CompareTickerParams, mode: ExchangeMode) => {
        if (!params) {
            return (
                <label className="current-ticker__info" style={{ width: '100%', flex: 1 }}>
                    <span className="current-ticker__info-value" style={{ width: '100%' }}>
                        No data for {mode}
                    </span>
                </label>
            );
        }

        const arbitrageClass = cn('current-ticker__info-value', {
            '-red': params.arbitragePercent.value() > 0,
            '-green': params.arbitragePercent.value() < 0,
        });

        return (
            <div>
                <label className="current-ticker__info">
                    <span className="current-ticker__info-label">% Arbitrage</span>
                    <span className={arbitrageClass}>
                        {params.arbitragePercent.format('+0,0.[00]%')}
                    </span>
                </label>

                <label className="current-ticker__info">
                    <span className="current-ticker__info-label">Price</span>
                    <span className="current-ticker__info-value">
                        ${params.lastPrice.format('0,0.[00]')}
                    </span>
                </label>
            </div>
        );
    };

    protected __getCompareTickersParams = (usdPrice: number): CompareTickerParams | undefined => {
        const { bitfinexTicker = undefined, bitstampTicker = undefined, binanceTicker = undefined } = this.props;
        const { mode } = this.state;

        switch (mode) {
            case ExchangeMode.Bitfinex: {
                if (!bitfinexTicker) {
                    return;
                }

                const arbitragePercent: Numeral
                    = Numeral(usdPrice)
                    .subtract(bitfinexTicker.last_price)
                    .divide(bitfinexTicker.last_price);

                return {
                    arbitragePercent: arbitragePercent,
                    lastPrice: Numeral(bitfinexTicker.last_price),
                };
            }

            case ExchangeMode.Bitstamp: {
                if (!bitstampTicker) {
                    return;
                }

                const arbitragePercent: Numeral
                    = Numeral(usdPrice)
                    .subtract(bitstampTicker.last)
                    .divide(bitstampTicker.last);

                return {
                    arbitragePercent: arbitragePercent,
                    lastPrice: Numeral(bitstampTicker.last),
                };
            }

            case ExchangeMode.Binance: {
                if (!binanceTicker) {
                    return;
                }

                const arbitragePercent: Numeral
                    = Numeral(usdPrice)
                    .subtract(binanceTicker.last_price)
                    .divide(binanceTicker.last_price);

                return {
                    arbitragePercent: arbitragePercent,
                    lastPrice: Numeral(binanceTicker.last_price),
                };
            }
        }
    };

    protected __onClickMode = (mode: ExchangeMode) => {
        return () => {
            this.setState({ mode: mode });
        };
    };
}
