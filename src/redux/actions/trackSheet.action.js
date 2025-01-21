import {

    POST_TRACK_ORDER_REQUEST,
    POST_TRACK_ORDER_SUCCESS,
    POST_TRACK_ORDER_ERROR,
    TRACK_ORDER_SEARCH_REQUEST,
    TRACK_ORDER_SEARCH_SUCCESS,
    TRACK_ORDER_SEARCH_ERROR,
    DELETE_TRACK_ORDER_REQUEST,
    DELETE_TRACK_ORDER_SUCCESS,
    DELETE_TRACK_ORDER_ERROR,
    UPDATE_TRACK_ORDER_REQUEST,
    UPDATE_TRACK_ORDER_SUCCESS,
    UPDATE_TRACK_ORDER_ERROR,
    BULK_INSERT_TRACK_SHEET_REQUEST,
    BULK_INSERT_TRACK_SHEET_SUCCESS,
    BULK_INSERT_TRACK_SHEET_ERROR

} from '../types/types';
import axios from 'axios';

export const bulkInsertTrackSheet = (data) => (dispatch) => {
    dispatch({ type: BULK_INSERT_TRACK_SHEET_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'POST',
        url: `order-tracking/import`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        data
    })
        .then((response) => {
            return dispatch({
                type: BULK_INSERT_TRACK_SHEET_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: BULK_INSERT_TRACK_SHEET_ERROR,
                payload: error.response,
            });
        });
};



export const addTrack = (data) => (dispatch) => {
    dispatch({ type: POST_TRACK_ORDER_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'POST',
        url: `order-tracking`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        data,
    })
        .then((response) => {
            return dispatch({
                type: POST_TRACK_ORDER_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: POST_TRACK_ORDER_ERROR,
                payload: error.response,
            });
        });
};

export const deleteTrack = (id) => (dispatch) => {

    dispatch({ type: DELETE_TRACK_ORDER_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'DELETE',
        url: `order-tracking/${id}`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {
            return dispatch({
                type: DELETE_TRACK_ORDER_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: DELETE_TRACK_ORDER_ERROR,
                payload: error.response,
            });
        });
};

export const updateTrack = (id, data) => (dispatch) => {

    dispatch({ type: UPDATE_TRACK_ORDER_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'PUT',
        url: `order-tracking/${id}`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: {
            productTypeId: data.productTypeId,
            inwardDate: data.inwardDate,
            description: data.description,
            expiryDate: data.expiryDate,
            quantity: data.quantity ? Number(data.quantity) : 0,
            isActive: true
        }
    })
        .then((response) => {
            return dispatch({
                type: UPDATE_TRACK_ORDER_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: UPDATE_TRACK_ORDER_ERROR,
                payload: error.response,
            });
        });
};

export const trackSheetSearch = (page, size) => (dispatch) => {
    dispatch({ type: TRACK_ORDER_SEARCH_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'GET',
        url: `activation-topup-reporting/retail-order-history?count=${size}&page[number]=${page}&page[size]=${size}`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {

            dispatch({
                type: TRACK_ORDER_SEARCH_SUCCESS,
                payload: response.data
            });
            return response.data
        })
        .catch((error) => {
            return dispatch({
                type: TRACK_ORDER_SEARCH_ERROR,
                payload: error.response,
            });
        });
}
