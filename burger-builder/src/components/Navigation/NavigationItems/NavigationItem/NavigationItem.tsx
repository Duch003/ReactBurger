import React from 'react';
import { NavLink } from 'react-router-dom';
import Styles from './NavigationItem.module.css';

export interface INavigationItemProps {
    link: string,
    active: boolean,
    exact: boolean
}

const navigationItem: React.FunctionComponent<INavigationItemProps> = (props) => {
    return (
        <li className={Styles['NavigationItem']}>
            <NavLink activeClassName={Styles['active']} exact={props.exact} to={props.link}>{props.children}</NavLink>
        </li>
    );
}

export default navigationItem;