import React, { Component } from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { BurgerInnerIngridientsDictionary } from "../../Types/BurgerInnerIngridientsDictionary";
import { RouteComponentProps, Route } from "react-router-dom";
import ContactData from './Contact/ContactData';

class Checkout extends Component<RouteComponentProps, {ingridients: BurgerInnerIngridientsDictionary, totalPrice: number}> {

    state = {
        ingridients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        },
        totalPrice: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const entries = Array.from(query.entries());

        if(entries.length < 1){
            return;
        }
        const ingridientsFromParams: BurgerInnerIngridientsDictionary = {
            salad: +(entries.find(param => param[0] === 'salad')?.[1] as any),
            cheese: +(entries.find(param => param[0] === 'cheese')?.[1] as any),
            bacon: +(entries.find(param => param[0] === 'bacon')?.[1] as any),
            meat: +(entries.find(param => param[0] === 'meat')?.[1] as any)
        };
        const price = +(entries.find(param => param[0] === 'price')?.[1] as any)

        this.setState({ingridients: ingridientsFromParams, totalPrice: price});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    
    checkoutSubmittedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingridients={this.state.ingridients}
                    onCancelClick={this.checkoutCancelledHandler}
                    onSubmitClick={this.checkoutSubmittedHandler}
                />
                <Route path={this.props.match.path + '/contact-data'} 
                    render={(props) => (<ContactData ingridients={this.state.ingridients} price={this.state.totalPrice} {...props}/>)}/>
            </div>
        );
    }

}

export default Checkout;