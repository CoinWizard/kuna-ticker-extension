import React from 'react';
import numeral from 'numeral';
import cn from 'classnames';
import localStorage from 'local-storage';
import { Router, Switch, Route, NavLink } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';

import { sendTickerScreenView } from 'Popup/Analytics';
import { TickerInterface } from 'Core/Interfaces';

import { TickerCalculator } from './ticker-calculator';
import { TickerStats } from './ticker-stats';
import { ArbitrageTab } from './arbitrage-tab';

const ARBITRAGE_ENABLED = Boolean(localStorage.get('little_engine_that_could'));

interface IViewProps {
    ticker: TickerInterface;
}

export class CurrentTickerView extends React.PureComponent<IViewProps> {
    protected history: MemoryHistory = createMemoryHistory();

    public componentDidMount(): void {
        const { ticker } = this.props;

        sendTickerScreenView(ticker);
    }

    public render(): JSX.Element {
        const { ticker } = this.props;

        return (
            <Router history={this.history}>
                <div className="current-ticker">
                    <div className="current-ticker__bugged">
                        <label className="current-ticker__price">
                            <span className="current-ticker__price-base">
                                1<span className="current-ticker__price-currency">{ticker.baseAsset}</span>
                            </span>
                            <span className="current-ticker__price-separator">=</span>
                            <span className="current-ticker__price-quote">
                                {numeral(ticker.price).format(ticker.format)}
                                <span className="current-ticker__price-currency">{ticker.quoteAsset}</span>
                            </span>
                        </label>

                        {(typeof ticker.dailyChangePercent === 'number') ? (
                            <div className={cn('daily-change', {
                                '-up': ticker.dailyChangePercent > 0,
                                '-down': ticker.dailyChangePercent <= 0,
                            })}>
                                {numeral(ticker.dailyChangePercent).format('+0,0.00')}%
                            </div>
                        ) : undefined}

                        <div className="current-ticker__market">
                            <a href={`https://kuna.io/markets/${ticker.key}?ref=Kuna_Extension`}
                               className="current-ticker__market-link"
                               target="_blank"
                            >To trading {ticker.baseAsset}/{ticker.quoteAsset}</a>
                        </div>

                        <div className="current-ticker-tabs">
                            <NavLink to="/" exact
                                     activeClassName="-active"
                                     className="current-ticker-tabs__item"
                            >24H Stats</NavLink>

                            <NavLink to="/calculator"
                                     activeClassName="-active"
                                     className="current-ticker-tabs__item"
                            >Calculator</NavLink>

                            {ARBITRAGE_ENABLED && (
                                <NavLink to="/arbitrage"
                                         activeClassName="-active"
                                         className="current-ticker-tabs__item"
                                >Arbitrage</NavLink>
                            )}
                        </div>
                    </div>

                    <div className="current-ticker__info-container">
                        <Switch>
                            <Route path="/" exact render={() => <TickerStats ticker={ticker} />} />
                            <Route path="/calculator" exact render={() => <TickerCalculator ticker={ticker} />} />
                            {ARBITRAGE_ENABLED && (
                                <Route path="/arbitrage" exact render={() => <ArbitrageTab ticker={ticker} />} />
                            )}
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}
