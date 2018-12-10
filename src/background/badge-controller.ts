import * as Numeral from 'numeral';

import ExtensionPlatform from 'Core/Extension';
import { TickerInterface } from 'Core/Interfaces/TickerInterface';

const browserAction = ExtensionPlatform.getExtension().browserAction;

export default class BadgeController {

    static formatTickerPrice(price: number): string {
        let priceNumeral = Numeral(price);

        if (price < 10) {
            return '' + priceNumeral.format('0.[00]');
        } else if (price < 100) {
            return '' + priceNumeral.format('0,0.[0]');
        } else if (price < 1000) {
            return '' + priceNumeral.format('0,0.[0]');
        } else if (price < 10000) {
            return '' + priceNumeral.format('00');
        } else if (price < 100000) {
            return '' + priceNumeral.divide(1000).format('0.[0]');
        } else if (price < 1000000) {
            return '' + priceNumeral.divide(1000).format('00');
        } else if (price < 10000000) {
            return '' + priceNumeral.divide(1000000).format('0.[00]');
        }

        return '' + price;
    }

    static updateBudgetTexts(ticker: TickerInterface) {
        browserAction.setBadgeText({
            text: BadgeController.formatTickerPrice(ticker.price),
        });

        browserAction.setTitle({
            title: 'Kuna Ticker: ' +
            `${ticker.baseAsset} / ${ticker.quoteAsset}` +
            ` - ${Numeral(ticker.price).format(ticker.format)}`,
        });
    }
}
