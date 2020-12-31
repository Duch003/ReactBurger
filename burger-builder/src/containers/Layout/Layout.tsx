import React from 'react';

import Styles from './Layout.module.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';
import { RootState } from '../../reduxSetup';

class Layout extends React.Component<React.PropsWithChildren<Props>, {showBackdropInsideSideDrawer: boolean}> {

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
                    <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} isLoggedIn={this.props.isAuthenticated}/>
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

const mapStateToProps = (state: RootState) => {
    return {
        isAuthenticated: state.authReducer.token !== ''
    }
}

type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, null)(Layout);