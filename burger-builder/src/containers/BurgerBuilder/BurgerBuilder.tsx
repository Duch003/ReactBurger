import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import { BurgerInnerIngridientName } from '../../Types/BurgerInnerIngridientName'
import { BurgerInnerIngridientsDictionary } from './../../Types/BurgerInnerIngridientsDictionary';
import { BurgerInnerIngridientsMap } from './../../Types/BurgerInnerIngridientsMap'
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import { localInstance } from '../../axios-orders';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import { RouteComponentProps } from "react-router-dom";
import { connect } from 'react-redux';
import * as burgerBuilderActions from './store/BurgerBuilderActionsCreators';
import { bindActionCreators, Dispatch } from "redux";
import { RootState } from "../../reduxSetup";
import * as checkoutActions from '../Checkout/Contact/store/CheckoutActionCreators'
import { setAuthRedirectPath } from "../Auth/store/AuthActionCreators";

interface IBurgerBuilderState {
    inPurchaseMode: boolean,
}


class BurgerBuilder extends Component<Props, IBurgerBuilderState> {

    state = {
        inPurchaseMode: false,
    }

    purchaseHandler = () => {
        if(this.props.isLoggedIn) {
            this.setState({ inPurchaseMode: true })
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    isPurchasable(ingridients: BurgerInnerIngridientsDictionary): boolean {
        const output = Object.values(ingridients)
            .some(value => value > 0);
        return output;
    }

    purchaseCancelHandler = () => {
        this.setState({ inPurchaseMode: false });
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    componentDidMount() {
        this.props.onInitIngridients();
        this.props.onInitPrices();
    }

    render() {
        const disabledInfo = {
            ...this.props.burgerBuilderReducer.ingridients
        };

        const map: BurgerInnerIngridientsMap = {
            'salad': false,
            'bacon': false,
            'cheese': false,
            'meat': false
        };

        Object.keys(disabledInfo).forEach(key => {
            const name = key as BurgerInnerIngridientName;
            if (!name) {
                return;
            }
            map[name] = disabledInfo[name] <= 0;
        });

        const modalContent = (<OrderSummary cancelClickHandler={this.purchaseCancelHandler}
            submitClickHandler={this.purchaseContinueHandler}
            ingridients={this.props.burgerBuilderReducer.ingridients}
            price={this.props.burgerBuilderReducer.totalPrice} />);

        let burger = this.props.burgerBuilderReducer.pricesFetchError || this.props.burgerBuilderReducer.ingridientsFetchError ? <p>Ingridients can't be loaded.</p> : <Spinner/>;
        if(!this.props.burgerBuilderReducer.ingridientsFetchError && !this.props.burgerBuilderReducer.pricesFetchError){
            burger = (
                <React.Fragment>
                    <Burger ingridients={this.props.burgerBuilderReducer.ingridients} />
                    <BuildControls
                        isLoggedIn={this.props.isLoggedIn}
                        price={this.props.burgerBuilderReducer.totalPrice}
                        ingrideintAddedHandler={this.props.onIngridientAdded}
                        ingridientDeductedHandler={this.props.onIngridientRemoved}
                        disabledInfo={map}
                        ordered={this.purchaseHandler}
                        purchasable={this.isPurchasable(this.props.burgerBuilderReducer.ingridients)} />
                </React.Fragment>
            );
        };

        return (
            <React.Fragment>
                <Modal show={this.state.inPurchaseMode} modalClosed={this.purchaseCancelHandler}>
                    {modalContent}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps) => {
    return {
        ...state,
        ...ownProps,
        isLoggedIn: state.authReducer.token !== ''
    }
}

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators({
        onIngridientAdded: (name: BurgerInnerIngridientName) => burgerBuilderActions.addIngridient(name),
        onIngridientRemoved: (name: BurgerInnerIngridientName) => burgerBuilderActions.removeIngridient(name),
        setPrices: (prices: BurgerInnerIngridientsDictionary) => burgerBuilderActions.setPriceTable(prices),
        setBasicIngridients: (ingridients: BurgerInnerIngridientsDictionary) => burgerBuilderActions.setBasicIngridients(ingridients),
        computeTotalPrice: () => burgerBuilderActions.computeTotalPrice(),
        onInitIngridients: () => burgerBuilderActions.initBasicIngridients(),
        onInitPrices: () => burgerBuilderActions.initPriceTable(),
        onInitPurchase: () => checkoutActions.purchaseInit(),
        onSetAuthRedirectPath: (path: string) => setAuthRedirectPath(path)
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, localInstance));