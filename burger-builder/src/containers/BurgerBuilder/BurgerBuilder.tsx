import React, { PureComponent } from "react";
import Burger, { IBurgerProps } from "../../components/Burger/Burger";
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import { BurgerInnerIngridientName } from '../../Types/BurgerInnerIngridientName'
import { BurgerInnerIngridientsDictionary } from './../../Types/BurgerInnerIngridientsDictionary';
import { BurgerInnerIngridientsMap } from './../../Types/BurgerInnerIngridientsMap'
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';

export interface IBurgerBuilderProps {

}

interface IBurgerBuilderState {
    ingridients: BurgerInnerIngridientsDictionary,
    totalPrice: number,
    purchasable: boolean,
    inPurchaseMode: boolean
}

const INGRIDIENT_PRICES: BurgerInnerIngridientsDictionary = {
    "bacon": 1,
    "cheese": 1,
    "meat": 1.5,
    "salad": 0.5
}

class BurgerBuilder extends PureComponent<IBurgerBuilderProps, IBurgerBuilderState> {

    state = {
        ingridients: {
            'salad': 0,
            'bacon': 0,
            'cheese': 0,
            'meat': 0
        },
        totalPrice: 4,
        purchasable: false,
        inPurchaseMode: false
    }

    purchaseHandler = () => {
        this.setState({inPurchaseMode: true});
    }

    addIngridientHandler = (type:BurgerInnerIngridientName) => {
        const oldCount = this.state.ingridients[type];
        const updatedCount = oldCount + 1;
        const updatedIngridients = {
            ...this.state.ingridients
        };
        updatedIngridients[type] = updatedCount;
        const priceAddition = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ ingridients: updatedIngridients, totalPrice: newPrice });
        this.updatePurchaseState(updatedIngridients);
    }

    updatePurchaseState(ingridients: BurgerInnerIngridientsDictionary) {
        const sum = Object.values(ingridients)
                        .some(value => value > 0);
        this.setState({ purchasable: sum });
    }

    removeIngridientHandler = (type:BurgerInnerIngridientName) => {
        const oldCount = this.state.ingridients[type];
        if(oldCount <= 0) {
            alert("You don't have any " + type + " in your burger!");
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngridients = {
            ...this.state.ingridients
        };
        updatedIngridients[type] = updatedCount;
        const priceDeduction = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ ingridients: updatedIngridients, totalPrice: newPrice });
        this.updatePurchaseState(updatedIngridients);
    }

    purchaseCancelHandler = () => {
        this.setState({inPurchaseMode: false});
    }

    purchaseContinueHandler = () => {
        alert('Continue!');
    }

    render() {
        const disabledInfo = {
            ...this.state.ingridients
        };

        const map: BurgerInnerIngridientsMap = { 
            'salad': false,
            'bacon': false,
            'cheese': false,
            'meat': false
        };

        Object.keys(disabledInfo).forEach(key => {
            const name = key as BurgerInnerIngridientName;
            if(!name) {
                return;
            }
            map[name] = disabledInfo[name] <= 0;
        });

        return (
            <React.Fragment>
                <Modal show={this.state.inPurchaseMode} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary cancelClickHandler={this.purchaseCancelHandler}
                    submitClickHandler={this.purchaseContinueHandler} 
                    ingridients={this.state.ingridients}
                    price={this.state.totalPrice}/>
                </Modal>
                <Burger ingridients={this.state.ingridients}/>
                <BuildControls 
                    price={this.state.totalPrice}
                    ingrideintAddedHandler={this.addIngridientHandler} 
                    ingridientDeductedHandler={this.removeIngridientHandler}
                    disabledInfo={map}
                    ordered={this.purchaseHandler}
                    purchasable={this.state.purchasable}/>
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;