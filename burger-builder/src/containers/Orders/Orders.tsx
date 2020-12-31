import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import { localInstance } from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchOrders } from './store/OrdersActionCreators';
import { connect } from 'react-redux';
import { RootState } from '../../reduxSetup';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component<Props> {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {

        const orders = this.props.loading 
            ? (<Spinner/>)
            : this.props.orders.map((item, index) => {
                return <Order key={item.id} ingridients={item.ingridients} price={item.price} />
        });
        
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = (state: RootState, ownProps: {}) => {
    return {
        ...ownProps,
        loading: state.ordersReducer.loading,
        error: state.ordersReducer.error,
        orders: state.ordersReducer.orders,
        token: state.authReducer.token,
        userId: state.authReducer.userId
    } 
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({
        onFetchOrders: (token: string, userId: string) => fetchOrders(token, userId)
    }, dispatch)
}

type Props = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, localInstance));