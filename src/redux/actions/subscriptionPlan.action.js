import {
    GET_SUBSCRIPTION_PLAN_REQUEST,
    GET_SUBSCRIPTION_PLAN_SUCCESS,
    GET_SUBSCRIPTION_PLAN_ERROR,
    SUBSCRIPTION_REQUEST,
    SUBSCRIPTION_SUCCESS,
    SUBSCRIPTION_ERROR
} from '../types/types';
import axios from 'axios';


export const subscriptionPlan = () => (dispatch) => {
    dispatch({ type: GET_SUBSCRIPTION_PLAN_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'GET',
        url: `subscriptions`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {  
            dispatch({
                type: GET_SUBSCRIPTION_PLAN_SUCCESS,
                payload: response.data
            });
            return response.data
        })
        .catch((error) => {
            return dispatch({
                type: GET_SUBSCRIPTION_PLAN_ERROR,
                payload: error.response,
            });
        });
}


export const checkout = (data) => (dispatch) => {
   
    dispatch({ type: SUBSCRIPTION_REQUEST });
   
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'POST',
        url: `checkout`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: {
            username: data.username,
            price: data.subscription_price,
            subscriptionName: data.subscription_name,
            subscription_id: data.subscription_id,        
            redirect_url: 'https://front-end-lablepro-4e5494f0c23e.herokuapp.com/dashboard'
        }
    })
        .then((response) => {
            return dispatch({
                type: SUBSCRIPTION_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: SUBSCRIPTION_ERROR,
                payload: error.response,
            });
        });
};