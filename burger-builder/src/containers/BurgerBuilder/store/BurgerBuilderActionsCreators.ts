import { BurgerInnerIngridientName } from '../../../Types/BurgerInnerIngridientName';
import { BurgerInnerIngridientsDictionary } from '../../../Types/BurgerInnerIngridientsDictionary';
import { localInstance } from '../../../axios-orders';
import * as actionTypes from './BurgerBuilderActionTypes'
import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';
import { IReduxBurgerBuilderState } from './BurgerBuilderReducer';


export const addIngridient = (name: BurgerInnerIngridientName) => {
    return action(actionTypes.ADD_INGRIDIENT, {
        ingridientName: name
    });
}

export const removeIngridient = (name: BurgerInnerIngridientName) => {
    return action(actionTypes.REMOVE_INGRIDIENT, {
        ingridientName: name,
    });
}

export const setBasicIngridients = (ingridients: BurgerInnerIngridientsDictionary) => {
    return action(actionTypes.SET_BASIC_INGRIDIENTS, {
        ingridients: ingridients,
    });
}

export const setPriceTable = (prices: BurgerInnerIngridientsDictionary)  => {
    return action(actionTypes.SET_PRICE_TABLE,{
        prices: prices,
    });
}

export const computeTotalPrice = () => {
    return action(actionTypes.COMPUTE_TOTAL_PRICE, {});
}

export const fetchIngridientsFailed = (error: Error) => {
    return action(actionTypes.FETCH_INGRIDIENTS_FAILED, {
        error: error
    });
}

export const fetchPriceTableFailed = (error: Error) => {
    return action(actionTypes.FETCH_PRICE_TABLE_FAILED, {
        error: error
    });
}

export type AddIngridientAction = ReturnType<typeof addIngridient>;
export type RemoveIngridient = ReturnType<typeof removeIngridient>;
export type SetBasicIngridients = ReturnType<typeof setBasicIngridients>;
export type SetPriceTable = ReturnType<typeof setPriceTable>;
export type ComputeTotalPrice = ReturnType<typeof computeTotalPrice>;
export type FetchIngridientsFailed = ReturnType<typeof fetchIngridientsFailed>;
export type FetchPriceTableFailed = ReturnType<typeof fetchPriceTableFailed>;

export type BurgerBuilderActions = AddIngridientAction
    | RemoveIngridient
    | SetBasicIngridients
    | SetPriceTable
    | ComputeTotalPrice
    | FetchIngridientsFailed
    | FetchPriceTableFailed;

export const initBasicIngridients = () => {
    return (dispatch: Dispatch, getState: () => IReduxBurgerBuilderState) => {
        localInstance.get<BurgerInnerIngridientsDictionary>('initialingridients')
        .then(response => {
            dispatch(setBasicIngridients(response.data));
        }).catch(error => {
            dispatch(fetchIngridientsFailed(error));
        }).finally(() => {
            const state = getState();
            if(!state.ingridientsFetchError && !state.pricesFetchError) {
                dispatch(computeTotalPrice());
            }
        });
    }
}

export const initPriceTable = () => {
    return (dispatch: Dispatch, getState: () => IReduxBurgerBuilderState) => {
        localInstance.get<BurgerInnerIngridientsDictionary>('pricetable')
        .then(response => {
            dispatch(setPriceTable(response.data));
        }).catch(error => {
            dispatch(fetchPriceTableFailed(error));
        }).finally(() => {
            const state = getState();
            if(!state.ingridientsFetchError && !state.pricesFetchError) {
                dispatch(computeTotalPrice());
            }
        });
    }
}