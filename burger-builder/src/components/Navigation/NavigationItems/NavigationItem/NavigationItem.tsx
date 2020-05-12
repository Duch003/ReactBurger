import React from 'react';
import Styles from './NavigationItem.module.css';

const navigationItem: React.FunctionComponent<{link: string, active: boolean}> = (props) => {
    return (
        <li className={Styles['NavigationItem']}>
            <a className={props.active ? Styles['active'] : undefined}
            href={props.link}>{props.children}</a>
        </li>
    );
}

export default navigationItem;