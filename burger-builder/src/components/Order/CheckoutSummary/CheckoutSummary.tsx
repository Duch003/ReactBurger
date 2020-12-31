import React from 'react';
import Styles from './CheckoutSummary.module.css';
import Burger, { IBurgerProps } from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

export interface ICheckoutSummaryProps extends IBurgerProps {
    onCancelClick(): void,
    onSubmitClick(): void
}

const checkoutSummary: React.FunctionComponent<ICheckoutSummaryProps> = (props) => {
    return (
        <div className={Styles['CheckoutSummary']}>
            <h1>We hope it tastesd well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingridients={props.ingridients}/>
            </div>
            <Button buttonType="Danger" disabled={false}  clicked={props.onCancelClick}>Cancel</Button>
            <Button buttonType="Success" disabled={false}  clicked={props.onSubmitClick}>Continue</Button>
        </div>
    );
}

export default checkoutSummary;