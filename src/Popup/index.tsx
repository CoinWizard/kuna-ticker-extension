import React from 'react';
import {Provider} from 'react-redux';
import proxyStore from 'Popup/Store';

import HomeScreen from 'Popup/Screens/HomeScreen';

import 'Popup/EventHandler';

interface IState {
    ready: boolean;
}

export default class PopupApplication extends React.Component<any, IState> {

    constructor(props: any, context) {
        super(props, context);

        this.state = {
            ready: false
        };
    }

    componentDidMount() {
        proxyStore.ready(() => {
            setTimeout(() => {
                this.setState({ready: true});
            }, 0)
        });
    }

    render() {

        if (false === this.state.ready) {
            return (
                <div className='application -loading'>
                    <div className="loading">Loading...</div>
                </div>
            );
        }

        return (
            <div className="application">
                <Provider store={proxyStore}>
                    <HomeScreen />
                </Provider>
            </div>
        );
    }
}
