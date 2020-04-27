import React from 'react';
import Styles from './BuildControl.module.css';
import { BurgerIngridientName } from '../../../../Types/BurgerIngridientName';
import { BurgerInnerIngridientName } from '../../../../Types/BurgerInnerIngridientName';

export interface IBuildControlProps {
    controlLabel: string
    type: BurgerInnerIngridientName,
    added: (ingridientName: BurgerInnerIngridientName) => void
}

const buildControl: React.FunctionComponent<IBuildControlProps> = (props) => {
    return (
        <div className={Styles['BuildControl']}>
            <div className={Styles['Label']}>{props.controlLabel}</div>
            <button onClick={() => props.added(props.type)} className={'More'}>More</button>
            <button className={'Less'}>Less</button>
        </div>
    );
}

export default buildControl;