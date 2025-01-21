// import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
// import { NavLink } from "react-router-dom";
// import { Collapse } from "antd";
// const { Panel } = Collapse;

import logo from "../../images/echo-logo.png";
import card from "../../images/payment-cards.jpg";

export default () => {
  return (

    <footer id="footer" className="footer pt-5 gray-bg gray-t-b">
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <img src={logo} className="mb-5" alt="" />
            <p>Lorem Ipsum is simply text of the printing and esetting industry. Lorem um has been the industr standard dummy text ev since the 1500s, when unknown printer took.</p>
          </div>
          <div className="col-lg-2">
            <h5>Popular Countries</h5>
            <ul>
              <li><a href="">United States</a></li>
              <li><a href="">Turkey</a></li>
              <li><a href="">United Kingdom</a></li>
              <li><a href="">United Arab Emirates</a></li>
              <li><a href="">Japan</a></li>
              <li><a href="">Thailand</a></li>
              <li><a href="">India</a></li>
              <li><a href="">France</a></li>
              <li><a href="">Spain</a></li>
              <li><a href="">Italy</a></li>
            </ul>
          </div>
          <div className="col-lg-2">
            <h5>Partner with us</h5>
            <ul>
              <li><a href="">Corporate</a></li>
              <li><a href="">Affiliate Partners</a></li>
              <li><a href="">API Partners</a></li>
              <li><a href="">Distribution Partners</a></li>
            </ul>
          </div>
          <div className="col-lg-2"><h5>About Us</h5>
            <ul>
              <li><a href="">About Us</a></li>
              <li><a href="">Media Center</a></li>
            </ul></div>
          <div className="col-lg-2">
            <h5>More Info</h5>
            <ul>
              <li><a href="">FAQ and Guides</a></li>
              <li><a href="">Contact Us</a></li>
              <li><a href="">eSIM Support Devices</a></li>
              <li><a href="">Installation Guides</a></li>
              <li><a href="">Referrals</a></li>
            </ul>
          </div>
          <div className="col-lg-2">
            <h5>ECHO Career</h5>
            <ul>
              <li><a href="">Working at Echo</a></li>
              <li><a href="">Job Vacancies</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container copy-right gray-t-b pt-3 pb-3">
        <div className="row">
          <div className="col-lg-6">
            <ul>
              <li>©2024 ECHO</li>
              <li><a href="">Privacy & Cookie Policy</a></li>
              <li><a href="">Terms & Conditions </a></li>
              <li><a href=""><i className="bi bi-globe"></i> English</a></li>
            </ul>
          </div>
          <div className="col-lg-6 text-end">
            <h6>Follow Us: <i className="bi bi-facebook"></i> <i className="bi bi-twitter"></i> <i className="bi bi-instagram"></i> </h6>
          </div>
        </div>
      </div>
      <div className="container-fluid pt-3 pb-3" style={{ backgroundColor: '#fff' }}>
        <div className="row">
          <div className="col-lg-12 text-center">
            <img src={card} alt="" className="img-fluid" />
          </div>
        </div>
      </div>
    </footer>
  );
};
