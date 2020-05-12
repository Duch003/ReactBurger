import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Styles from './SideDrawer.module.css';
import BackDrop from './../../UI/Backdrop/Backdrop';

const sideDrawer: React.FunctionComponent<{closed(): void, showBackdrop: boolean}> = (props) => {

    let attachedClasses = [Styles['SideDrawer'], Styles['Close']];

    if(props.showBackdrop) {
        attachedClasses =  [Styles['SideDrawer'], Styles['Open']];
    }
    return (
        <React.Fragment>
            <BackDrop show={props.showBackdrop} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={Styles['Logo']}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </React.Fragment>
        
    );
}

export default sideDrawer;