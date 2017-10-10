import React from 'react';
import {Provider} from 'react-redux';
import store from './Store/Store.js';

import HomeScreen from './Screens/HomeScreen';

import './EventHandler';

export default class PopupApplication extends React.Component {
    render() {
        return (
            <div className="application">
                <Provider store={store}>
                    <HomeScreen />
                </Provider>
            </div>
        );
    }
}