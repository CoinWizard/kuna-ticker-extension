import { ClassAttributes, ComponentType, SVGAttributes } from 'react';
import { KunaAssetUnit } from 'kuna-sdk';

type SVGComponent = ComponentType<ClassAttributes<SVGElement> & SVGAttributes<SVGElement>>;

export function getCoinIcon(coin: KunaAssetUnit): SVGComponent | undefined {
    try {
        const icon = require(`resources/svg/coin-icons/${coin}.svg`);
        if (icon) {
            return icon;
        }

    } catch (error) {
    }

    return undefined;
}
