import React, { PureComponent } from "react";
import Burger, { IBurgerProps } from "../../components/Burger/Burger";
import { BurgerIngridientsDictionary } from "../../Types/BurgerIngridientsDictionary";

export interface IBurgerBuilderProps {

}

interface IBurgerBuilderState {
    ingridients: BurgerIngridientsDictionary
}

class BurgerBuilder extends PureComponent {

    state = {
        ingridients: {
            'salad': 1,
            'bacon': 1,
            'cheese': 2,
            'meat': 2,
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