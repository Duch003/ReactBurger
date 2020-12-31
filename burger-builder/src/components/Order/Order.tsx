import React from 'react';
import Styles from './Order.module.css';
import { BurgerInnerIngridientsDictionary } from '../../Types/BurgerInnerIngridientsDictionary';

export interface IOrderProps {
    ingridients: BurgerInnerIngridientsDictionary,
    price: number
}

const order: React.FunctionComponent<IOrderProps> = (props) => {

    var resultArray = Object.keys(props.ingridients).map(ingridient => {
        if(ingridient === 'id') {
            return null;
        }
        return <span key={ingridient}
            style={{
                textTransform: 'capitalize', 
                display: 'inline-block', 
                margin: '0 8px', 
                border: '1px solid #ccc', 
                padding: '5px'}}>{ingridient} ({props.ingridients[ingridient]})</span>
    });
    
    return (
        <div className={Styles['Order']}>
            <p>Ingridients: {resultArray}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
}

export default order;