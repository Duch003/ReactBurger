import { combineReducers } from "redux";
import contactDataReducer from './containers/Checkout/Contact/store/CheckoutReducer'
import burgerBuilderReducer from './containers/BurgerBuilder/store/BurgerBuilderReducer';
import ordersReducer from './containers/Orders/store/OrdersReducer';
import { OrdersActions } from "./containers/Orders/store/OrdersActionCreators";
import { CheckoutActions } from "./containers/Checkout/Contact/store/CheckoutActionCreators";
import { BurgerBuilderActions } from "./containers/BurgerBuilder/store/BurgerBuilderActionsCreators";
import authReducer from './containers/Auth/store/AuthReducer';
import { AuthActions } from './containers/Auth/store/AuthActionCreators'

const reducers = combineReducers({
    contactDataReducer,
    burgerBuilderReducer,
    ordersReducer,
    authReducer
})

export default reducers;

export type RootState = ReturnType<typeof reducers>;
export type RootActions = OrdersActions | CheckoutActions | BurgerBuilderActions | AuthActions;