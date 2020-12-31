import React from 'react';

import Styles from './Input.module.css';
import { OrderDeliveryMethod } from '../../../Types/OrderDeliveryMethod';

export interface IInputProps {
    elementType: string,
    elementConfig: any
    value: string,
    changed(event: React.ChangeEvent): void,
    invalid: boolean,
    shouldValidate: boolean,
    touched: boolean
}

const input: React.FunctionComponent<IInputProps> = (props) => {

    let inputElement = null;
    const inputClasses = [Styles['InputElement']];

    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(Styles['Invalid'])
    }
    
    switch(props.elementType) {
        case ('input'):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                onChange={props.changed} 
                value={props.value}
            />;
            break;
        case ('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                onChange={props.changed} 
                value={props.value}
            />;
            break;
        case ('select'):
            inputElement = (
                <select className={inputClasses.join(' ')}  onChange={props.changed} value={props.value}>
                    {props.elementConfig.options.map((item: { value: OrderDeliveryMethod, displayValue: OrderDeliveryMethod }, index: number) => {
                        return <option key={index} value={item.value}>{item.displayValue}</option>;
                    })}
                </select>
            );
            break;
        default:
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                onChange={props.changed} 
                value={props.value}
            />;
            break;
    }

    let validationError = null;
    if(props.invalid && props.touched) {
    validationError = <p className={Styles['ValidationError']}>Please enter a valid {props.elementType}!</p>
    }

    return (
        <div className={Styles['Input']}>
            {/* <label className={Styles['Label']}>{props.value}</label> */}
            {inputElement}
            {validationError}
        </div>
    );
}

export default input;