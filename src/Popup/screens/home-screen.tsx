import React from 'react';
import store from 'Popup/store';
import { connect } from 'react-redux';
import { getAsset, KunaAssetUnit } from 'kuna-sdk';
import { find, each, groupBy } from 'lodash';
import Numeral from 'numeral';
import { sendTickerScreenView } from 'Popup/Analytics';


import { TickerActions } from 'Popup/Actions/TickerActions';
import { CurrentTickerView } from './home-views/current-ticker-view';
import { getCoinIcon } from 'Popup/svg';
import { TickerInterface } from 'Core/Interfaces/TickerInterface';


type HomeScreenProps = {
    tickers: any;
    currentTickerKey: string;
};

type HomeScreenState = {
    selectMode: boolean;
};

class HomeScreenComponent extends React.PureComponent<HomeScreenProps, HomeScreenState> {
    public readonly state: HomeScreenState = {
        selectMode: false,
    };


    public render(): JSX.Element {
        const { tickers = [], currentTickerKey = null } = this.props;
        const currentTicker = find(tickers, { key: currentTickerKey }) as any;

        return (
            <div>
                {this.drawMarketList()}

                <header className="header">
                    {this.renderCurrentTickerHeader()}
                </header>

                {currentTicker ? (
                    <CurrentTickerView ticker={currentTicker} />
                ) : (
                    <div className="loading">Wait...</div>
                )}
            </div>
        );
    }


    protected changeMarket = (tickerKey: string): void => {
        const { tickers = [] } = this.props;
        const currentTicker = find(tickers, { key: tickerKey });
        store.dispatch(TickerActions.setCurrentTickerKey(tickerKey));

        sendTickerScreenView(currentTicker);

        this.setState({ selectMode: false });
    };


    protected createMarketRow = (market: TickerInterface, isActive: boolean = false) => {
        const tickerListItemProps = {
            key: market.key,
            className: `ticker-list__item ${isActive ? '-active' : ''}`,
            onClick: () => this.changeMarket(market.key),
        };

        const CoinIcon = getCoinIcon(market.baseAsset);

        return (
            <div {...tickerListItemProps}>
                <label className="ticker-list__item-name">
                    {CoinIcon ? (
                        <CoinIcon className="ticker-list__item-icon" />
                    ) : (
                        <div className="ticker-list__item-no-icon" />
                    )}
                    <span className="base-asset">{market.baseAsset}</span>
                    <span className="asset-separator"> / </span>
                    <span className="quote-asset">{market.quoteAsset}</span>
                </label>
                <span className="ticker-list__item-price">
                    {Numeral(market.price).format(market.format)} {market.quoteAsset}
                </span>
            </div>
        );
    };


    protected drawMarketList(): JSX.Element {
        const { tickers = [], currentTickerKey = null } = this.props;
        const { selectMode = false } = this.state;
        const groupedTickers = groupBy(tickers, 'quoteAsset');
        const marketList = [];

        const createTickerSeparator = (coinAsset: KunaAssetUnit) => {

            const asset = getAsset(coinAsset);
            const CoinIcon = getCoinIcon(coinAsset);

            return (
                <div className="ticker-list__separator" key={'separator-' + coinAsset}>
                    {CoinIcon ? <CoinIcon className="ticker-list__separator-icon" /> : undefined}
                    <div className="ticker-list__separator-name">{asset.name}</div>
                </div>
            );
        };

        const createTicker = (ticker) => {
            marketList.push(this.createMarketRow(ticker, currentTickerKey === ticker.key));
        };

        marketList.push(createTickerSeparator(KunaAssetUnit.UkrainianHryvnia));
        each(groupedTickers[KunaAssetUnit.UkrainianHryvnia], createTicker);

        marketList.push(createTickerSeparator(KunaAssetUnit.Bitcoin));
        each(groupedTickers[KunaAssetUnit.Bitcoin], createTicker);

        marketList.push(createTickerSeparator(KunaAssetUnit.Ethereum));
        each(groupedTickers[KunaAssetUnit.Ethereum], createTicker);

        marketList.push(createTickerSeparator(KunaAssetUnit.StasisEuro));
        each(groupedTickers[KunaAssetUnit.StasisEuro], createTicker);

        marketList.push(createTickerSeparator(KunaAssetUnit.GolosGold));
        each(groupedTickers[KunaAssetUnit.GolosGold], createTicker);

        return <div className={`ticker-list ${selectMode ? '-active' : ''}`}>{marketList}</div>;
    }


    protected renderCurrentTickerHeader(): JSX.Element {
        const { tickers = [], currentTickerKey = null } = this.props;
        const currentTicker = find(tickers, { key: currentTickerKey }) as any;

        const currentMarketLabelProps = {
            className: 'header__current-market',
            onClick: () => this.setState({ selectMode: true }),
        };

        if (!currentTicker) {
            return <div />;
        }

        const CoinIcon = getCoinIcon(currentTicker.baseAsset);

        return (
            <label {...currentMarketLabelProps}>
                {CoinIcon && <CoinIcon className="header__current-market-icon" />}
                <div className="header__current-market-text">
                    <span className="base">{currentTicker.baseAsset}</span>
                    <span className="separator"> / </span>
                    <span className="quote">{currentTicker.quoteAsset}</span>
                </div>

                <div className="drop-down">
                    <div className="drop-down__icon"/>
                </div>
            </label>
        );
    }
}


const mapStateToProps = (store) => {
    const { tickers, currentTickerKey } = store.ticker;

    const totalMap = {};
    each(tickers, (ticker) => {
        if (!(ticker.baseAsset in totalMap)) {
            totalMap[ticker.baseAsset] = 0;
        }

        if (!(ticker.quoteAsset in totalMap)) {
            totalMap[ticker.quoteAsset] = 0;
        }

        totalMap[ticker.baseAsset] += parseFloat(ticker.volume_base);
        totalMap[ticker.quoteAsset] += parseFloat(ticker.volume_quote);
    });

    return {
        tickers: tickers,
        currentTickerKey: currentTickerKey,
    };
};

export const HomeScreen = connect(mapStateToProps)(HomeScreenComponent);
