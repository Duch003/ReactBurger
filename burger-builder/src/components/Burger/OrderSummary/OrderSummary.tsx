import React from 'react';
import { BurgerInnerIngridientsDictionary } from '../../../Types/BurgerInnerIngridientsDictionary';
import { BurgerInnerIngridientName } from '../../../Types/BurgerInnerIngridientName';
import Button from './../../UI/Button/Button';

export type OrderSummaryProps = {
    ingridients: BurgerInnerIngridientsDictionary,
    cancelClickHandler(): void,
    submitClickHandler(): void,
    price: number
}

const orderSummary: React.FunctionComponent<OrderSummaryProps> = (props) => {

    const ingridientSummary = Object.keys(props.ingridients).map((igKey, index) => {
        return (
            <li key={igKey + index}>
                <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingridients[igKey as BurgerInnerIngridientName]}
            </li>)
    });

    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingridients:</p>
            <ul>
                {ingridientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)} zł.</strong></p>
            <p>Continue to Checkout?</p>
            <Button buttonType='Danger' clicked={props.cancelClickHandler}>CANCEL</Button>
            <Button buttonType='Success' clicked={props.submitClickHandler}>CONTINUE</Button>
        </React.Fragment>
    );

}

export default orderSummary;