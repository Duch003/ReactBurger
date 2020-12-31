import * as actions from './OrdersActionTypes';
import { createReducer } from 'typesafe-actions';
import IOrder from '../../../Types/Order';
import { DeepReadonly } from 'utility-types';
import { FetchOrdersFailAction, FetchOrdersInitAction, FetchOrdersSuccessAction, OrdersActions } from './OrdersActionCreators';

export interface IOrdersState {
    readonly loading: boolean,
    readonly orders: DeepReadonly<IOrder[]>,
    readonly error: Error | null
}

const initialState = (): IOrdersState => {
    return {
        loading: false,
        orders: [],
        error: null
    }
}

const fetchOrdersSuccessHandler = (state: IOrdersState, action: FetchOrdersSuccessAction): IOrdersState => {
    return {
        ...state,
        loading: false,
        orders: action.payload.orders,
    }
}

const fetchOrdersFailHandler = (state: IOrdersState, action: FetchOrdersFailAction): IOrdersState => {
    return {
        ...state,
        loading: false,
        error: action.payload.error,
        orders: []
    }
}

const fetchOrdersInitHandler = (state: IOrdersState, action: FetchOrdersInitAction): IOrdersState => {
    return {
        loading: true,
        orders: [],
        error: null
    }
}

const ordersReducer = createReducer<IOrdersState, OrdersActions>(initialState())
    .handleType(actions.FETCH_ORDERS_SUCCESS, (state, action) => fetchOrdersSuccessHandler(state, action))
    .handleType(actions.FETCH_ORDERS_FAIL, (state, action) => fetchOrdersFailHandler(state, action))
    .handleType(actions.FETCH_ORDERS_INIT, (state, action) => fetchOrdersInitHandler(state, action));

export default ordersReducer;