import { BurgerInnerIngridientsDictionary } from "./BurgerInnerIngridientsDictionary";
import ICustomer from "./Customer";
import { OrderDeliveryMethod } from "./OrderDeliveryMethod";

export default interface IOrder {
    id: number,
    deliveryMethod: OrderDeliveryMethod,
    price: number,
    ingridients: BurgerInnerIngridientsDictionary,
    customer: ICustomer
 }