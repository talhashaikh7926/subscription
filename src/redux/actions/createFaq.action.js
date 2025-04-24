import {

    POST_FAQ_REQUEST,
    POST_FAQ_SUCCESS,
    POST_FAQ_ERROR,
    FAQ_SEARCH_REQUEST,
    FAQ_SEARCH_SUCCESS,
    FAQ_SEARCH_ERROR,
    DELETE_FAQ_REQUEST,
    DELETE_FAQ_SUCCESS,
    DELETE_FAQ_ERROR,
    UPDATE_FAQ_REQUEST,
    UPDATE_FAQ_SUCCESS,
    UPDATE_FAQ_ERROR

} from '../types/types';
import axios from 'axios';


export const addFaq = (data) => (dispatch) => {
    dispatch({ type: POST_FAQ_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'POST',
        url: `faqs`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        data,
    })
        .then((response) => {
            return dispatch({
                type: POST_FAQ_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: POST_FAQ_ERROR,
                payload: error.response,
            });
        });
};

export const deleteFaq = (id) => (dispatch) => {

    dispatch({ type: DELETE_FAQ_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'DELETE',
        url: `faqs/${id}`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {
            return dispatch({
                type: DELETE_FAQ_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: DELETE_FAQ_ERROR,
                payload: error.response,
            });
        });
};

export const updateFaq = (data) => (dispatch) => {
    
    dispatch({ type: UPDATE_FAQ_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'PUT',
        url: `faqs/${data?.id}`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },

        data,
    })
        .then((response) => {
            return dispatch({
                type: UPDATE_FAQ_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: UPDATE_FAQ_ERROR,
                payload: error.response,
            });
        });
};

export const FaqSearch = (page, size) => (dispatch) => {
    dispatch({ type: FAQ_SEARCH_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'GET',
        url: `faqs`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {

            dispatch({
                type: FAQ_SEARCH_SUCCESS,
                payload: response.data
            });
            return response.data
        })
        .catch((error) => {
            return dispatch({
                type: FAQ_SEARCH_ERROR,
                payload: error.response,
            });
        });
}
