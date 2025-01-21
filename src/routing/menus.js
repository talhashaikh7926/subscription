import React, { useState, useEffect, useRef } from "react";
import "antd/dist/antd.css";
import {
  Route,
  Link,
  Routes,
  useLocation,
} from "react-router-dom";
import Configurations from "../pages/configuration/configurations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faDesktop,
  faListUl,
  faBars,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Drawer } from "antd";
import "../css/customstyle.scss";
import NonIccidProduct from "../pages/nonIccidProducts/nonICCIDproducts";
import { getUsernameInfo } from '../redux/actions/userDetail.action'
import "./menu.scss";

const { Header, Sider, Content } = Layout;
const App = () => {
  const ref = useRef();
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState([]);
  const [openKeysMb, setOpenKeysMb] = useState([]);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { getUserInfo } = useSelector((state) => { return state })
    const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/Mainpage/title") {
      changetitle(location.pathname);
    } else {
      changetitle(location.pathname.split("/")[1]);
    }
  }, [location]);

  useEffect(() => {
    mobileSidebar(toggle);
  }, [toggle]);


  const token = JSON.parse(localStorage.getItem("userInfo"));


  useEffect(() => {
    dispatch(getUsernameInfo(token?.user_name))
  }, [token?.user_name]);
  const rootSubmenuKeys = [
    "accounting",
    "settings",
    "ugc",
    "social-store-management",
  ];

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const onOpenChangeMobile = (keys) => {
    const latestOpenKey = keys.find((key) => openKeysMb.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeysMb(keys);
    } else {
      setOpenKeysMb(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const mobileSidebar = (action) => {
    setToggle(action);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setToggle(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [toggle]);

  const changetitle = (title) => {
    if (title === "test") {

    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        backgroundColor: "#fff",
        overflow: "hidden",
      }}
    >
      <Header
        className="site-layout-background custom-header"
        style={{
          padding: "0 20px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "83px",
        }}
      >
        <div className="header-left">
          <FontAwesomeIcon
            onClick={() => setDrawerVisible(true)}
            className="mobile-menu-button"
            icon={faBars}
            style={{ color: "black", marginRight: "8px" }}
          />
          <h4 className="header-title">Welcome  {getUserInfo?.payload?.username} </h4>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>

          <div className="menu-buttons" style={{ marginLeft: "16px" }}>
            <Button
              type="primary"
              onClick={handleLogout}
              style={{
                width: "120px",
                height: "40px",
                fontSize: "16px",
                backgroundColor: "white",
                borderColor: "grey",
                color: "black",
                transition: "all 0.3s",
              }}
            >
              <FontAwesomeIcon
                icon={faSignOutAlt}
                style={{ color: "black", marginRight: "8px" }}
              />
              Logout
            </Button>
          </div>
        </div>
      </Header>
      <Layout style={{ flexDirection: "row", flexGrow: 1 }}>
        <Sider
          className="sidebar-style"
          style={{
            backgroundColor: "#fff",
            paddingTop: "20px",
            marginTop: "16px",
          }}
          width={250}
          breakpoint="xl"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            if (broken) {
              setDrawerVisible(false);
            }
          }}
        >
          <Menu
            theme="light"
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            defaultSelectedKeys={[location.pathname.split("/")[1]]}
            style={{ backgroundColor: "#fff", padding: "0" }}
          >


            <Menu.Item
              key="dashboard"
              icon={<FontAwesomeIcon icon={faDesktop} />}
              style={{ transition: "background-color 0.3s" }}
            >
              <Link
                to="dashboard"
                onClick={() => {
                  changetitle("Subscription Plan");
                  setDrawerVisible(false);
                }}
              >
                Dashboard
              </Link>
            </Menu.Item>

            {getUserInfo?.payload?.accessible === false && (
              <>
                <Menu.Item
                  key="configuration"
                  icon={<FontAwesomeIcon icon={faUsers} />}
                  style={{ transition: "background-color 0.3s" }}
                >
                  <Link
                    to="configuration"
                    onClick={() => {
                      changetitle("Configuration");
                      setDrawerVisible(false);
                    }}
                  >
                    Configuration
                  </Link>
                </Menu.Item>
              </>
            )}

            <Menu.Item
              key="arrival-submission"
              icon={<FontAwesomeIcon icon={faDesktop} />}
              style={{ transition: "background-color 0.3s" }}
            >
              <Link
                to="arrival-submission"
                onClick={() => {
                  changetitle("Arrival Date");
                  setDrawerVisible(false);
                }}
              >
                Learning Video
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          style={{
            padding: "0 16px",
            backgroundColor: "#f0f2f5",
            marginTop: "16px",
            flexGrow: 1,
          }}
        >
          <Content
            style={{
              padding: 24,
              background: "white",
              minHeight: "calc(100vh - 131px)",
            }}
          >
            <Routes>

              <Route path="/dashboard" exact element={<NonIccidProduct />} />
              <Route path="/configuration" exact element={<Configurations />} />


            </Routes>
          </Content>
        </Layout>
      </Layout>

      <Drawer
        title="Menu"
        placement="left"
        closable={true}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        bodyStyle={{ padding: 0 }}
        className="mobile-drawer"
      >
        <Menu
          theme="light"
          mode="inline"
          openKeys={openKeysMb}
          onOpenChange={onOpenChangeMobile}
          defaultSelectedKeys={[location.pathname.split("/")[1]]}
          style={{ backgroundColor: "#fff", padding: "0" }}
        >
          <Menu.Item
            key="my-profile"
            style={{ transition: "background-color 0.3s" }}
          >
            <Link
              to="my-profile"
              onClick={() => {
                changetitle("My Profile");
                setDrawerVisible(false);
              }}
            >
              <span>
                <FontAwesomeIcon icon={faListUl} />
                <span style={{ marginLeft: "8px" }}>My Profile</span>
              </span>
            </Link>
          </Menu.Item>



          <Menu.Item
            key="dashboard"
            icon={<FontAwesomeIcon icon={faDesktop} />}
            style={{ transition: "background-color 0.3s" }}
          >
            <Link
              to="dashboard"
              onClick={() => {
                changetitle("Subscription Plan");
                setDrawerVisible(false);
              }}
            >
              Dashboard
            </Link>
          </Menu.Item>

          {getUserInfo?.payload?.accessible === false && (
            <>
              <Menu.Item
                key="configuration"
                icon={<FontAwesomeIcon icon={faUsers} />}
                style={{ transition: "background-color 0.3s" }}
              >
                <Link
                  to="configuration"
                  onClick={() => {
                    changetitle("Configuration");
                    setDrawerVisible(false);
                  }}
                >
                  Configuration
                </Link>
              </Menu.Item>
            </>
          )}

          <Menu.Item
            key="arrival-submission"
            icon={<FontAwesomeIcon icon={faDesktop} />}
            style={{ transition: "background-color 0.3s" }}
          >
            <Link
              to="arrival-submission"
              onClick={() => {
                changetitle("Arrival Date");
                setDrawerVisible(false);
              }}
            >
              Arrival Date Submission
            </Link>
          </Menu.Item>
        </Menu>
      </Drawer>
    </Layout>
  );
};

export default App;
