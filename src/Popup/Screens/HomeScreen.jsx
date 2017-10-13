import React from 'react';
import store from 'Popup/Store/index';
import {connect} from 'react-redux';
import * as _ from 'lodash';

import Dropdown from 'react-dropdown';

import ExtensionPlatform from 'Core/Extension';
import {Events} from 'Core/EventProtocol/Events';

import {TickerActions} from 'Popup/Actions/TickerActions';
import CurrentTickerView from 'Popup/Screens/HomeViews/CurrentTickerView';

const currentExtension = ExtensionPlatform.getExtension().extension;


class HomeScreen extends React.Component {

    componentWillMount() {
        currentExtension.sendMessage({event: Events.FETCH_CURRENT_TICKER}, (response) => {
            store.dispatch(TickerActions.setCurrentTickerKey(response.currentTickerKey));
        });

        currentExtension.sendMessage({event: Events.GET_TICKERS}, (response) => {
            store.dispatch(TickerActions.fetchTickers(response.tickers));
        });
    }

    onSelectMarket = (value) => {
        const tickerKey = value.value;
        const request = {
            event: Events.SET_CURRENT_TICKER,
            tickerKey: tickerKey
        };

        currentExtension.sendMessage(request, (response) => {
            store.dispatch(TickerActions.setCurrentTickerKey(tickerKey));
        });
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


    drawDropDown(currentTicker = null) {

        let currentTickerDropdownValue = null;

        if (currentTicker) {
            currentTickerDropdownValue = {
                value: currentTicker.key,
                label: `${currentTicker.baseCurrency}/${currentTicker.quoteCurrency}`
            }
        }


        return (
            <Dropdown
                value={currentTickerDropdownValue}
                options={this.getDropDownOptions()}
                onChange={this.onSelectMarket}
                placeholder="Select an Marker"
                className="ticker-list__dropdown"
            />
        )
    }

    render() {
        const {tickers = [], currentTickerKey = null} = this.props;

        const currentTicker = _.find(tickers, {key: currentTickerKey});

        return (
            <div>
                <div className="ticker-list">
                    {this.drawDropDown(currentTicker)}
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