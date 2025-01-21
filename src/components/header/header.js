import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Layout } from "antd";

import { createBrowserHistory } from "history";
// import logo from "../../images/ormelogo.svg";

export const history = createBrowserHistory();
const { Header } = Layout;

export default function MainHeader({ title, mobileSidebar, toggle1 }) {
  const [toggle, setToggle] = useState(toggle1);
  const logout = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
    window.location.reload();
  };
  return (
    <>
      <Header className="site-layout-background header-main">
        <div className="d-flex">
          <a
            className="d-xl-none trigger"
            onClick={() => {
              setToggle(true);
              mobileSidebar(true);
            }}
          >
            <FontAwesomeIcon icon={faBars} />
          </a>

          <div className="header-title">{title}</div>
        </div>

        <div className="logo d-xl-none">
          <Link to="/events">
            <img src={''} alt="logo" />
          </Link>
        </div>


        <Button
          className="logout-btn align-items-center justify-content-center ad"
          type="button"
          size="medium"
          onClick={() => logout()}
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
          Logout
        </Button>
      </Header>
    </>
  );
}
