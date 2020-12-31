import { OrderDeliveryMethod } from "./OrderDeliveryMethod";

export default interface IOrderData {
    name: string
    street: string,
    zipCode: string,
    country: string,
    email: string,
    deliveryMethod: OrderDeliveryMethod 
}