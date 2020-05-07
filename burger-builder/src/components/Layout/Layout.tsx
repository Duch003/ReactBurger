import React from 'react';

import Styles from './Layout.module.css';

import Toolbar from './../Navigation/Toolbar/Toolbar';

export interface ILayoutProps {

}

const layout: React.FunctionComponent<ILayoutProps> = (props) => {
    console.log(props);
    return (
        <React.Fragment>
            <div>
                <Toolbar/>, SideDrawer, Backdrop
            </div>
            <main className={Styles['Content']}>
                {props.children}
            </main>
        </React.Fragment>
    );
}

export default layout;