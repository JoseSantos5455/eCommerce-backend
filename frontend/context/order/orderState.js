import React, { useReducer } from 'react';
import axios from 'axios';

import OrderContext from './orderContext';
import OrderReducer from './orderReducer';

import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL
} from '../../types/orderConstants';

const OrderState = props => {
    const initialState = {
        order: [],
        loading: false,
        success: false,
        error: '',
    }

    // Crear dispatch y state
    const [state, dispatch] = useReducer(OrderReducer, initialState);

    //* Update User Profile
    const createOrder = async (order) => {
        try {
            dispatch({
                type: ORDER_CREATE_REQUEST
            })

            const { userInfo } = state;

            instanceApi.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;

            const { data } = await instanceApi.post(`api/orders`, order);

            dispatch({
                type: ORDER_CREATE_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: ORDER_CREATE_FAIL,
                payload: error.response && error.response.data.message 
                                ? error.response.data.message 
                                : error.message
            })
        }
    } 

    return (
        <OrderContext.Provider
            value={{
                order: state.order,
                loading: state.loading,
                success: state.success,
                error: state.error,
                createOrder,
            }}
        >
            {props.children}
        </OrderContext.Provider>
    )
}

export default OrderState;