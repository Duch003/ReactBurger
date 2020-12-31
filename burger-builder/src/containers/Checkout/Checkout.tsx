import React, { Component } from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { RouteComponentProps, Route, Redirect } from "react-router-dom";
import ContactData from './Contact/ContactData';
import { connect } from 'react-redux';
import { INITIAL_INGRIDIENTS } from "../BurgerBuilder/store/BurgerBuilderDefaults";
import { RootState } from './../../reduxSetup';

class Checkout extends Component<Props> {

    // componentDidMount() {
    //     this.props.onInitPurchase();
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    
    checkoutSubmittedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        const summary = this.props.ingridients
        ? (<React.Fragment>
                {this.props.purchased ? <Redirect to='/'/> : null}
                <CheckoutSummary 
                    ingridients={this.props.ingridients}
                    onCancelClick={this.checkoutCancelledHandler}
                    onSubmitClick={this.checkoutSubmittedHandler}/>
                <Route path={this.props.match.path + '/contact-data'} 
                        component={ContactData}/>
            </React.Fragment>)
        : <Redirect to='/'/>

        return summary;
    }
}

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps) => {
    return {
        ingridients: state.burgerBuilderReducer.ingridients === INITIAL_INGRIDIENTS 
            ? null 
            : state.burgerBuilderReducer.ingridients,
        ...ownProps,
        purchased: state.contactDataReducer.purchased
    };
}

type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, null)(Checkout);