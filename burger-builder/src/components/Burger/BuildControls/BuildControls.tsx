import React from 'react';
import Styles from './BuildControls.module.css';
import BuildControl, { IBuildControlProps } from './BuildControl/BuildControl'
import { BurgerInnerIngridientName } from '../../../Types/BurgerInnerIngridientName';

const controls: IBuildControlProps[] = [
    { controlLabel: 'Salad', type: 'salad', added: () => {}},
    { controlLabel: 'Bacon', type: 'bacon', added: () => {} },
    { controlLabel: 'Cheese', type: 'cheese', added: () => {} },
    { controlLabel: 'Meat', type: 'meat', added: () => {} },
]

export interface IBuildControlsProps {
    ingrideintAddedHandler: (ingridientName: BurgerInnerIngridientName) => void
}

const buildControls:  React.FunctionComponent<IBuildControlsProps> = (props) => {
    return (
        <div className={Styles['BuildControls']}>
            {controls.map((control, index) => 
                <BuildControl 
                    key={control.controlLabel + index} 
                    {...control}
                    added={props.ingrideintAddedHandler}/>
            )}
        </div>
    );
}

export default buildControls;