import React from 'react';
import Styles from './BuildControl.module.css';
import { BurgerInnerIngridientName } from '../../../../Types/BurgerInnerIngridientName';

export interface IBuildControlProps {
    controlLabel: string,
    type: BurgerInnerIngridientName,
    added: (ingridientName: BurgerInnerIngridientName) => void,
    deducted: (ingridientName: BurgerInnerIngridientName) => void,
    isRemoveDisabled: boolean
}

const buildControl: React.FunctionComponent<IBuildControlProps> = (props) => {
    return (
        <div className={Styles['BuildControl']}>
            <div className={Styles['Label']}>{props.controlLabel}</div>
            <button onClick={() => props.added(props.type)} className={'More'}>More</button>
            <button disabled={props.isRemoveDisabled} onClick={() => props.deducted(props.type)} className={'Less'}>Less</button>
        </div>
    );
}

export default buildControl;