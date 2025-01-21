import {
    TOKEN_REQUEST,
    TOKEN_SUCCESS,
    TOKEN_ERROR,
    GET_CONFIGURATION_REQUEST,
    GET_CONFIGURATION_SUCCESS,
    GET_CONFIGURATION_ERROR
} from '../types/types';
import axios from 'axios';


export const getConfig = (username) => (dispatch) => {
    dispatch({ type: GET_CONFIGURATION_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'GET',
        url: `getConfiguration?username=${username}`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {  
            dispatch({
                type: GET_CONFIGURATION_SUCCESS,
                payload: response.data
            });
            return response.data
        })
        .catch((error) => {
            return dispatch({
                type: GET_CONFIGURATION_ERROR,
                payload: error.response,
            });
        });
}


export const configToken = (data) => (dispatch) => {

    dispatch({ type: TOKEN_REQUEST });

    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'POST',
        url: `ConfigureToken`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: {
           username: data.username,
           squareToken: data.token,
           squareLocationId: data.location,
           squareLocationName: "",
           storeName: data.storeName
        }
    })
        .then((response) => {
            return dispatch({
                type: TOKEN_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: TOKEN_ERROR,
                payload: error.response,
            });
        });
};