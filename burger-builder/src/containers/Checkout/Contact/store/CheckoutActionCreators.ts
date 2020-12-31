import { Dispatch } from "redux";
import { localInstance } from "../../../../axios-orders";
import IIncomingOrder from "../../../../Types/IncomingOrder";
import * as CheckoutActionTypes from './CheckoutActionTypes';
import { action } from 'typesafe-actions';

export const purchaseBurgerSuccess = (orderId: number, orderData: IIncomingOrder) => {
    return action(CheckoutActionTypes.PURCHASE_BURGER_SUCCESS, {
        orderId,
        newOrder: orderData
    });
}

export const purchaseBurgerFail = (error: Error) => {
    return action(CheckoutActionTypes.PURCHASE_BURGER_FAIL, {
        error
    });
}

export const purchaseBurgerStart = () => {
    return action(CheckoutActionTypes.PURCHASE_BURGER_START, {});
}

export const purchaseInit = () => {
    return action(CheckoutActionTypes.PURCHASE_INIT, {})
}

export type PurchaseBurgerSuccessAction = ReturnType<typeof purchaseBurgerSuccess>;
export type PurchaseBurgerFailAction = ReturnType<typeof purchaseBurgerFail>;
export type PurchaseBurgerStartAction = ReturnType<typeof purchaseBurgerStart>;
export type PurchaseInitAction = ReturnType<typeof purchaseInit>;

export type CheckoutActions = PurchaseBurgerSuccessAction
    | PurchaseBurgerFailAction
    | PurchaseBurgerStartAction
    | PurchaseInitAction

export const purchaseBurger = (orderData: IIncomingOrder, token: string) => {
    return (dispatch: Dispatch) => {
        dispatch(purchaseBurgerStart());
        localInstance.post('?auth=' + token, orderData)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.id, orderData));
        }).catch((error: Error) => {
            dispatch(purchaseBurgerFail(error))
        });
    }
}

