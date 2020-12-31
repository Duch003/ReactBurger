import React from 'react';
import Styles from './Button.module.css';

export interface IButonProps {
    clicked(event?: React.MouseEvent<HTMLButtonElement, MouseEvent>): void, 
    buttonType: 'Success' | 'Danger', 
    disabled: boolean
}

const button: React.FunctionComponent<IButonProps> = (props) => {
    return (
        <button className={Styles['Button'] + ' ' + Styles[props.buttonType]}
        disabled={props.disabled} 
        onClick={props.clicked}>{props.children}</button>
    );
}

export default button;