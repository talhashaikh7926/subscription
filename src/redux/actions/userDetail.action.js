import {
    GET_INFO_REQUEST,
    GET_INFO_SUCCESS,
    GET_INFO_ERROR,
    CONTACT_REQUEST,
    CONTACT_SUCCESS,
    CONTACT_ERROR

} from '../types/types';
import axios from 'axios';

export const getUsernameInfo = (username) => (dispatch) => {
    dispatch({ type: GET_INFO_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'GET',
        url: `users?username=${username}`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {

            dispatch({
                type: GET_INFO_SUCCESS,
                payload: response.data
            });
            return response.data
        })
        .catch((error) => {
            return dispatch({
                type: GET_INFO_ERROR,
                payload: error.response,
            });
        });
}

export const contactUs = (data) => (dispatch) => {
   
    dispatch({ type: CONTACT_REQUEST });
    return axios({
        method: 'POST',
        url: `contact`,
        headers: {
            Accept: "application/json",
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
                type: CONTACT_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: CONTACT_ERROR,
                payload: error.response,
            });
        });
};