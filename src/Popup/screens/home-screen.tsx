import React from 'react';
import store from 'Popup/Store/index';
import { connect } from 'react-redux';
import { KunaAssetUnit } from 'kuna-sdk';
import { find, each, groupBy } from 'lodash';
import Numeral from 'numeral';
import { sendTickerScreenView } from 'Popup/Analytics';


import { TickerActions } from 'Popup/Actions/TickerActions';
import { CurrentTickerView } from './home-views/current-ticker-view';


class HomeScreenComponent extends React.PureComponent<any, any> {

    state = {
        selectMode: false,
    };

    onSelectMarket = (tickerKey) => {
        const { tickers = [] } = this.props;
        const currentTicker = find(tickers, { key: tickerKey });
        store.dispatch(TickerActions.setCurrentTickerKey(tickerKey));

        sendTickerScreenView(currentTicker);

        this.setState({ selectMode: false });
    };

    drawTickerList() {
        const { tickers = [], currentTickerKey = null } = this.props;
        const { selectMode = false } = this.state;

        const groupedTickers = groupBy(tickers, 'quoteAsset');
        const tickerList = [];

        const createTicker = (ticker) => {
            const tickerListItemProps = {
                key: ticker.key,
                className: `ticker-list__item ${currentTickerKey === ticker.key ? '-active' : ''}`,
                onClick: () => {
                    this.onSelectMarket(ticker.key);
                },
            };

            tickerList.push(
                <div {...tickerListItemProps}>
                    <label className="ticker-list__item-name">
                        <b>{ticker.baseAsset}</b> / {ticker.quoteAsset}
                    </label>
                    <span className="ticker-list__item-price">
                        {Numeral(ticker.price).format(ticker.format)} {ticker.quoteAsset}
                    </span>
                </div>,
            );
        };

        const createTickerSeparator = (coinKey) => {
            return (
                <div
                    className="ticker-list__separator"
                    key={'separator-' + coinKey}
                >to {coinKey}</div>
            );
        };

        tickerList.push(createTickerSeparator(KunaAssetUnit.UkrainianHryvnia));
        each(groupedTickers[KunaAssetUnit.UkrainianHryvnia], createTicker);

        tickerList.push(createTickerSeparator(KunaAssetUnit.Bitcoin));
        each(groupedTickers[KunaAssetUnit.Bitcoin], createTicker);

        tickerList.push(createTickerSeparator(KunaAssetUnit.Ethereum));
        each(groupedTickers[KunaAssetUnit.Ethereum], createTicker);

        tickerList.push(createTickerSeparator(KunaAssetUnit.StasisEuro));
        each(groupedTickers[KunaAssetUnit.StasisEuro], createTicker);

        tickerList.push(createTickerSeparator(KunaAssetUnit.GolosGold));
        each(groupedTickers[KunaAssetUnit.GolosGold], createTicker);

        return <div className={`ticker-list ${selectMode ? '-active' : ''}`}>{tickerList}</div>;
    }

    render() {
        const { tickers = [], currentTickerKey = null } = this.props;
        const currentTicker = find(tickers, { key: currentTickerKey }) as any;

        const currentMarketLabelProps = {
            className: 'header__current-market',
            onClick: () => {
                this.setState({ selectMode: true });
            },
        };

        return (
            <div>
                {this.drawTickerList()}

                <header className="header">
                    <a href="https://kuna.io/?src=Kuna_Extension" target="_blank" className="header__logo">
                        <img className="header__logo-img" src="/images/kuna-logo.png" />
                    </a>
                    {
                        currentTicker && (
                            <label {...currentMarketLabelProps}>
                                {currentTicker.baseAsset}/{currentTicker.quoteAsset}
                            </label>
                        )
                    }
                </header>

                {currentTicker ? (
                    <CurrentTickerView ticker={currentTicker} />
                ) :(
                    <div className="loading">Wait...</div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { tickers, currentTickerKey } = state.ticker;

    const totalMap = {};
    each(tickers, (ticker) => {
        if (!(ticker.baseAsset in totalMap)) {
            totalMap[ticker.baseAsset] = 0;
        }

        if (!(ticker.quoteAsset in totalMap)) {
            totalMap[ticker.quoteAsset] = 0;
        }

        totalMap[ticker.baseAsset] += parseFloat(ticker.volume_base);
        totalMap[ticker.quoteAsset] += parseFloat(ticker.volume_quote);
    });

    return {
        tickers: tickers,
        currentTickerKey: currentTickerKey,
    };
};

export const HomeScreen = connect(mapStateToProps)(HomeScreenComponent);
