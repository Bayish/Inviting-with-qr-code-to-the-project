import React from 'react';
import c from './NavigationItem.module.css';
import {NavLink} from "react-router-dom";

const NavigationItem = ({to, exact, children}) => {
    return (
        <li className={c.NavigationItem}>
            <NavLink to={to} exact={exact}>{children}</NavLink>
        </li>
    );
};

export default NavigationItem;