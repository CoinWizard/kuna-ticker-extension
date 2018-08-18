import React from 'react';
import Numeral from 'numeral';
import {Router, Switch, Route, NavLink} from 'react-router-dom';
import {createMemoryHistory, MemoryHistory} from 'history';

import {sendTickerScreenView} from 'Popup/Analytics';
import {TickerInterface} from 'Core/Interfaces/TickerInterface';

import {TickerStats} from './TickerStats';
import {TickerCalculator} from './TickerCalculator';

interface IViewProps {
    ticker: TickerInterface;
}

export class CurrentTickerView extends React.Component<IViewProps> {
    protected history: MemoryHistory = createMemoryHistory();

    public componentDidMount() {
        const {ticker} = this.props;
        sendTickerScreenView(ticker);
    }

    public render(): JSX.Element {
        const {ticker} = this.props;

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
                            {Numeral(ticker.price).format(ticker.format)}
                                <span className="current-ticker__price-currency">{ticker.quoteAsset}</span>
                        </span>
                        </label>

                        <div className="current-ticker__market">
                            <a href={`https://kuna.io/markets/${ticker.key}?src=Kuna_Extension`}
                               className="current-ticker__market-link"
                               target="_blank"
                            >Market {ticker.baseAsset}/{ticker.quoteAsset}</a>
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
                        </div>
                    </div>

                    <div className="current-ticker__info-container">
                        <Switch>
                            <Route path="/" exact render={() => <TickerStats ticker={ticker}/>}/>
                            <Route path="/calculator" exact render={() => <TickerCalculator ticker={ticker}/>}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}
