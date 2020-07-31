import React, { PureComponent, Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import { BurgerInnerIngridientName } from '../../Types/BurgerInnerIngridientName'
import { BurgerInnerIngridientsDictionary } from './../../Types/BurgerInnerIngridientsDictionary';
import { BurgerInnerIngridientsMap } from './../../Types/BurgerInnerIngridientsMap'
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import axios, { localInstance } from '../../axios-orders';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import { RouteComponentProps } from "react-router-dom";

export interface IBurgerBuilderProps extends RouteComponentProps {

}

interface IBurgerBuilderState {
    ingridients: BurgerInnerIngridientsDictionary,
    totalPrice: number,
    purchasable: boolean,
    inPurchaseMode: boolean,
    loading: boolean,
    ingridientsFetched: boolean,
    error: Error | null
}

const INGRIDIENT_PRICES: BurgerInnerIngridientsDictionary = {
    "bacon": 1,
    "cheese": 1,
    "meat": 1.5,
    "salad": 0.5
}

class BurgerBuilder extends Component<IBurgerBuilderProps, IBurgerBuilderState> {

    state = {
        ingridients: {
            'salad': 0,
            'bacon': 0,
            'cheese': 0,
            'meat': 0
        },
        totalPrice: 4,
        purchasable: false,
        inPurchaseMode: false,
        loading: false,
        ingridientsFetched: false,
        error: null
    }

    purchaseHandler = () => {
        this.setState({ inPurchaseMode: true });
    }

    addIngridientHandler = (type: BurgerInnerIngridientName) => {
        const oldCount = this.state.ingridients[type];
        const updatedCount = oldCount + 1;
        const updatedIngridients = {
            ...this.state.ingridients
        };
        updatedIngridients[type] = updatedCount;
        const priceAddition = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ ingridients: updatedIngridients, totalPrice: newPrice });
        this.updatePurchaseState(updatedIngridients);
    }

    updatePurchaseState(ingridients: BurgerInnerIngridientsDictionary) {
        const sum = Object.values(ingridients)
            .some(value => value > 0);
        this.setState({ purchasable: sum });
    }

    removeIngridientHandler = (type: BurgerInnerIngridientName) => {
        const oldCount = this.state.ingridients[type];
        if (oldCount <= 0) {
            alert("You don't have any " + type + " in your burger!");
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngridients = {
            ...this.state.ingridients
        };
        updatedIngridients[type] = updatedCount;
        const priceDeduction = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ ingridients: updatedIngridients, totalPrice: newPrice });
        this.updatePurchaseState(updatedIngridients);
    }

    purchaseCancelHandler = () => {
        this.setState({ inPurchaseMode: false });
    }

    purchaseContinueHandler = () => {
        //alert('Continue!');
        
        const queryParams = [];
        for(let ingridient of Object.entries(this.state.ingridients)) {
            queryParams.push(encodeURIComponent(ingridient[0]) + '=' + encodeURIComponent(ingridient[1]))
        }
        queryParams.push('price=' + this.state.totalPrice);
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParams.join('&')
        });
    }

    componentDidMount() {
        // axios.get('https://react-my-burger-5403f.firebaseio.com/ingridients.json')
        //     .then(response => {
        //         this.setState({ ingridients: response.data, ingridientsFetched: true });
        //     }).catch(error => {
        //         this.setState({error: error});
        //     });
        console.log(this.props)
        localInstance.get('initialingridients')
            .then(response => {
                const mappedData = response.data as BurgerInnerIngridientsDictionary;

                let newTotal = mappedData.bacon * INGRIDIENT_PRICES.bacon 
                    + mappedData.cheese * INGRIDIENT_PRICES.cheese
                    + mappedData.salad * INGRIDIENT_PRICES.salad
                    + mappedData.meat * INGRIDIENT_PRICES.meat;

                this.setState({ ingridients: response.data, ingridientsFetched: true, totalPrice: newTotal});
                this.updatePurchaseState(mappedData) 
            }).catch(error => {
                this.setState({error: error});
            });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingridients
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

        const modalContent = this.state.loading 
            ? (<Spinner/>) 
            : (<OrderSummary cancelClickHandler={this.purchaseCancelHandler}
                submitClickHandler={this.purchaseContinueHandler}
                ingridients={this.state.ingridients}
                price={this.state.totalPrice} />);

        let burger = this.state.error ? <p>Ingridient's can't be loaded.</p> : <Spinner/>;
        if(this.state.ingridientsFetched){
            burger = (
                <React.Fragment>
                    <Burger ingridients={this.state.ingridients} />
                    <BuildControls
                        price={this.state.totalPrice}
                        ingrideintAddedHandler={this.addIngridientHandler}
                        ingridientDeductedHandler={this.removeIngridientHandler}
                        disabledInfo={map}
                        ordered={this.purchaseHandler}
                        purchasable={this.state.purchasable} />
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

export default withErrorHandler(BurgerBuilder, localInstance);