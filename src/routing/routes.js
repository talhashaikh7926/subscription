import React, { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";

import Menus from "./menus";
import { useSelector } from "react-redux";
import { BASEURL } from "../config";
import axios from "axios";
import SkeletonComponent from "../components/skeletonLoader";

import Login from "../pages/login/login";



const Router = () => {
  const { validate, login } = useSelector((state) => { return state })
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  axios.defaults.baseURL = BASEURL;
  axios.defaults.headers.common['Authorization'] = `Bearer ${validate?.payload?.message?.token}`;
  axios.interceptors.request.use(request => {
    return request;
  }, error => {
    return Promise.reject(error);
  });

  function Redirect({ to }) {
    let navigate = useNavigate();
    useEffect(() => {
      navigate(to);
    });
    return null;
  }
  console.log("sd");
  

  return (
    <>
      <HistoryRouter>
        {/* {load ? <SkeletonComponent /> : (!validate?.payload?.success ? ( */}
        {login?.loading ? <SkeletonComponent /> : (!userInfo?.access_token ? (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Redirect to="/" />} />
          </Routes>

        ) : (
          <Menus />
        ))

        }
      </HistoryRouter>
    </>
  );
};
export default Router;
