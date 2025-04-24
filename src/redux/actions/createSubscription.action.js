import {

    POST_SUBSCRIPTION_REQUEST,
    POST_SUBSCRIPTION_SUCCESS,
    POST_SUBSCRIPTION_ERROR,
    SUBSCRIPTION_SEARCH_REQUEST,
    SUBSCRIPTION_SEARCH_SUCCESS,
    SUBSCRIPTION_SEARCH_ERROR,
    DELETE_SUBSCRIPTION_REQUEST,
    DELETE_SUBSCRIPTION_SUCCESS,
    DELETE_SUBSCRIPTION_ERROR,
    UPDATE_SUBSCRIPTION_REQUEST,
    UPDATE_SUBSCRIPTION_SUCCESS,
    UPDATE_SUBSCRIPTION_ERROR
  

} from '../types/types';
import axios from 'axios';


export const addSubscription = (data) => (dispatch) => {
    dispatch({ type: POST_SUBSCRIPTION_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'POST',
        url: `subscriptions`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        data,
    })
        .then((response) => {
            return dispatch({
                type: POST_SUBSCRIPTION_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: POST_SUBSCRIPTION_ERROR,
                payload: error.response,
            });
        });
};

export const deleteSubscription = (id) => (dispatch) => {

    dispatch({ type: DELETE_SUBSCRIPTION_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'DELETE',
        url: `subscriptions/${id}`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {
            return dispatch({
                type: DELETE_SUBSCRIPTION_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: DELETE_SUBSCRIPTION_ERROR,
                payload: error.response,
            });
        });
};

export const updateSubscription = (data) => (dispatch) => {

    dispatch({ type: UPDATE_SUBSCRIPTION_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'PUT',
        url: `subscriptions/${data?.subscription_id}`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        data
    })
        .then((response) => {
            return dispatch({
                type: UPDATE_SUBSCRIPTION_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: UPDATE_SUBSCRIPTION_ERROR,
                payload: error.response,
            });
        });
};

export const SubscriptionSearch = (page, size) => (dispatch) => {
    dispatch({ type: SUBSCRIPTION_SEARCH_REQUEST });
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
                type: SUBSCRIPTION_SEARCH_SUCCESS,
                payload: response.data
            });
            return response.data
        })
        .catch((error) => {
            return dispatch({
                type: SUBSCRIPTION_SEARCH_ERROR,
                payload: error.response,
            });
        });
}
