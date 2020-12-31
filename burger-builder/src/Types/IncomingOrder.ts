import { BurgerInnerIngridientName } from "./BurgerInnerIngridientName";
import { BurgerInnerIngridientsDictionary } from "./BurgerInnerIngridientsDictionary";
import IOrderData from "./OrderData";

export default interface IIncomingOrder {
    ingridients: BurgerInnerIngridientsDictionary,
    price: number,
    orderData: IOrderData,
    userId: string
}