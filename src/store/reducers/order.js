import actions from '../actions/actionTypes';

const {
    PURCHASE_BURGER_SUCCESS,
    PURCHASE_BURGER_FAIL,
    PURCHASE_BURGER_START,
    PURCHASE_INIT,
} = actions;

const initialState = {
    loading: false,
    orders: [],
    purchased: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case PURCHASE_INIT:
            return {
                ...state,
                purchased: false,
            }
        case PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true,
            };
        case PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.id,
            };
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true,
            };
        case PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}

export default reducer;