import css from './AccessIndicator.module.css'

import React from "react";
import clsx from "clsx";

interface IProps {
    isAccessed: boolean;
}

const AccessIndicator: React.FC<IProps> = ({isAccessed}) => {

    const label = isAccessed ? 'Дозволено' : 'Без доступу'

    return (
        <div className={css.wrap}>
            <div className={clsx(css.indicator, !isAccessed && css.disabled)}></div>
            <span className={clsx(css.label, !isAccessed && css.disabled)}>{label}</span>
        </div>
    )
}

export default AccessIndicator;