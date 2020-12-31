import React, { Component } from 'react';
import { Route, RouteProps, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
//import Checkout from './containers/Checkout/Checkout';
//import Orders from './containers/Orders/Orders';
//import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { bindActionCreators, Dispatch } from 'redux';
import { authCheckState } from './containers/Auth/store/AuthActionCreators';
import { connect } from 'react-redux';
import { RootState } from './reduxSetup';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
    return import('./containers/Checkout/Checkout');
});
const asyncOrders = asyncComponent(() => {
    return import('./containers/Orders/Orders');
});
const asyncAuth = asyncComponent(() => {
    return import('./containers/Auth/Auth');
});

class App extends Component<Props> {

    componentDidMount() {
        this.props.onTryAutoLogIn();
    }

    render() {

        const routes = this.props.isLoggedIn
            ?   <Switch>
                    <Route path="/checkout" component={asyncCheckout} />
                    <Route path="/orders" component={asyncOrders} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/auth" component={asyncAuth} />
                    <Route path="/" exact={true} component={BurgerBuilder} />
                    <Redirect to='/'/>
                </Switch> 
            :   <Switch>
                    <Route path="/auth" component={asyncAuth} />
                    <Route path="/" exact={true} component={BurgerBuilder} />
                    <Redirect to='/'/>
                </Switch> 
        return (
            <Layout isAuthenticated={false}>
                {routes}
            </Layout>
        );
    }
}

const mapStateToProps = (state: RootState, ownProps: {}) => {
    return {
        isLoggedIn: state.authReducer.token !== ''
    };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({
        onTryAutoLogIn: () => authCheckState()
    }, dispatch);
}

type Props = ReturnType<typeof mapDispatchToProps> & RouteProps & ReturnType<typeof mapStateToProps>;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
