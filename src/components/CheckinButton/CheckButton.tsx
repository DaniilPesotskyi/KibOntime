import css from './CheckButton.module.css'

import React from "react";
import clsx from "clsx";

import {IButtonStatus} from "../../types/statusType.ts";

import {Button} from "@mui/material";

interface IProps {
    status: IButtonStatus
    onClick: () => void
}

const CheckButton: React.FC<IProps> = ({status, onClick}) => {

    const getLabel = () => {
        if (status === 'checkedIn') {
            return 'Я на місці'
        } else if (status === 'noCheckedIn') {
            return 'Відмітитись'
        } else if (status === 'unavailable') {
            return 'Немає доступу'
        } else if (status === 'load') {
            return ''
        }
    }

    return (
        <Button variant={'contained'} onClick={onClick} className={clsx(css.button,
            status === 'unavailable' && css.unavailable,
            status === 'checkedIn' && css.checkedIn,
            status === 'noCheckedIn' && css.noCheckedIn,
            status === 'load' && css.load,
        )} type='button'>
            {status !== 'unavailable' && status !== 'load' && <TimeIcon className={css.icon}/>}
            {status === 'load' && <LoadIcon className={css.loadIcon}/>}
            <span>{getLabel()}</span>
        </Button>
    )
}

export default CheckButton

function TimeIcon({className}: { className: string }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none">
            <path
                d="M3.74 14.47c0-2.04.51-3.93 1.52-5.66A11.25 11.25 0 019.37 4.7c1.73-1.01 3.61-1.51 5.64-1.51 1.52 0 2.98.3 4.37.89 1.39.59 2.58 1.4 3.59 2.4 1.01 1 1.81 2.2 2.4 3.6.59 1.4.89 2.85.89 4.39 0 1.52-.3 2.98-.89 4.37a11.25 11.25 0 01-2.4 3.59c-1 1-2.2 1.8-3.59 2.39-1.39.59-2.84.89-4.37.89-1.53 0-3-.3-4.39-.89-1.39-.59-2.59-1.4-3.6-2.4-1.01-1-1.8-2.2-2.4-3.58-.6-1.38-.88-2.84-.88-4.37zm2.48 0c0 2.37.86 4.43 2.59 6.18 1.73 1.73 3.79 2.59 6.2 2.59 1.58 0 3.05-.39 4.39-1.18a8.872 8.872 0 003.21-3.2 8.537 8.537 0 001.19-4.39c0-1.58-.4-3.05-1.19-4.4a8.822 8.822 0 00-3.21-3.21 8.528 8.528 0 00-4.39-1.18c-1.58 0-3.05.39-4.39 1.18a9.005 9.005 0 00-3.22 3.21c-.8 1.35-1.18 2.82-1.18 4.4zm7.92 0V7.81c0-.23.08-.43.24-.59.16-.16.36-.24.59-.24.23 0 .43.08.59.24.16.16.24.36.24.59v5.21l2.78-1.57c.2-.12.41-.15.63-.09.33.09.39.2.5.41.12.2.14.41.08.63-.06.22-.19.4-.39.51l-3.88 2.17a.8.8 0 01-.56.22.808.808 0 01-.82-.83z"
            ></path>
        </svg>
    );
}

function LoadIcon({className}: { className: string }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="none">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.5 4.375c7.248 0 13.125 5.877 13.125 13.125"
            ></path>
        </svg>
    );
}