import React, { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Menus from "./menus";
import { useSelector } from "react-redux";
import { BASEURL } from "../config";
import axios from "axios";
import Landing from "../pages/home/landing";
import ContactUs from "../pages/contact/contact";
import SkeletonComponent from "../components/skeletonLoader";

import Login from "../pages/login/login";



const Router = () => {
  const { validate, login } = useSelector((state) => { return state })
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const navigate = useNavigate();
  axios.defaults.baseURL = BASEURL;
  axios.defaults.headers.common['Authorization'] = `Bearer ${validate?.payload?.message?.token}`;
  axios.interceptors.request.use(request => {
    return request;
  }, error => {
    return Promise.reject(error);
  });

  function Redirect({ to }) {
    useEffect(() => {
      navigate(to);  // Use navigate() to handle redirection
    }, [to, navigate]);

    return null;
  }


  return (
    <>
      {/* {load ? <SkeletonComponent /> : (!validate?.payload?.success ? ( */}
      {login?.loading ? <SkeletonComponent /> : (!userInfo?.access_token ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Redirect to="/" />} />
          <Route path="/contact-us" exact element={<ContactUs />} />
          <Route path="/home" exact element={<Landing />} />
        </Routes>

      ) : (
        <Menus />
      ))

      }

    </>
  );
};
export default Router;
