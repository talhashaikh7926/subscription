import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faArrowRightFromBracket,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

import { createBrowserHistory } from "history";
import { store } from '../../../redux/store';
import { AUTHENTICATE } from '../../../redux/types/types';
import { useSelector } from 'react-redux';


export const history = createBrowserHistory();
export default function PublicHeader() {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split('/');
  const [page, setPage] = useState("brands");
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Role");
    store.dispatch({ type: AUTHENTICATE, payload: {} })
  };

  const { validate } = useSelector((state) => { return state })
  console.log("page", page);
  return (
    <>
      <div className="public-header">
        <div className="mid-width">
          <div className="public-header-content">
            <div className="header-left">
              <div className="public-logo">
                <Link to="/home">
                  <img src={''} alt="logo" />
                </Link>
              </div>

              {
              // (!validate?.payload?.message?.token && !token) ? (
                // <nav className="public-menu">
                //   <ul>
                //     <li

                //     >
                //       <NavLink to="/" end activeclassname="active">Home</NavLink>
                //     </li>
                //     <li
                //     >
                //       <a href={"https://www.ormelive.com"} target="_blank">Market Place</a>
                //     </li>
                //     {/* <li>
                //     <NavLink to="/influencer-creator">Influencers & Creators</NavLink>
                //   </li> */}

                //     <li

                //     >
                //       <NavLink to="/about" activeclassname="active">About</NavLink>
                //     </li>
                //     <li

                //     >
                //       <NavLink to="/contact-us" activeclassname="active">Contact Us</NavLink>
                //     </li>
                //     {/* <li
                //       className={page === 'package' ? 'active' : ''}
                //       onClick={() => setPage('package')}
                //     >
                //       <Link to="/package">Package</Link>
                //     </li> */}
                //   </ul>
                // </nav>
              // ) : (null)
              }
            </div>

            {(!validate?.payload?.message?.token && !token) ? (
              <div className="buttons-area">
                <Link
                  to="/login"
                  className="btn default-btn medium-btn rounded fw-bold"
                >
                  Sign In
                </Link>
                {/* <Link
                  to="/register"
                  className="btn default-btn medium-btn rounded fw-bold"
                >
                  Join Now
                </Link> */}
              </div>
            ) : (
              <>

              
                <Button
                  className="logout-btn align-items-center justify-content-center"
                  type="button"
                  size="medium"
                  onClick={() => logout()}
                >
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
