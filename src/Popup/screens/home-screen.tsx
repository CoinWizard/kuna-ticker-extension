import React from 'react';
import cn from 'classnames';
import Numeral from 'numeral';
import { find, each, groupBy, orderBy, reduce } from 'lodash';
import { connect } from 'react-redux';
import { getAsset, KunaAssetUnit } from 'kuna-sdk';
import store from 'Popup/store';
import { TickerInterface } from 'Core/Interfaces';
import { sendTickerScreenView } from 'Popup/Analytics';
import { TickerActions } from 'Core/actions';
import { getCoinIcon } from 'Popup/svg';
import { CurrentTickerView } from './home-views/current-ticker-view';

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
            <div className="home-screen">
                {this.drawMarketList()}

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


    protected createMarketRow = (ticker: TickerInterface, isActive: boolean = false) => {
        const tickerListItemProps = {
            key: ticker.key,
            className: `market-list__item ${isActive ? '-active' : ''}`,
            onClick: () => this.changeMarket(ticker.key),
        };

        const CoinIcon = getCoinIcon(ticker.baseAsset);

        const pValue = Numeral(ticker.dailyChangePercent);

        const changeClassNames = cn('market-list__item-price-percentage', {
            '-up': pValue.value() > 0,
            '-down': pValue.value() <= 0,
        });

        return (
            <div {...tickerListItemProps}>
                <label className="market-list__item-name">
                    {CoinIcon ? (
                        <CoinIcon className="market-list__item-icon" />
                    ) : (
                        <div className="market-list__item-no-icon" />
                    )}
                    <span className="base-asset">{ticker.baseAsset}</span>
                    <span className="asset-separator"> / </span>
                    <span className="quote-asset">{ticker.quoteAsset}</span>
                </label>

                <div className="market-list__item-price">
                    <div className="market-list__item-price-value">
                        {Numeral(ticker.price).format(ticker.format)} {ticker.quoteAsset}
                    </div>
                    <div className={changeClassNames}>
                        {pValue.format('+0,0.[00]')}%
                    </div>
                </div>
            </div>
        );
    };


    protected drawMarketList(): JSX.Element {
        const { tickers = [], currentTickerKey = null } = this.props;
        const groupedTickers = groupBy(tickers, 'quoteAsset');
        const marketList = [];

        const createTickerSeparator = (coinAsset: KunaAssetUnit) => {
            const asset = getAsset(coinAsset);
            const tickerList = groupedTickers[coinAsset];

            const marketVolume = reduce<any[], number>(tickerList, (res: number, t: any) => {
                return res + t.volume_quote;
            }, 0);

            return (
                <div className="market-list__separator" key={'separator-' + coinAsset}>
                    <div className="market-list__separator-name">{asset.name}</div>
                    <div className="market-list__separator-volume">
                        {Numeral(marketVolume).format('0,0.00')} {asset.key}
                    </div>
                </div>
            );
        };

        const createTicker = (ticker: TickerInterface) => {
            if (ticker.price === 0) {
                return;
            }

            marketList.push(this.createMarketRow(ticker, currentTickerKey === ticker.key));
        };

        marketList.push(createTickerSeparator(KunaAssetUnit.UkrainianHryvnia));
        each(groupedTickers[KunaAssetUnit.UkrainianHryvnia], createTicker);

        marketList.push(createTickerSeparator(KunaAssetUnit.Bitcoin));
        each(groupedTickers[KunaAssetUnit.Bitcoin], createTicker);

        marketList.push(createTickerSeparator(KunaAssetUnit.USDollar));
        each(groupedTickers[KunaAssetUnit.USDollar], createTicker);

        marketList.push(createTickerSeparator(KunaAssetUnit.RussianRuble));
        each(groupedTickers[KunaAssetUnit.RussianRuble], createTicker);

        marketList.push(createTickerSeparator(KunaAssetUnit.Tether));
        each(groupedTickers[KunaAssetUnit.Tether], createTicker);

        return <div className="market-list">{marketList}</div>;
    }
}


const mapStateToProps = (store) => {
    const { tickers, currentTickerKey } = store.ticker;

    let orderedTickers = orderBy(tickers, 'index');

    const totalMap = {};
    each(orderedTickers, (ticker) => {
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
        tickers: orderedTickers,
        currentTickerKey: currentTickerKey,
    };
};

export const HomeScreen = connect(mapStateToProps)(HomeScreenComponent);
