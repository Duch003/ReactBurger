import React, { ReactElement } from 'react';
import Styles from './Burger.module.css';
import BurgerIngridient, { IBurgerIngridientProps } from './BurgerIngridient/BurgerIngridient';
import { BurgerIngridientsDictionary } from '../../Types/BurgerIngridientsDictionary';
import { BurgerIngridientName } from '../../Types/BurgerIngridientName';

export interface IBurgerProps {
    ingridients: BurgerIngridientsDictionary
}

const burger: React.FunctionComponent<IBurgerProps> = props => {
    const transformedIngridients = Object
        .keys(props.ingridients)
        .map(ingridientKey => {
            return [...Array<ReactElement>(props.ingridients[ingridientKey as BurgerIngridientName])]
                .map((_, index) => {
                    const output = <BurgerIngridient key={ingridientKey + index} type={ingridientKey as BurgerIngridientName}/>;
                    return output;
                }
                    
            );
        });

    return (
        <div className={Styles['Burger']}>
            <BurgerIngridient type='bread-top'></BurgerIngridient>
            {transformedIngridients}
            <BurgerIngridient type='bread-bottom'></BurgerIngridient>
        </div>
    );
}

export default burger;