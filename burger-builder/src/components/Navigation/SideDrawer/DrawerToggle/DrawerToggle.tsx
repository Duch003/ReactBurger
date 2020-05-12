import React from 'react';
import Styles from './DrawerToggle.module.css';

const drawerToggle: React.FunctionComponent<{clicked(): void}> = (props) => {
    return (
        <div className={Styles['DrawerToggle']} onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default drawerToggle;