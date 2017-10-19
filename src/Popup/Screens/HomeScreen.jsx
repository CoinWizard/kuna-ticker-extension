import React from 'react';
import store from 'Popup/Store/index';
import {connect} from 'react-redux';
import * as _ from 'lodash';
import Numeral from 'numeral';

import ExtensionPlatform from 'Core/Extension';
import {Events} from 'Core/EventProtocol/Events';

import {TickerActions} from 'Popup/Actions/TickerActions';
import CurrentTickerView from 'Popup/Screens/HomeViews/CurrentTickerView';

const currentExtension = ExtensionPlatform.getExtension().extension;


class HomeScreen extends React.Component {

    state = {
        selectMode: false
    };

    componentWillMount() {
        currentExtension.sendMessage({event: Events.FETCH_CURRENT_TICKER}, (response) => {
            store.dispatch(TickerActions.setCurrentTickerKey(response.currentTickerKey));
        });

        currentExtension.sendMessage({event: Events.GET_TICKERS}, (response) => {
            store.dispatch(TickerActions.fetchTickers(response.tickers));
        });
    }

    onSelectMarket = (tickerKey) => {
        const request = {
            event: Events.SET_CURRENT_TICKER,
            tickerKey: tickerKey
        };

        currentExtension.sendMessage(request, (response) => {
            store.dispatch(TickerActions.setCurrentTickerKey(tickerKey));
        });

        this.setState({selectMode: false});
    };


    getDropDownOptions() {
        const {tickers = []} = this.props;

        return _.map(tickers, (trc) => {
            return {
                value: trc.key,
                label: `${trc.baseCurrency}/${trc.quoteCurrency}`
            };
        });
    }

    drawTickerList() {
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
                    )
                })}
            </div>
        )
    }

    render() {
        const {tickers = [], currentTickerKey = null} = this.props;

        const currentTicker = _.find(tickers, {key: currentTickerKey});

        const currentTickerLabelProps = {
            className: "current-ticker-label",
            onClick: () => {
                this.setState({selectMode: true});
            }
        };

        return (
            <div>
                <header className="header">
                    <a href="https://kuna.io/" target="_blank" className="header__logo">
                        <img className="header__logo-img" src="/images/kuna-logo.png"/>
                    </a>
                </header>

                {this.drawTickerList()}
                {
                    currentTicker && (
                        <div {...currentTickerLabelProps}>
                            <label className="current-ticker-label__item">
                                {currentTicker.baseCurrency} / {currentTicker.quoteCurrency}
                            </label>
                        </div>
                    )
                }
                <CurrentTickerView ticker={currentTicker}/>
            </div>
        );
    }
}


export default connect(
    (state) => {
        return {
            tickers: state.ticker.tickers,
            currentTickerKey: state.ticker.currentTickerKey
        };
    }
)(HomeScreen)