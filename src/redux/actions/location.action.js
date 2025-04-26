import {
    GET_LOCATIONS_REQUEST,
    GET_LOCATIONS_SUCCESS,
    GET_LOCATIONS_ERROR,
    GET_SHOPIFY_LOCATIONS_REQUEST,
    GET_SHOPIFY_LOCATIONS_SUCCESS,
    GET_SHOPIFY_LOCATIONS_ERROR,
} from '../types/types';
import axios from 'axios';


export const getLocationsSquare = (username) => (dispatch) => {
    dispatch({ type: GET_LOCATIONS_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'GET',
        url: `getLocations?username=${username}`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {  
            dispatch({
                type: GET_LOCATIONS_SUCCESS,
                payload: response.data
            });
            return response.data
        })
        .catch((error) => {
            return dispatch({
                type: GET_LOCATIONS_ERROR,
                payload: error.response,
            });
        });
}

export const getLocationsShopify = (username) => (dispatch) => {
    dispatch({ type: GET_SHOPIFY_LOCATIONS_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'GET',
        url: `getShopifyLocations?username=${username}`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {  
            dispatch({
                type: GET_SHOPIFY_LOCATIONS_SUCCESS,
                payload: response.data
            });
            return response.data
        })
        .catch((error) => {
            return dispatch({
                type: GET_SHOPIFY_LOCATIONS_ERROR,
                payload: error.response,
            });
        });
}