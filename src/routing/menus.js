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
  faQuestion,
  faVideo,
  faSubscript,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Drawer } from "antd";
import "../css/customstyle.scss";
import NonIccidProduct from "../pages/nonIccidProducts/nonICCIDproducts";
import LearningVideo from "../pages/learning/video";
import { getUsernameInfo } from '../redux/actions/userDetail.action'
import "./menu.scss";
import AdminFaq from "../components/adminFaq/faq";
import AdminVideo from "../components/adminVideo/video";
import AdminSubscription from "../components/adminSubscription/subscription";

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
        backgroundColor: "#f0f2f5", // Light background for contrast
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Header
        className="site-layout-background custom-header"
        style={{
          padding: "0 20px",
          background: "linear-gradient(135deg, #000428 0%, #004e92 30%, #6db3f2 60%, #e5e5e5 100%)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "83px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)", // Subtle shadow for depth
          zIndex: 1000, // Ensure the header is above other content
        }}
      >
        {/* Sidebar Toggle and Welcome */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <FontAwesomeIcon
            onClick={() => setDrawerVisible(true)}
            className="mobile-menu-button"
            icon={faBars}
            style={{
              color: "white",
              marginRight: "16px",
              fontSize: "20px",
              cursor: "pointer",
            }}
          />
          <h4
            style={{
              margin: 0,
              fontSize: "18px",
              color: "white",
              fontWeight: "500",
              textTransform: "capitalize",
            }}
          >
            Welcome, {getUserInfo?.payload?.username || "User"}
          </h4>
        </div>


        {/* Logout Button */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            type="primary"
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "140px",
              height: "40px",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#fff",
              background: "linear-gradient(135deg, #004e92 30%, #13c2c2 100%)",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Add shadow for better look
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#002D69")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "linear-gradient(135deg, #004e92 30%, #13c2c2 100%)")
            }
          >
            <FontAwesomeIcon
              icon={faSignOutAlt}
              style={{ color: "white", marginRight: "8px", fontSize: "18px" }}
            />
            Logout
          </Button>
        </div>
      </Header>

      {/* Main Layout */}
      <Layout style={{ flexDirection: "row", flexGrow: 1, marginTop: "16px" }}>
        {/* Sidebar */}
        <Sider
          className="sidebar-style"
          style={{
            background: "linear-gradient(135deg, #000428, #004e92, #6db3f2, #e5e5e5)", // Your gradient color
            paddingTop: "40px",
            boxShadow: "2px 0 8px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
            marginTop: "-12px", // Space between the header and sidebar
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
            theme="dark"
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            defaultSelectedKeys={[location.pathname.split("/")[1]]}
            style={{
              background: "transparent",
              fontSize: "16px",
              color: "#fff",
            }}
          >
            {/* Dashboard */}
            <Menu.Item
              key="dashboard"
              icon={<FontAwesomeIcon icon={faDesktop} style={{ color: "#6db3f2" }} />}
              style={{
                margin: "8px 0",
                borderRadius: "8px",
                transition: "all 0.3s ease",
              }}
            >
              <Link to="dashboard" style={{ color: "white", fontWeight: "500" }}>
                Dashboard
              </Link>
            </Menu.Item>



            {/* Configuration (Conditional) */}
            {getUserInfo?.payload?.is_admin === true ?
              <>
                <Menu.Item
                  key="admin-faq"
                  icon={<FontAwesomeIcon icon={faQuestion} style={{ color: "#6db3f2" }} />}
                  style={{
                    margin: "8px 0",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Link to="admin-faq" style={{ color: "white", fontWeight: "500" }}>
                    FAQ
                  </Link>
                </Menu.Item>
            
                <Menu.Item
                  key="admin-video"
                  icon={<FontAwesomeIcon icon={faVideo} style={{ color: "#6db3f2" }} />}
                  style={{
                    margin: "8px 0",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Link to="admin-video" style={{ color: "white", fontWeight: "500" }}>
                    Create Video
                  </Link>
                </Menu.Item>
            
                <Menu.Item
                  key="admin-sub"
                  icon={<FontAwesomeIcon icon={faSubscript} style={{ color: "#6db3f2" }} />}
                  style={{
                    margin: "8px 0",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Link to="admin-sub" style={{ color: "white", fontWeight: "500" }}>
                    Add Subscription
                  </Link>
                </Menu.Item>
              </>
              :
              <>
                {getUserInfo?.payload?.accessible === true && (
                  <Menu.Item
                    key="configuration"
                    icon={<FontAwesomeIcon icon={faUsers} style={{ color: "#6db3f2" }} />}
                    style={{
                      margin: "8px 0",
                      borderRadius: "8px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Link to="configuration" style={{ color: "white", fontWeight: "500" }}>
                      Configuration
                    </Link>
                  </Menu.Item>
                )}

                {/* Learning Video */}
                <Menu.Item
                  key="learning-video"
                  icon={<FontAwesomeIcon icon={faDesktop} style={{ color: "#6db3f2" }} />}
                  style={{
                    margin: "8px 0",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Link to="learning-video" style={{ color: "white", fontWeight: "500" }}>
                    Learning Video
                  </Link>
                </Menu.Item>
              </>
            }
          </Menu>
        </Sider>

        {/* Content Area */}
        <Layout
          style={{
            padding: "0 16px",
            backgroundColor: "#f5f7fa", // Soft background
            flexGrow: 1,
            marginTop: "-16px", // Space between header and content
          }}
        >
          <Content
            style={{
              padding: 24,
              background: "#fff",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for card effect
              minHeight: "calc(100vh - 131px)",
            }}
          >
            <Routes>
              <Route path="/dashboard" exact element={<NonIccidProduct />} />
              <Route path="/configuration" exact element={<Configurations />} />
              <Route path="/learning-video" exact element={<LearningVideo />} />
                
              ---------------- For Admin --------------- 
              
              <Route path="/admin-faq" exact element={<AdminFaq />} />
              <Route path="/admin-video" exact element={<AdminVideo />} />
              <Route path="admin-sub" exact element={<AdminSubscription />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>


  );
};

export default App;
