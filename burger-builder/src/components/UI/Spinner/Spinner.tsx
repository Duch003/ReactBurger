import React from 'react';
import Styles from './Spinner.module.css';

const spinner: React.FunctionComponent = () => {
    return (
        <div className={Styles['Loader']}>Loading...</div>
    );
}

export default spinner;