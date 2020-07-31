import React, { Component } from 'react';

import Styles from './Layout.module.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component<{}, {showBackdropInsideSideDrawer: boolean}> {
    
    state = {
        showBackdropInsideSideDrawer: false,
    }

    sideDrawerClosedHandler = () => {
        this.setState({showBackdropInsideSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => 
            {
                return {showBackdropInsideSideDrawer: !prevState.showBackdropInsideSideDrawer};
            }
        )
    }
    
    render() {
        return (
            <React.Fragment>
                <div>
                    <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                    <SideDrawer showBackdrop={this.state.showBackdropInsideSideDrawer} 
                        closed={this.sideDrawerClosedHandler}/>
                </div>
                <main className={Styles['Content']}>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
    
}

export default Layout;