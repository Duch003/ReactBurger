import React, { Component } from 'react';
import Styles from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import { localInstance } from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import OrderForm from '../../../Types/OrderForm';
import IValidationRuleSet from '../../../Types/ValidationRuleSet';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as contactDataActions from './store/CheckoutActionCreators'
import IIncomingOrder from '../../../Types/IncomingOrder';
import { RootState } from '../../../reduxSetup';
import InputElementFactory from '../../../Services/Factories/IInputElementFactory';
import { bindActionCreators, Dispatch } from 'redux';

interface IContactDataState {
    orderForm: OrderForm,
}
class ContactData extends Component<Props, IContactDataState> {

    private _inputElementFactory: InputElementFactory;

    constructor(props: Props) {
        super(props);
        this._inputElementFactory = new InputElementFactory();
        this.state = {
            orderForm: { 
                name: this._inputElementFactory.getTextInput('Name', {required: true}),
                street: this._inputElementFactory.getTextInput('Street', {required: true}),
                zipCode: this._inputElementFactory.getTextInput('Zip Code', {required: true, minLength: 5, maxLength: 5}),
                country: this._inputElementFactory.getTextInput('Country', {required: true}),
                email: this._inputElementFactory.getEmailInput('Email', {required: true}),
                deliveryMethod: this._inputElementFactory.getDeliveryMethodInput(),
            }
        }
    }
    orderHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        const formData = {
            name: this.state.orderForm["name"].value,
            street: this.state.orderForm["street"].value,
            zipCode: this.state.orderForm["zipCode"].value,
            country: this.state.orderForm["country"].value,
            email: this.state.orderForm["email"].value,
            deliveryMethod: this.state.orderForm["deliveryMethod"].value,
        };

        const order: IIncomingOrder = {
            ingridients: this.props.ingridients,
            price: this.props.totalPrice,
            orderData: formData,
            userId: this.props.userId
        };

        this.props.onOrderBurger(order, this.props.token)
    }

    checkValidity = <T extends object>(value: T, rules?: IValidationRuleSet) => {
        if(rules === undefined) {
            return true;
        }

        let isValid = true;

        if(rules.required) {
            isValid = isValid && value?.toString()?.trim() !== '';
        }

        if(rules.minLength) {
            isValid = isValid && (value?.toString()?.length as number) >= rules.minLength;
        }

        if(rules.maxLength) {
            isValid = isValid && (value?.toString()?.length as number) <= rules.maxLength;
        }

        return isValid;
    }

    inputChangesHandler = (event: React.ChangeEvent<HTMLInputElement>, inputIdentifier: string) => {
        const updatedForm = {
            ...this.state.orderForm
        };

        const updatedFormElement = {
            ...updatedForm[inputIdentifier]
        };

        updatedFormElement.touched = true;
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedForm});
    }

    isFormValid = (): boolean => {
        for(let control in this.state.orderForm) {
            if(!this.state.orderForm[control].valid) {
                return false;
            }
        }

        return true;
    }

    render() {
        let form = this.props.loading 
            ? <Spinner/>
            : (<form onSubmit={(event) => this.orderHandler}>
                {Object.keys(this.state.orderForm).map((key, index) => {
                    return <Input key={key} 
                        touched={this.state.orderForm[key].touched}
                        shouldValidate={this.state.orderForm[key].validation !== undefined}
                        invalid={!this.state.orderForm[key].valid}
                        changed={(event: React.ChangeEvent<HTMLInputElement>) => this.inputChangesHandler(event, key)}
                        elementType={this.state.orderForm[key].elementType}
                        elementConfig={this.state.orderForm[key].elementConfig}
                        value={this.state.orderForm[key].value}
                    />
                })}
                <Button buttonType="Success" disabled={!this.isFormValid()} clicked={this.orderHandler}>Order</Button>
            </form>);
        return (
            <div className={Styles['ContactData']}>
                <h4>Enter your contact data:</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state: RootState, ownProps: { history: any }) => {
    return {
        ingridients: state.burgerBuilderReducer.ingridients,
        totalPrice: state.burgerBuilderReducer.totalPrice,
        loading: state.contactDataReducer.loading,
        ...ownProps,
        token: state.authReducer.token,
        userId: state.authReducer.userId
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({
        onOrderBurger: (orderData: IIncomingOrder, token: string) => contactDataActions.purchaseBurger(orderData, token)
    }, dispatch)
}

type Props = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, localInstance));