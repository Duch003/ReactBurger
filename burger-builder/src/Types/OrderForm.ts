import IInputElement from './IInputElement';
import { OrderDeliveryMethod } from './OrderDeliveryMethod';

export default interface IOrderForm {
    name: IInputElement<string>
    street: IInputElement<string>,
    zipCode: IInputElement<string>,
    country: IInputElement<string>,
    email: IInputElement<string>,
    deliveryMethod: IInputElement<OrderDeliveryMethod> 
    [index: string]: IInputElement<any>
}