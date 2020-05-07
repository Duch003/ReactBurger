import React from 'react';
import Styles from './Toolbar.module.css';
import Logo from './../../Logo/Logo';
import NavigationItems from './../NavigationItems/NavigationItems';

const toolbar: React.FunctionComponent = () => {
    return (
        <header className={Styles['Toolbar']}>
            <div>MENU</div>
            <Logo/>
            <nav>
                <NavigationItems/>
            </nav>
            
        </header>
    );
}

export default toolbar;