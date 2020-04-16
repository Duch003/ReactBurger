import React from 'react';

export interface ILayoutProps {

}

const layout: React.FunctionComponent<ILayoutProps> = (props) => {
    console.log(props);
    return (
        <React.Fragment>
            <div>
                Toolbar, SideDrawer, Backdrop
            </div>
            <main>
                {props.children}
            </main>
        </React.Fragment>
    );
}

export default layout;