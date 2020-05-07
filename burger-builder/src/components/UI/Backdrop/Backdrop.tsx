import React from 'react';
import Styles from './Backdrop.module.css';

const backdrop: React.FunctionComponent<{show: boolean, clicked(): void}> = (props) => {
    return (
        props.show ? <div onClick={props.clicked} className={Styles['Backdrop']}></div> : null
    );
}

export default backdrop;