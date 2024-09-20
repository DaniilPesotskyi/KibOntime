import css from './UserInfo.module.css'

import React from "react";
import {IUser} from "../../types/userTypes.ts";

interface IProps {
    user: IUser
}

const UserInfo: React.FC<IProps> = ({user}) => {
    return (
        <div className={css.wrap}>
            <img className={css.image} src={user.photo_url ? user.photo_url : ''} alt="avatar"/>
            <span className={css.label}>Вітаємо, {user.first_name}</span>
        </div>
    )
}

export default UserInfo