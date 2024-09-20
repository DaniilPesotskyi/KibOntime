import css from './Header.module.css'

import React from "react";

import logo from './../../assets/logo.svg'

import AccessIndicator from "./AccessIndicator/AccessIndicator.tsx";

interface IProps {
    isAccessed: boolean
}

const Header: React.FC<IProps> = ({isAccessed}) => {
    return (
            <header className={css.header}>
                <AccessIndicator isAccessed={isAccessed}/>
                <div className={css.logo}>
                    <span className={css.logoLabel}>on time</span>
                    <img className={css.icon} src={logo} alt="logo"/>
                    <h1 className={css.title}>KIBSTORE</h1>
                </div>
            </header>
    )
}

export default Header