import css from "./LoginButton.module.css";

import React, {useEffect} from "react";

import {IUser} from "../../types/userTypes.ts";

interface IProps {
    onLogin: (user: IUser) => void
}

const LoginButton: React.FC<IProps> = ({onLogin}) => {

    useEffect(() => {
        // Создаем скрипт
        const script = document.createElement('script');
        script.src = "https://telegram.org/js/telegram-widget.js?22";
        script.async = true;
        script.setAttribute('data-telegram-login', 'office_kibstore_bot');
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-radius', '10');
        script.setAttribute('data-onauth', 'onTelegramAuth(user)');
        script.setAttribute('data-request-access', 'write');

        // @ts-ignore
        window.onTelegramAuth = function (user) {
            onLogin(user)
        };

        document.getElementById('auth-tg-btn')?.appendChild(script);

        return () => {
            document.getElementById('auth-tg-btn')?.removeChild(script);
        };
    }, []);

    return (
        <div className={css.wrap}>
            <span className={css.label}>Ідентифікуйте себе</span>
            <div id='auth-tg-btn'></div>
        </div>
    )
}

export default LoginButton