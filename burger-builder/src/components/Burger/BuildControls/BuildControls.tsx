import React from 'react';
import Styles from './BuildControls.module.css';
import BuildControl, { IBuildControlProps } from './BuildControl/BuildControl'
import { BurgerInnerIngridientName } from '../../../Types/BurgerInnerIngridientName';
import { BurgerInnerIngridientsMap } from '../../../Types/BurgerInnerIngridientsMap';

const controls: IBuildControlProps[] = [
    { controlLabel: 'Salad', type: 'salad', added: () => {}, deducted: () => {}, isRemoveDisabled: false },
    { controlLabel: 'Bacon', type: 'bacon', added: () => {}, deducted: () => {}, isRemoveDisabled: false },
    { controlLabel: 'Cheese', type: 'cheese', added: () => {}, deducted: () => {}, isRemoveDisabled: false },
    { controlLabel: 'Meat', type: 'meat', added: () => {}, deducted: () => {}, isRemoveDisabled: false },
]

export interface IBuildControlsProps {
    ingrideintAddedHandler: (ingridientName: BurgerInnerIngridientName) => void,
    ingridientDeductedHandler: (ingridientName: BurgerInnerIngridientName) => void,
    ordered(): void,
    disabledInfo: BurgerInnerIngridientsMap,
    price: number,
    purchasable: boolean,
    isLoggedIn: boolean
}

const buildControls: React.FC<IBuildControlsProps> = (props) => {

    //const isOrderButtonDisabled = Object.values(props.disabledInfo).every(item => item);
    return (
        <div className={Styles['BuildControls']}>
            <p>Current Price: <strong>{props.price.toFixed(2)} zł.</strong></p>
            {controls.map((control, index) => 
                <BuildControl 
                    key={control.controlLabel + index} 
                    {...control}
                    added={props.ingrideintAddedHandler}
                    deducted={props.ingridientDeductedHandler}
                    isRemoveDisabled={props.disabledInfo[control.type]}/>
            )}
            <button onClick={() => props.ordered()} 
                disabled={!props.purchasable} 
                className={Styles['OrderButton']}>
                    {props.isLoggedIn ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
            </button>
        </div>
    );
}

export default buildControls;