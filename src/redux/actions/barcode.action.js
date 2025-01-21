import {
    GET_BARCODE_REQUEST,
    GET_BARCODE_SUCCESS,
    GET_BARCODE_ERROR,
    PRINT_TAG_REQUEST,
    PRINT_TAG_SUCCESS,
    PRINT_TAG_ERROR,
    SQUARE_REQUEST,
    SQUARE_SUCCESS,
    SQUARE_ERROR,
    GET_TEMPLATE_REQUEST,
    GET_TEMPLATE_SUCCESS,
    GET_TEMPLATE_ERROR,
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_ERROR,
} from '../types/types';
import axios from 'axios';


export const getBarcodeDetail = (id) => (dispatch) => {
    dispatch({ type: GET_BARCODE_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'GET',
        url: `getProduct?barcode=${id}`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {
            dispatch({
                type: GET_BARCODE_SUCCESS,
                payload: response.data
            });
            return response.data
        })
        .catch((error) => {
            return dispatch({
                type: GET_BARCODE_ERROR,
                payload: error.response,
            });
        });
}

export const getTemplate = () => (dispatch) => {
    dispatch({ type: GET_TEMPLATE_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'GET',
        url: `getTemplates`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {
            dispatch({
                type: GET_TEMPLATE_SUCCESS,
                payload: response.data
            });
            return response.data
        })
        .catch((error) => {
            return dispatch({
                type: GET_TEMPLATE_ERROR,
                payload: error.response,
            });
        });
}

export const getCategories = (username) => (dispatch) => {
    dispatch({ type: GET_CATEGORIES_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'GET',
        url: `getSquareCategories?username=${username}`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {
            dispatch({
                type: GET_CATEGORIES_SUCCESS,
                payload: response.data
            });
            return response.data
        })
        .catch((error) => {
            return dispatch({
                type: GET_CATEGORIES_ERROR,
                payload: error.response,
            });
        });
}


export const printTag = (userName, data) => (dispatch) => {


    dispatch({ type: PRINT_TAG_REQUEST });

    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'POST',
        url: `printLabel`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: {
            username: userName,
            product_name: data?.productName,
            retail_price: data?.retailPrice,
            our_price: data?.finalPrice,
            barcode: data?.barCode,
            id: data?.id,
            
        }
    })
        .then((response) => {
            return dispatch({
                type: PRINT_TAG_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: PRINT_TAG_ERROR,
                payload: error.response,
            });
        });
};


export const pushSquare = (userName,data) => (dispatch) => {

    dispatch({ type: SQUARE_REQUEST });

    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'POST',
        url: `pushSquare`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: {
            username: userName,
            barcode: data?.barCode,
            our_price: data?.finalPrice,
            product_name: data.productName,
            product_desc: data?.Desc,
            categoryId: data?.categories,
            product_quantity: data?.quantity,
            image_url: data?.imageUrl

        }
    })
        .then((response) => {
            return dispatch({
                type: SQUARE_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: SQUARE_ERROR,
                payload: error.response,
            });
        });
};