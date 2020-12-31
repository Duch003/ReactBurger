import React from 'react';
import Styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

export interface IModalProps {
    show: boolean, 
    modalClosed(): void
}

class Modal extends React.Component<IModalProps> {

    
    shouldComponentUpdate(nextProps: React.PropsWithChildren<IModalProps>, nextState: {}) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render(){
        return (
            <React.Fragment>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div className={Styles['Modal']} style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                    {this.props.children}
                </div>
            </React.Fragment>
        );
    }
}

export default Modal;