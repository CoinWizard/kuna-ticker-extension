import React from 'react';
import Numeral, { default as numeral } from 'numeral';
import { Provider } from 'react-redux';
import proxyStore from 'Popup/store';
import { HomeScreen } from 'Popup/screens/home-screen';
import 'Popup/event-handler';

Numeral.zeroFormat('0');
Numeral.nullFormat('0');
Numeral.register('locale', 'ua', {
    delimiters: {
        thousands: ' ',
        decimal: '.'
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    ordinal : function (number: number) {
        return number === 1 ? 'er' : 'ème';
    },
    currency: {
        symbol: '$'
    }
});

// switch between locales
numeral.locale('ua');

export type AppProps = {
}

export type AppState = {
    ready: boolean;
}

export class PopupApplication extends React.PureComponent<AppProps, AppState> {
    public constructor(props: any, context) {
        super(props, context);

        this.state = {
            ready: false,
        };
    }

    public componentDidMount(): void {
        proxyStore.ready(() => {
            setTimeout(() => {
                this.setState({ ready: true });
            }, 0);
        });
    }

    public render(): JSX.Element {
        const { ready = false } = this.state;

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
                    <HomeScreen />
                </Provider>
            </div>
        );
    }
}
