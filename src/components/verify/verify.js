import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyUser } from '../../redux/actions/verify.action';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';

const VerifyEmailPage = () => {
  const { code, email } = useParams(); // Extracting code and email from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch(`http://43.245.130.96:3000/verifyuser/?code=${code}&email=${email}`)
      .then((response) => {
        console.log('Response:', response);
        if (!response.ok) {
          throw new Error('Verification failed. Please try again.');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Data:', data);
        dispatch(verifyUser(email, code)).then((res) => {
          setIsLoading(false);
          console.log('Verification Response:', res);
          if (res.isSuccess) {
            setIsSuccess(true);
            notification.success({
              message: 'Verified',
              className: 'toast-success',
              placement: "top"
            });
            navigate('/');
          } else {
            setIsSuccess(false);
            setErrorMessage('Verification failed. Please try again.');
          }
        });
      })
      .catch((error) => {
        console.error('Error verifying email:', error);
        setErrorMessage('An error occurred while verifying email. Please try again later.');
        setIsLoading(false); // Stop loading state on error
      });
  }, [code, email, dispatch, navigate]);


  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      {isLoading ? (
        <div className="spinner"></div>
      ) : isSuccess ? (
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ fontSize: '36px', color: '#333', textAlign: 'center' }}>Thank You For Verification</h1>
        </NavLink>
      ) : (
        <h1 style={{ fontSize: '36px', color: '#333', textAlign: 'center' }}>{errorMessage}</h1>
      )}
    </div>
  );
};

export default VerifyEmailPage;
