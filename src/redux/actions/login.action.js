import {
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR
} from '../types/types';
import axios from 'axios';

export const adminLogin = (data) => (dispatch) => {
  dispatch({ type: POST_LOGIN_REQUEST });
  return axios({
    method: 'POST',
    url: `login`,
    headers: {
      Accept: "application/json",
    },
    data: {
      email: data.email,
      password: data.password,
    },
  })
    .then((response) => {
      dispatch({
        type: POST_LOGIN_SUCCESS,
        payload: response.data,
      });
      return response.data
    })
    .catch((error) => {
      return dispatch({
        type: POST_LOGIN_ERROR,
        payload: error.response,
      });
    });
}

export const registerLogin = (data) => (dispatch) => {
  
  dispatch({ type: REGISTER_REQUEST });
  return axios({
    method: 'POST',
    url: `register`,
    headers: {
      Accept: "application/json",
    },
    data: {
      email: data.email,
      password: data.password,
      first_name: data?.first_name,
      last_name: data?.last_name,
      mobile_no: data?.mobile_no,
      username: data?.username,

    },
  })
    .then((response) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      });
      return response.data
    })
    .catch((error) => {
      return dispatch({
        type: REGISTER_ERROR,
        payload: error.response,
      });
    });
}

