import * as actionTypes from './OrdersActionTypes';
import { localInstance } from '../../../axios-orders';
import IOrder from '../../../Types/Order';
import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';

export const fetchOrdersSuccess = (orders: IOrder[]) => {
    return action(actionTypes.FETCH_ORDERS_SUCCESS, {
        orders: orders
    });
}

export const fetchOrdersFail = (error: Error) => {
    return action(actionTypes.FETCH_ORDERS_FAIL, {
        error: error
    });
}

export const fetchOrdersInit = () => {
    return action(actionTypes.FETCH_ORDERS_INIT, {});
}

export type FetchOrdersSuccessAction = ReturnType<typeof fetchOrdersSuccess>;
export type FetchOrdersFailAction = ReturnType<typeof fetchOrdersFail> ;
export type FetchOrdersInitAction = ReturnType<typeof fetchOrdersInit>;

export type OrdersActions = FetchOrdersSuccessAction
    | FetchOrdersFailAction
    | FetchOrdersInitAction;

export const fetchOrders = (token: string, userId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(fetchOrdersInit());
        const queryParams = '?auth=' + token + '&userId=' + userId
        localInstance.get<IOrder[]>('orders' + queryParams)
            .then(response => {
                dispatch(fetchOrdersSuccess(response.data));
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
            });
    }
}