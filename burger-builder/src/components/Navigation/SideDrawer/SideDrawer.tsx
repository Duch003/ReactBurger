import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Styles from './SideDrawer.module.css';
import BackDrop from './../../UI/Backdrop/Backdrop';

const sideDrawer: React.FunctionComponent<{closed(): void, showBackdrop: boolean}> = (props) => {

    let attachedClasses = props.showBackdrop 
        ? [Styles['SideDrawer'], Styles['Open']] 
        : [Styles['SideDrawer'], Styles['Close']];

    return (
        <React.Fragment>
            <BackDrop show={props.showBackdrop} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={Styles['Logo']}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems isLoggedIn={false}/>
                </nav>
            </div>
        </React.Fragment>
        
    );
}

export default sideDrawer;