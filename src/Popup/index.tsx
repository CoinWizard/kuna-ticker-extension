import React from 'react';
import { Provider } from 'react-redux';
import proxyStore from 'Popup/Store';
import { HomeScreen } from 'Popup/Screens/HomeScreen';
import 'Popup/EventHandler';

interface AppProps {
}

interface AppState {
    ready: boolean;
}

export class PopupApplication extends React.PureComponent<AppProps, AppState> {

    public constructor(props: any, context) {
        super(props, context);

        this.state = {
            ready: false
        };
    }

    public componentDidMount(): void {
        proxyStore.ready(() => {
            setTimeout(() => {
                this.setState({ready: true});
            }, 0);
        });
    }

    public render(): JSX.Element {
        const {ready = false} = this.state;

        if (false === ready) {
            return (
                <div className='application -loading'>
                    <div className="loading">Loading...</div>
                </div>
            );
        }

        return (
            <div className="application">
                <Provider store={proxyStore}>
                    <HomeScreen/>
                </Provider>
            </div>
        );
    }
}
