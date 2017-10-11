import React from 'react';
import store from './../Store/Store';
import {connect} from 'react-redux';
import * as _ from 'lodash';

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
                <div>{currentTickerKey}</div>
                {_.map(tickers, (trc) => {
                    return (
                        <div key={trc.key}><i>{trc.price}</i> {trc.baseCurrency} / {trc.quoteCurrency}</div>
                    )
                })}
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