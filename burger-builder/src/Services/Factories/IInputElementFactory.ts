import IInputElement from '../../Types/IInputElement';
import { OrderDeliveryMethod } from '../../Types/OrderDeliveryMethod';
import IValidationRuleSet from '../../Types/ValidationRuleSet';

export default class InputElementFactory {
    getTextInput(placeholderText?: string, rules?: IValidationRuleSet): IInputElement<string> {
        return {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: placeholderText ? placeholderText : ''
            },
            value: '',
            validation: {
                ...rules
            },
            valid: false,
            touched: false
        }
    }

    getEmailInput(placeholderText?: string, rules?: IValidationRuleSet): IInputElement<string> {
        return {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: placeholderText ? placeholderText : ''
            },
            value: '',
            validation: {
                ...rules
            },
            valid: false,
            touched: false
        }
    }

    getDeliveryMethodInput(defaultValue?: string): IInputElement<OrderDeliveryMethod> {
        return {
            elementType: 'select',
            elementConfig: {
                options: [
                    {
                        value: 'Fastest', 
                        displayValue: 'Fastest'
                    },
                    {
                        value: 'Cheapest', 
                        displayValue: 'Cheapest'
                    },
                ]
            },
            value: 'Fastest',
            valid: true,
            touched: false
        }
    }

    getPasswordInput(placeholderText?: string, rules?: IValidationRuleSet): IInputElement<string> {
        return {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: placeholderText ? placeholderText : ''
            },
            value: '',
            validation: {
                ...rules
            },
            valid: false,
            touched: false
        }
    }
}