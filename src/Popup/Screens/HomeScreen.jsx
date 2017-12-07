import React from 'react';
import store from 'Popup/Store/index';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import Numeral from 'numeral';

import ExtensionPlatform from 'Core/Extension';
import { Events } from 'Core/EventProtocol/Events';
import {sendTickerScreenView} from 'Popup/Analytics';

import { TickerActions } from 'Popup/Actions/TickerActions';
import CurrentTickerView from 'Popup/Screens/HomeViews/CurrentTickerView';

const currentExtension = ExtensionPlatform.getExtension().extension;

const mapStateToProps = (state) => {
    return {
        tickers: state.ticker.tickers,
        currentTickerKey: state.ticker.currentTickerKey
    };
};

@connect(mapStateToProps)
export default class HomeScreen extends React.Component {

    state = {
        selectMode: false
    };

    componentWillMount () {
        currentExtension.sendMessage({event: Events.FETCH_CURRENT_TICKER}, (response) => {
            store.dispatch(TickerActions.setCurrentTickerKey(response.currentTickerKey));
        });

        currentExtension.sendMessage({event: Events.GET_TICKERS}, (response) => {
            store.dispatch(TickerActions.fetchTickers(response.tickers));
        });
    }

    onSelectMarket = (tickerKey) => {
        const {tickers = []} = this.props;
        const request = {
            event: Events.SET_CURRENT_TICKER,
            tickerKey: tickerKey
        };

        const currentTicker = _.find(tickers, {key: tickerKey});

        currentExtension.sendMessage(request, (response) => {
            store.dispatch(TickerActions.setCurrentTickerKey(tickerKey));
        });

        sendTickerScreenView(currentTicker);

        this.setState({selectMode: false});
    };

    drawTickerList () {
        const {tickers = [], currentTickerKey = null} = this.props;
        const {selectMode = false} = this.state;

        return (
            <div className={`ticker-list ${selectMode ? '-active' : ''}`}>
                {_.map(tickers, (ticker) => {
                    const tickerListItemProps = {
                        key: ticker.key,
                        className: `ticker-list__item ${currentTickerKey === ticker.key ? '-active' : ''}`,
                        onClick: () => {
                            this.onSelectMarket(ticker.key);
                        }
                    };

                    return (
                        <div {...tickerListItemProps}>
                            <label className="ticker-list__item-name">
                                {ticker.baseCurrency} / {ticker.quoteCurrency}
                            </label>
                            <span className="ticker-list__item-price">
                                {Numeral(ticker.price).format(ticker.format)} {ticker.quoteCurrency}
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    }

    render () {
        const {tickers = [], currentTickerKey = null} = this.props;

        const currentTicker = _.find(tickers, {key: currentTickerKey});

        const currentMarketLabelProps = {
            className: 'header__current-market',
            onClick: () => {
                this.setState({selectMode: true});
            }
        };

        return (
            <div>
                {this.drawTickerList()}

                <header className="header">
                    <a href="https://kuna.io/?ref=coinwizard-kuna-ticker" target="_blank" className="header__logo">
                        <img className="header__logo-img" src="/images/kuna-logo.png"/>
                    </a>
                    {
                        currentTicker && (
                            <label {...currentMarketLabelProps}>
                                {currentTicker.baseCurrency}/{currentTicker.quoteCurrency}
                            </label>
                        )
                    }
                </header>

                {currentTicker ? <CurrentTickerView ticker={currentTicker}/> : <div className="loading">Wait...</div>}
            </div>
        )
    }
}