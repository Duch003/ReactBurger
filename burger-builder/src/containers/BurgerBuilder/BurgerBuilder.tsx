import React, { PureComponent } from "react";
import Burger, { IBurgerProps } from "../../components/Burger/Burger";
import { BurgerIngridientsDictionary } from "../../Types/BurgerIngridientsDictionary";

export interface IBurgerBuilderProps {

}

interface IBurgerBuilderState {
    ingridients: BurgerIngridientsDictionary
}

class BurgerBuilder extends PureComponent<IBurgerBuilderProps, IBurgerBuilderState> {

    state = {
        ingridients: {
            'salad': 0,
            'bacon': 0,
            'cheese': 0,
            'meat': 0,
            'bread-top': 0,
            'bread-bottom': 0
        }
    }

    render() {
        return (
            <React.Fragment>
                <Burger ingridients={this.state.ingridients}></Burger>
                <div>Build Controls</div>
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;