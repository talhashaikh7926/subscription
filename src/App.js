import React from 'react';
import Router from './routing/routes';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './fonts/flaticon/_flaticon.scss';

import { store } from './redux/store';
import { Provider } from 'react-redux';
//import { createBrowserHistory } from 'history';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
// import { AUTHENTICATE } from './redux/types/types';

const App = () => {

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const status = error.response?.status;

      if ([401, 402, 404, 406, 422].includes(status)) {
        notification.error({
          message: 'Session Expired!',
          description: 'Your session has expired. Please log in again.',
          className: 'toast-error',
          placement: 'top',
        });

        localStorage.removeItem('token');

      //  history.push('/');
      //  window.location.reload();
      }

      return Promise.reject(error);
    }
  );

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};
export default App;
