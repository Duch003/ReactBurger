import * as actions from './BurgerBuilderActionTypes';
import { INGRIDIENT_PRICES, INITIAL_INGRIDIENTS } from './BurgerBuilderDefaults';
import { createReducer } from 'typesafe-actions';
import { AddIngridientAction, BurgerBuilderActions, ComputeTotalPrice, 
    FetchIngridientsFailed, FetchPriceTableFailed, RemoveIngridient, 
    SetBasicIngridients, SetPriceTable } from './BurgerBuilderActionsCreators';
import { BurgerInnerIngridientsDictionary } from '../../../Types/BurgerInnerIngridientsDictionary';

export interface IReduxBurgerBuilderState {
    readonly ingridients: BurgerInnerIngridientsDictionary,
    readonly totalPrice: number,
    readonly priceTable: BurgerInnerIngridientsDictionary,
    readonly ingridientsFetchError: boolean,
    readonly pricesFetchError: boolean,
    readonly buildingBurger: boolean
}

const initialState = () : IReduxBurgerBuilderState =>  {
    let output = {
        ingridients: INITIAL_INGRIDIENTS,
        priceTable: INGRIDIENT_PRICES,
        totalPrice: 0,
        ingridientsFetchError: true,
        pricesFetchError: true,
        buildingBurger: false
    };
    return output;
}

const addIngridientHandler = (state: IReduxBurgerBuilderState, action: AddIngridientAction): IReduxBurgerBuilderState => {
    return {
        ...state,
        ingridients: {
            ...state.ingridients,
            [action.payload.ingridientName]: state.ingridients[action.payload.ingridientName] + 1
        },
        priceTable: {
            ...state.priceTable
        },
        totalPrice: state.totalPrice + state.priceTable[action.payload.ingridientName],
        buildingBurger: true
    };
}

const removeIngridientHandler = (state: IReduxBurgerBuilderState, action: RemoveIngridient): IReduxBurgerBuilderState => {
    return {
        ...state,
        ingridients: {
            ...state.ingridients,
            [action.payload.ingridientName]: state.ingridients[action.payload.ingridientName] - 1
        },
        priceTable: {
            ...state.priceTable
        },
        totalPrice: state.totalPrice - state.priceTable[action.payload.ingridientName],
        buildingBurger: true
    };
}

const computeTotalPriceHandler = (state: IReduxBurgerBuilderState, action: ComputeTotalPrice): IReduxBurgerBuilderState => {
    const ingridients = Object.keys(state.priceTable);
    let total = 0;
    ingridients.forEach((ingridientName, index) => {
        total += (state.ingridients[ingridientName] * state.priceTable[ingridientName]);
    });
    return {
        ...state,
        ingridients: {
            ...state.ingridients
        },
        priceTable: {
            ...state.priceTable
        },
        totalPrice: total
    };
}

const setBasicIngridientsHandler = (state: IReduxBurgerBuilderState, action: SetBasicIngridients): IReduxBurgerBuilderState => {
    return {
        ...state,
        ingridients: action.payload.ingridients,
        priceTable: {
            ...state.priceTable
        },
        ingridientsFetchError: false,
        buildingBurger: false
    };
}

const setPriceTableHandler = (state: IReduxBurgerBuilderState, action: SetPriceTable): IReduxBurgerBuilderState => {
    return {
        ...state,
        ingridients: {
            ...state.ingridients,
        },
        priceTable: action.payload.prices,
        pricesFetchError: false
    };
}

const fetchIngridientsFailedHandler = (state: IReduxBurgerBuilderState, action: FetchIngridientsFailed): IReduxBurgerBuilderState => {
    return {
        ...state,
        ingridients: {
            ...state.ingridients
        },
        priceTable: {
            ...state.priceTable
        },
        ingridientsFetchError: true
    }
}

const fetchPriceTableFailedHandler = (state: IReduxBurgerBuilderState, action: FetchPriceTableFailed): IReduxBurgerBuilderState => {
    return {
        ...state,
        ingridients: {
            ...state.ingridients
        },
        priceTable: {
            ...state.priceTable
        },
        pricesFetchError: true
    }
}

const burgerBuilderReducer = createReducer<IReduxBurgerBuilderState, BurgerBuilderActions>(initialState())
    .handleType(actions.ADD_INGRIDIENT, (state, action) => addIngridientHandler(state, action))
    .handleType(actions.REMOVE_INGRIDIENT, (state, action) => removeIngridientHandler(state, action))
    .handleType(actions.COMPUTE_TOTAL_PRICE, (state, action) => computeTotalPriceHandler(state, action))
    .handleType(actions.SET_BASIC_INGRIDIENTS, (state, action) => setBasicIngridientsHandler(state, action))
    .handleType(actions.SET_PRICE_TABLE, (state, action) => setPriceTableHandler(state, action))
    .handleType(actions.FETCH_INGRIDIENTS_FAILED, (state, action) => fetchIngridientsFailedHandler(state, action))
    .handleType(actions.FETCH_PRICE_TABLE_FAILED, (state, action) => fetchPriceTableFailedHandler(state, action));

export default burgerBuilderReducer;