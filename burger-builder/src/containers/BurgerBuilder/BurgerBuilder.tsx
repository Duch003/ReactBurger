import React, { PureComponent } from "react";
import Burger, { IBurgerProps } from "../../components/Burger/Burger";
import { BurgerIngridientsDictionary } from "../../Types/BurgerIngridientsDictionary";
import BuildControls, { IBuildControlsProps } from './../../components/Burger/BuildControls/BuildControls';
import { BurgerIngridientName } from "../../Types/BurgerIngridientName";
import { BurgerInnerIngridientName } from '../../Types/BurgerInnerIngridientName'
import { BurgerInnerIngridientsDictionary } from './../../Types/BurgerInnerIngridientsDictionary';

export interface IBurgerBuilderProps {

}

interface IBurgerBuilderState {
    ingridients: BurgerInnerIngridientsDictionary,
    totalPrice: number
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
        totalPrice: 4
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
    }

    removeIngridientHandler = (type:BurgerIngridientName) => {

    }

    render() {
        return (
            <React.Fragment>
                <Burger ingridients={this.state.ingridients}/>
                <BuildControls ingrideintAddedHandler={this.addIngridientHandler}/>
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;