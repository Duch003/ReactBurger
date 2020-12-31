import * as actions from './CheckoutActionTypes';
import { DeepReadonly } from 'utility-types';
import IIncomingOrder from '../../../../Types/IncomingOrder';
import { createReducer } from 'typesafe-actions';
import { CheckoutActions, PurchaseBurgerFailAction, PurchaseBurgerStartAction, PurchaseBurgerSuccessAction, PurchaseInitAction } from './CheckoutActionCreators';

interface IReduxContactDataState {
    readonly orders: DeepReadonly<IIncomingOrder[]>,
    readonly loading: boolean,
    readonly purchased: boolean
}

const initialState = (): Readonly<IReduxContactDataState> => {
    const output: IReduxContactDataState = {
        orders: [] as DeepReadonly<IIncomingOrder[]>,
        loading: false,
        purchased: false
    };
    return output;
}

const purchaseBurgerSuccessHandler = (state: IReduxContactDataState, action: PurchaseBurgerSuccessAction): IReduxContactDataState => {
    const newOrder = {
        ...action.payload.newOrder,
        id: action.payload.orderId
    }
    return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
    }
}

const purchaseBurgerFailHandler = (state: IReduxContactDataState, action: PurchaseBurgerFailAction): IReduxContactDataState => {
    return {
        ...state,
        loading: false
    }
}

const purchaseBurgerStartHandler = (state: IReduxContactDataState, action: PurchaseBurgerStartAction): IReduxContactDataState => {
    return {
        ...state,
        loading: true
    }
}

const purchaseInitHandler = (state: IReduxContactDataState, action: PurchaseInitAction): IReduxContactDataState => {
    return {
        ...state,
        purchased: false
    }
}

const contactDataReducer = createReducer<IReduxContactDataState, CheckoutActions>(initialState())
    .handleType(actions.PURCHASE_BURGER_SUCCESS, (state, action) => purchaseBurgerSuccessHandler(state, action))
    .handleType(actions.PURCHASE_BURGER_FAIL, (state, action) => purchaseBurgerFailHandler(state, action))
    .handleType(actions.PURCHASE_BURGER_START, (state, action) => purchaseBurgerStartHandler(state, action))
    .handleType(actions.PURCHASE_INIT, (state, action) => purchaseInitHandler(state, action));

export default contactDataReducer;