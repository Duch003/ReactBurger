import React from 'react';
import Styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems: React.FunctionComponent<{isLoggedIn: boolean}> = (props) => {
    const logTile = props.isLoggedIn
        ? <NavigationItem link="/logout" active={false} exact={true}>Log Out</NavigationItem>
        : <NavigationItem link="/auth" active={false} exact={true}>Authenticate</NavigationItem>

    const ordersTile = props.isLoggedIn
        ? <NavigationItem link="/orders" active={false} exact={true}>Orders</NavigationItem>
        : null;

    return (
        <ul className={Styles['NavigationItems']}>
            <NavigationItem link="/" active={true} exact={true}>Burger Builder</NavigationItem>
            {ordersTile}
            {logTile}
        </ul>
    );
}

export default navigationItems;