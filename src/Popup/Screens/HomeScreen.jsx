import React from 'react';
import store from 'Popup/Store/index';
import {connect} from 'react-redux';
import * as _ from 'lodash';
import Numeral from 'numeral';
import classNames from 'classNames';

import ExtensionPlatform from 'Library/Extension';
import {Events} from 'Library/EventProtocol/Events';
const ext = new ExtensionPlatform;

import {fetchTickers, setCurrentTickerKey} from 'Popup/Actions/TickerActions';
import CurrentTickerView from 'Popup/Screens/HomeViews/CurrentTickerView';

const currentExtension = ext.getExtension().extension;

class HomeScreen extends React.Component {

    componentWillMount() {
        currentExtension.sendMessage({event: Events.FETCH_CURRENT_TICKER}, (response) => {
            store.dispatch(setCurrentTickerKey(response.currentTickerKey));
        });

        currentExtension.sendMessage({event: Events.GET_TICKERS}, (response) => {
            store.dispatch(fetchTickers(response.tickers));
        });
    }

    onChangeCurrentTicker = (tickerKey) => {
        const request = {
            event: Events.SET_CURRENT_TICKER,
            tickerKey: tickerKey
        };

        currentExtension.sendMessage(request, (response) => {
            store.dispatch(setCurrentTickerKey(tickerKey));
        });
    };

    render() {
        const {tickers = [], currentTickerKey = null} = this.props;

        const currentTicker = _.find(tickers, {key: currentTickerKey});

        return (
            <div>
                <div className="ticker-list">
                    {_.map(tickers, (trc) => {
                        const itemProps = {
                            key: trc.key,
                            className: classNames({
                                'ticker-list__item': true,
                                '-active': currentTickerKey === trc.key
                            }),
                            onClick: () => this.onChangeCurrentTicker(trc.key)
                        };

                        return (
                            <div {...itemProps}>{trc.baseCurrency}/{trc.quoteCurrency}</div>
                        )
                    })}
                </div>

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