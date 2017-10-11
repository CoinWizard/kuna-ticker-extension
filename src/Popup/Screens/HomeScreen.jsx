import React from 'react';
import store from './../Store/Store';
import {connect} from 'react-redux';
import * as _ from 'lodash';
import Numeral from 'numeral';
import classNames from 'classNames';

import ExtensionPlatform from './../../Library/Extension';
import * as Events from './../../Library/EventProtocol/Events';
const ext = new ExtensionPlatform;

import {fetchTickers, setCurrentTickerKey} from './../Actions/TickerActions';

const currentExtension = ext.getExtension().extension;

class HomeScreen extends React.Component {

    componentWillMount() {
        currentExtension.sendMessage({event: Events.GET_CURRENT_TICKER}, (response) => {
            store.dispatch(setCurrentTickerKey(response.currentTickerKey));
        });

        currentExtension.sendMessage({event: Events.GET_TICKERS}, (response) => {
            store.dispatch(fetchTickers(response.tickers));
        });
    }

    render() {
        const {tickers = [], currentTickerKey = null} = this.props;

        const currentTicker = _.find(tickers, {key: currentTickerKey});

        if (!currentTicker) {
            return <div className="loading">'Wait...'</div>;
        }

        return (
            <div>
                <div className="current-ticker">
                    {Numeral(currentTicker.price).format('0,0.[00]')} {currentTicker.quoteCurrency}
                </div>

                <div className="ticker-list">
                    {_.map(tickers, (trc) => {
                        const itemProps = {
                            key: trc.key,
                            className: classNames({
                                'ticker-list__item': true,
                                '-active': currentTickerKey === trc.key
                            })
                        };

                        return (
                            <div {...itemProps}>{trc.baseCurrency} / {trc.quoteCurrency}</div>
                        )
                    })}
                </div>
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