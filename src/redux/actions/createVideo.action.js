import {

    POST_VIDEO_REQUEST,
    POST_VIDEO_SUCCESS,
    POST_VIDEO_ERROR,
    VIDEO_SEARCH_REQUEST,
    VIDEO_SEARCH_SUCCESS,
    VIDEO_SEARCH_ERROR,
    DELETE_VIDEO_REQUEST,
    DELETE_VIDEO_SUCCESS,
    DELETE_VIDEO_ERROR,
    UPDATE_VIDEO_REQUEST,
    UPDATE_VIDEO_SUCCESS,
    UPDATE_VIDEO_ERROR,


} from '../types/types';
import axios from 'axios';




export const addVideo = (data) => (dispatch) => {
    dispatch({ type: POST_VIDEO_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'POST',
        url: `videos`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        data,
    })
        .then((response) => {
            return dispatch({
                type: POST_VIDEO_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: POST_VIDEO_ERROR,
                payload: error.response,
            });
        });
};

export const deleteVideo = (id) => (dispatch) => {

    dispatch({ type: DELETE_VIDEO_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'DELETE',
        url: `videos/${id}`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {
            return dispatch({
                type: DELETE_VIDEO_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: DELETE_VIDEO_ERROR,
                payload: error.response,
            });
        });
};

export const updateVideo = (data) => (dispatch) => {

    dispatch({ type: UPDATE_VIDEO_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'PUT',
        url: `videos/${data?.id}`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        data
    })
        .then((response) => {
            return dispatch({
                type: UPDATE_VIDEO_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: UPDATE_VIDEO_ERROR,
                payload: error.response,
            });
        });
};

export const getVideo = (page, size) => (dispatch) => {
    dispatch({ type: VIDEO_SEARCH_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'GET',
        url: `videos`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {

            dispatch({
                type: VIDEO_SEARCH_SUCCESS,
                payload: response.data
            });
            return response.data
        })
        .catch((error) => {
            return dispatch({
                type: VIDEO_SEARCH_ERROR,
                payload: error.response,
            });
        });
}
