import axios from '../../axios-orders';

import actions from './actionTypes';

const {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    SET_INGREDIENTS,
    FETCH_INGREDIENTS_FAILED,
} = actions;

export const addIngredient = (name) => {
    return {
        type: ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = (name) => {
    return {
        type: REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: FETCH_INGREDIENTS_FAILED, 
    };
}; 

export const initIngredients = () => {
    return dispatch => {
        axios.get( 'https://react-my-burger-b7702.firebaseio.com/ingredients.json' )
        .then(response => {
            dispatch(setIngredients(response.data));
        })
        .catch( error => {
            dispatch(fetchIngredientsFailed());
        });
    }
};