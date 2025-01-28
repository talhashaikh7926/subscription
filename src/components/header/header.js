import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Layout } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const { Header } = Layout;

export default function MainHeader({ title, mobileSidebar, toggle1 }) {
  const [toggle, setToggle] = useState(toggle1);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <Header
      style={{
        background: "linear-gradient(135deg, #000428 0%, #004e92 30%, #6db3f2 60%, #e5e5e5 100%)",
        padding: "0 20px",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Sidebar Toggle and Title */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <a
          className="trigger d-xl-none"
          onClick={() => {
            setToggle(true);
            mobileSidebar(true);
          }}
          style={{
            color: "#fff",
            fontSize: "18px",
            cursor: "pointer",
            marginRight: "12px",
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </a>

        <div
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#fff",
            textTransform: "capitalize",
          }}
        >
          {title}
        </div>
      </div>

      {/* Logo */}
      <div className="logo" style={{ marginLeft: "auto", marginRight: "20px" }}>
        <Link to="/events">
          <img
            src={""} // Add your logo URL here
            alt="Logo"
            style={{
              height: "40px",
              width: "auto",
              objectFit: "contain",
            }}
          />
        </Link>
      </div>

      {/* Logout Button */}
      <Button
        className="logout-btn"
        type="button"
        size="large"
        onClick={() => logout()}
        style={{
          background: "#004e92",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "bold",
          border: "none",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          height: "40px",
          gap: "8px",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#002D69")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#004e92")}
      >
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
        Logout
      </Button>
    </Header>
  );
}
