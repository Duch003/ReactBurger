import React from 'react';
import Styles from './Button.module.css';

const button: React.FunctionComponent<{clicked(event?: React.MouseEvent<HTMLButtonElement, MouseEvent>): void, buttonType: 'Success' | 'Danger'}> = (props) => {
    return (
        <button className={Styles['Button'] + ' ' + Styles[props.buttonType]} 
        onClick={props.clicked}>{props.children}</button>
    );
}

export default button;