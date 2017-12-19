import React from 'react';
import Numeral from 'numeral';
import {find} from 'lodash'; 
import classNames from 'classnames';

import ViewTabs from './ViewTabsEnum';
import {sendTickerScreenView} from 'Popup/Analytics';
import {TickerInterface} from 'Core/Interfaces/TickerInterface';

import TickerStats from './TickerStats';
import TickerCalculator from './TickerCalculator';

export interface CurrentTickerViewPropsInterface {
    ticker: TickerInterface;
}

export interface CurrentTickerViewStateInterface {
    activeTab: ViewTabs;
}

const tabsList = [
    {
        key: ViewTabs.Stats,
        title: '24H Stats',
        Component: TickerStats
    },
    {
        key: ViewTabs.Calc,
        title: 'Calculator',
        Component: TickerCalculator
    }
];

export default class CurrentTickerView extends React.Component<CurrentTickerViewPropsInterface, CurrentTickerViewStateInterface> {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: ViewTabs.Stats
        };
    }

    componentDidMount () {
        const {ticker} = this.props;
        sendTickerScreenView(ticker);
    }

    generateSetTabAction(tab: ViewTabs) {
        return () => {
            this.setState({activeTab: tab});
        }
    }

    render () {
        const {ticker} = this.props;
        const {activeTab} = this.state;

        const CurrentTickerView = find(tabsList, (item) => item.key === activeTab);

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
                        <a  href={`https://kuna.io/markets/${ticker.key}?ref=coinwizard-kuna-ticker`}
                            className="current-ticker__market-link"
                            target="_blank"
                        >Market {ticker.baseCurrency}/{ticker.quoteCurrency}</a>
                    </div>

                    <div className="current-ticker-tabs">
                        {tabsList.map((tabItem) => {
                            const props = {
                                key: tabItem.key,
                                className: classNames("current-ticker-tabs__item", {"-active": activeTab === tabItem.key}),
                                onClick: this.generateSetTabAction(tabItem.key)
                            };

                            return <div {...props}>{tabItem.title}</div>
                        })}
                    </div>
                </div>

                <div className="current-ticker__info-container">
                    {CurrentTickerView ? <CurrentTickerView.Component ticker={ticker}/> : null }
                </div>
            </div>
        );
    }
}
