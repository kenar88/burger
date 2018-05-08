import actions from './actionTypes';
import axios from '../../axios-orders';

const {
    PURCHASE_BURGER_SUCCESS,
    PURCHASE_BURGER_FAIL,
    PURCHASE_BURGER_START,
    PURCHASE_INIT,
} = actions;

export const purchaseBurgerSuccess = (orderId, orderData) => {
    return {
        type: PURCHASE_BURGER_SUCCESS,
        orderData: orderData,
        id: orderId,
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: PURCHASE_BURGER_FAIL,
        error: error,
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: PURCHASE_BURGER_START,        
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
        .then( response => {
            console.log(response.data);
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
          })            
        .catch( error => {
            dispatch(purchaseBurgerFail(error))
          });
    }
}

export const purchaseInint = () => {
    return {
        type: PURCHASE_INIT,
    };
}