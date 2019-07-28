import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import Numeral from 'numeral';
import Binance, { DailyStatsResult } from 'binance-api-node';
import { ArbitrageParams, arbitrageParamsMap, Fees } from './arbitrage-params';
import { TickerInterface } from 'Core/Interfaces';

const TUSD_UAH_PAIR = 'tusduah';

const USD_FORMAT = '0,0.00';
const PERCENT_FORMAT = '+0,0.00%';

const KUNA_FEE = 1 - 0.0025;
const BINANCE_FEE = 1 - 0.001;

const usd = (num: string | number | Numeral): string => {
    return Numeral(num).format(USD_FORMAT);
};

class ArbitrageTabComponent extends React.Component<ArbitrageProps, ArbitrageState> {
    public state: ArbitrageState = {
        value: '10000',
        binancePrice: undefined,
    };

    public async componentDidMount(): Promise<void> {
        const { arbitrageParams } = this.props;
        if (!arbitrageParams) {
            return;
        }

        this.updateStates(arbitrageParams);
    }


    public componentDidUpdate(oldProps: ArbitrageProps): void {
        if (this.props.ticker.key === oldProps.ticker.key) {
            return;
        }

        this.setState({ binancePrice: undefined });

        if (!this.props.arbitrageParams) {
            return;
        }

        this.updateStates(this.props.arbitrageParams);
    }


    public render(): JSX.Element {
        const { tusdPrice, arbitrageParams } = this.props;
        const { binancePrice } = this.state;

        if (!arbitrageParams) {
            return (
                <div style={{ textAlign: 'center', padding: '30px 0', fontWeight: 600 }}>
                    Disabled
                </div>
            );
        }

        if (!tusdPrice || !binancePrice) {
            return <div>Loading</div>;
        }

        let response;

        if (this.value > 1000) {
            const beforeUah = this.value;

            const importUah = this.calculateImport();
            const exportUah = this.calculateExport();

            response = {
                imp: {
                    result: importUah,
                    percent: (importUah - beforeUah) / beforeUah,
                },
                exp: {
                    result: exportUah,
                    percent: (exportUah - beforeUah) / beforeUah,
                },
            };
        }

        return (
            <div className="arbitrage-box">
                <input className="calculator-side-input" value={this.state.value} onChange={this.onChangeInput} />

                {response && (
                    <div className="arbitrage-box__response">
                        <div className="arbi-strategy">
                            <b>Export: </b>
                            <span>{Numeral(response.exp.percent).format(PERCENT_FORMAT)}</span>
                            <span> : </span>
                            <span>{usd(response.exp.result)}</span>
                        </div>
                        <div className="arbi-strategy">
                            <b>Import: </b>
                            <span>{Numeral(response.imp.percent).format(PERCENT_FORMAT)}</span>
                            <span> : </span>
                            <span>{usd(response.imp.result)}</span>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    protected get value(): number {
        return parseFloat(this.state.value.replace(',', '.')) || 0;
    }

    protected onChangeInput = (event) => {
        this.setState({ value: event.target.value });
    };

    /**
     * Export strategy
     */
    protected calculateExport(): number {
        const { tusdPrice, arbitrageParams, ticker } = this.props;
        const { binancePrice } = this.state;

        // UAH -> ETH (Kuna)
        let result = (this.value / ticker.depth.ask) * KUNA_FEE;

        // ETH transfer Kuna -> Binance
        result = result - arbitrageParams.kunaFee;

        // ETH -> TUSD (Binance)
        result = (result * (+binancePrice.bidPrice)) * BINANCE_FEE;

        // TUSD transfer Binance -> Kuna
        result = result - Fees.BINANCE_USD_W;

        // TUSD -> UAH (Kuna)
        result = (result * (+tusdPrice.bid)) * KUNA_FEE;

        return result;
    }

    /**
     * Import strategy
     */
    protected calculateImport(): number {
        const { tusdPrice, arbitrageParams, ticker } = this.props;
        const { binancePrice } = this.state;

        // UAH -> TUSD (Kuna)
        let result = (this.value / (+tusdPrice.ask)) * KUNA_FEE;

        // TUSD transfer Kuna -> Binance
        result = result - Fees.KUNA_USD_W;

        // TUSD -> ETH (Binance)
        result = (result / (+binancePrice.askPrice)) * BINANCE_FEE;

        // ETH transfer Binance -> Kuna
        result = result - arbitrageParams.binanceFee;

        // ETH -> UAH (Kuna)
        result = (result * (+ticker.depth.bid)) * KUNA_FEE;

        return result;
    }


    protected async updateStates(arbitrageParams): Promise<void> {
        const client = Binance();
        const response = await client.dailyStats({
            symbol: arbitrageParams.binanceSymbol,
        }) as DailyStatsResult;

        this.setState({ binancePrice: response });
    }
}

type ConnectedProps = {
    tusdPrice?: {
        bid: string;
        ask: string;
    };
    arbitrageParams?: ArbitrageParams;
};

type OuterProps = {
    ticker: TickerInterface;
};
type ArbitrageProps = ConnectedProps & OuterProps;

type ArbitrageState = {
    value: string;
    binancePrice?: DailyStatsResult;
};


const mapStateToProps = (state, ownProps: OuterProps): ConnectedProps => {
    const { tickers } = state.ticker;

    const usdTicker = tickers[TUSD_UAH_PAIR];

    if (!usdTicker) {
        return {};
    }

    return {
        tusdPrice: {
            bid: usdTicker.depth.bid,
            ask: usdTicker.depth.ask,
        },
        arbitrageParams: arbitrageParamsMap[ownProps.ticker.key] || undefined,
    };
};

export const ArbitrageTab = compose<ArbitrageProps, OuterProps>(
    connect(mapStateToProps),
)(ArbitrageTabComponent);
