import React from 'react';

export interface IAuxiliaryProps {

}

const auxiliary: React.FunctionComponent<IAuxiliaryProps> = (props) => {
    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    )
}

export default auxiliary;