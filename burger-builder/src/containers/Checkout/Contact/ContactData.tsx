import React, { Component } from 'react';
import Styles from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import { BurgerInnerIngridientsDictionary } from '../../../Types/BurgerInnerIngridientsDictionary';
import axios, { localInstance } from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { RouteComponentProps } from 'react-router-dom';

interface IContactDataState {
    name: string | null,
    email: string | null,
    address: {
        street: string | null,
        postalCode: string | null
    },
    loading: boolean
}

interface IContactDataProps {
    ingridients: BurgerInnerIngridientsDictionary,
    price: number,
    history: any
}

class ContactData extends Component<IContactDataProps, IContactDataState> {

    state = {
        name: null,
        email: null,
        address: {
            street: null,
            postalCode: null
        },
        loading: false
    }

    orderHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingridients: this.props.ingridients,
            price: this.props.price,
            customer: {
                name: 'Tomasz Mankin ' + (new Date().toUTCString()),
                address: {
                    street: 'Teststreet 1',
                    zipcode: '12345',
                    country: 'Germany'
                },
                email: 'test@test.com',
            },
            deliveryMethod: 'fastest',
        }
        // axios.post('/orders.json', order).then(response => {
        //     console.log(response);
        // }).catch(error => {
        //     console.log(error);
        // });
        localInstance.post('', order).then(response => {
            console.log(response);
            this.props.history.push('/');
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            this.setState({loading: false});
        });
    }

    render() {
        let form = this.state.loading 
            ? <Spinner/>
            : (<form>
                <input className={Styles["Input"]} type="text" name="name" placeholder="Your Name"/>
                <input className={Styles["Input"]} type="email" name="email" placeholder="Your Email"/>
                <input className={Styles["Input"]} type="text" name="street" placeholder="Street"/>
                <input className={Styles["Input"]} type="text" name="postalCode" placeholder="Postal Code"/>
                <Button buttonType="Success" clicked={this.orderHandler}>Order</Button>
            </form>);
        return (
            <div className={Styles['ContactData']}>
                <h4>Enter your contact data:</h4>
                {form}
            </div>
        );
    }

}

export default ContactData;