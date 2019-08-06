import React from 'react';
import cn from 'classnames';

type InfoCellProps = {
    value: string;
    label: string;
    valueClassName?: string;
};

export default function InfoCell(props: InfoCellProps) {
    return (
        <label className="current-ticker__info">
            <span className={cn('current-ticker__info-value', props.valueClassName)}>
                {props.value}
            </span>
            <span className="current-ticker__info-label">
                {props.label}
            </span>
        </label>
    );
}
