import css from './RealtimeClock.module.css'

import React, {useEffect, useState} from "react";
import clsx from "clsx";

import {IUser} from "../../types/userTypes.ts";
import {IButtonStatus} from "../../types/statusType.ts";

interface IProps {
    isAccessed: boolean,
    user: IUser | null,
    status: IButtonStatus
}

type ClockStasusType = 'default' | 'late' | 'ontime'

const RealtimeClock: React.FC<IProps> = ({isAccessed, user, status}) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [clockStatus, setClockStatus] = useState<ClockStasusType>('default');

    const workStartTime = new Date();

    workStartTime.setHours(9, 0, 0, 0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {

        if (isAccessed === false || user === null || status !== 'noCheckedIn') {
            setClockStatus('default')
        } else {
            const newStatus: ClockStasusType = isLate() ? 'late' : 'ontime'
            setClockStatus(newStatus)
        }

    }, [isAccessed, status, user]);

    const isLate = () => {
        return currentTime > workStartTime;
    };

    const formatTime = (date: Date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    };


    return (
        <div className={clsx(css.wrap,
            clockStatus === 'late' && css.late,
            clockStatus === 'ontime' && css.onTime,
        )}>
            {formatTime(currentTime)}
        </div>
    )
}

export default RealtimeClock