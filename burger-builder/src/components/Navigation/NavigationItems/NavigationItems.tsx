import React from 'react';
import Styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems: React.FunctionComponent = () => {
    return (
        <ul className={Styles['NavigationItems']}>
            <NavigationItem link="/" active={true}>Burger Builder</NavigationItem>
            <NavigationItem link="/" active={false}>Checkout</NavigationItem>
        </ul>
    );
}

export default navigationItems;