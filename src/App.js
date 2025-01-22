import React, { useEffect } from 'react';
import Router from './routing/routes';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './fonts/flaticon/_flaticon.scss';

import { store } from './redux/store';
import { Provider } from 'react-redux';
import { notification } from 'antd';
import { BrowserRouter, useNavigate } from 'react-router-dom';

const AxiosInterceptor = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
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
          navigate('/'); 
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor); // Cleanup interceptor when component unmounts
    };
  }, [navigate]);

  return children;
};

const App = () => {
  return (
    <Provider store={store}>
      <AxiosInterceptor>
        <Router />
      </AxiosInterceptor>
    </Provider>
  );
};

export default App;
