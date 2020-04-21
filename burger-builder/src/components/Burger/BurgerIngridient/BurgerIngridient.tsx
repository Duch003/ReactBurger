import React from 'react';
import Styles from './BurgerIngridient.module.css';

import { BurgerIngridientName } from '../../../Types/BurgerIngridientName'

export interface IBurgerIngridientProps {
    type: BurgerIngridientName;
}

const burgerIngridient: React.FunctionComponent<IBurgerIngridientProps> = props => {

    let output: any;

    switch (props.type) {
        case 'bread-bottom':
            output = <div className={Styles['BreadBottom']}></div>;
            break;
        case 'bread-top':
            output = (
                <div className={Styles['BreadTop']}>
                    <div className={Styles["Seeds1"]}></div>\
                    <div className={Styles["Seeds2"]}></div>
                </div>);
            break;
        case 'meat':
            output = <div className={Styles['Meat']}></div>;
            break;
        case 'cheese':
            output = <div className={Styles['Cheese']}></div>;
            break;
        case 'salad':
            output = <div className={Styles['Salad']}></div>;
            break;
        case 'bacon':
            output = <div className={Styles['Bacon']}></div>;
            break;
        default:
            output = null;
    }

    return (
        <React.Fragment>
            {output}
        </React.Fragment>);
}

export default burgerIngridient;