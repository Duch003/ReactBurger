import React from 'react';
import Styles from './Logo.module.css';
import Logo from './../../assets/images/burger-logo.png';

const logo: React.FunctionComponent<{}> = (props) => {
    return (
        <div className={Styles['Logo']}>
            <img src={Logo} alt='MyBurger'/>
        </div>
    );
}

export default logo;