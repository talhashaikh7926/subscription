import React, { useState } from 'react';
import { Button, Row, Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { contactUs } from "../../redux/actions/userDetail.action";
import { notification } from "antd"; // Import Ant Design notifications

const ContactUs = () => {
    const dispatch = useDispatch();

    // State for form fields
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        businessType: "Business",
        deviceType: "Mac",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
       dispatch(contactUs(formData)).then((res) => {
            console.log(res,"----");
            
            if (res.type === "CONTACT_SUCCESS") {
                notification.success({
                    message: res?.payload?.message || "Message sent successfully!",
                    className: "toast-success",
                    placement: "top",
                });

                // Reset form fields after successful submission
                setFormData({
                    name: "",
                    email: "",
                    message: "",
                    businessType: "Business",
                    deviceType: "Mac",
                });
            } else {
                notification.error({
                    message: res?.message || "Failed to send message!",
                    className: "toast-error",
                    placement: "top",
                });
            }
        });
    };
    return (
        <div
            style={{
                minHeight: "100vh", // Ensure full height
                background: "linear-gradient(135deg, #000428 0%, #004e92 30%, #6db3f2 60%, #e5e5e5 100%)", // Full-screen gradient
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Header Section */}
            <Container className="header-absolute position-absolute mx-auto z-1">
                <Row>
                    <Col className="col-sm-12">
                        <Navbar expand="lg" className="w-100">
                            {/* Brand */}
                            <Navbar.Brand href="/" className="fs25px text-white fw-bold">
                                X LabelSync Pro
                            </Navbar.Brand>

                            {/* Mobile Toggle */}
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />

                            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                                <Nav className="me-auto d-flex align-items-center gap-3">
                                    {/* SignUp */}
                                    <Nav.Link
                                        href="/login"
                                        className="text-white fw-bold"
                                        style={{
                                            padding: "8px 16px",
                                            borderRadius: "8px",
                                            backgroundColor: "#004e92",
                                            color: "#fff",
                                            fontSize: "14px",
                                            transition: "background-color 0.3s ease",
                                        }}
                                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#0061c2")}
                                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#004e92")}
                                    >
                                        SignUp
                                    </Nav.Link>

                                    {/* Login */}
                                    <Nav.Link
                                        href="/login"
                                        className="text-white fw-bold"
                                        style={{
                                            padding: "8px 16px",
                                            borderRadius: "8px",
                                            backgroundColor: "#002D69",
                                            color: "#fff",
                                            fontSize: "14px",
                                            transition: "background-color 0.3s ease",
                                        }}
                                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#004e92")}
                                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#002D69")}
                                    >
                                        Login
                                    </Nav.Link>

                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </Col>
                </Row>
            </Container>


            {/* Main Content */}
            <div
                style={{
                    flex: 1, // Ensures it stretches to fill the remaining space
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                }} className="mt-sm-5 mt-5">
                <Col className="dots-contact-img">
                    <Image src="https://label.live/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F111664%2F810x810%2Fc4c8d67ba8%2Forb-dots-gray.png&w=1920&q=75" className="img-fluid" />
                </Col>
                <Container
                    style={{
                        backgroundColor: "#ffffff",
                        padding: "30px",
                        borderRadius: "16px",
                        maxWidth: "900px",
                        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
                    }}
                    className="mb-4 position-relative"
                >
                    <Row className="align-items-center">
                        {/* Left Section */}
                        <Col md={6} xs={12} className="bg-placeholder-img position-relative">
                            <h3 className="fs39px position-relative" style={{ color: "#004e92", fontWeight: "bold" }}>
                                Got a question about X LabelSync Pro?
                            </h3>
                            <p className="fs17px position-relative text-blue mt-3">
                                Try searching for an answer or get in touch today.
                            </p>
                        </Col>

                        {/* Right Section (Form) */}
                        <Col md={6} xs={12}>
                            <Form className="contact-form" onSubmit={handleSubmit}>
                                <Form.Group controlId="formName" className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="First Name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        style={{
                                            borderRadius: "8px",
                                            border: "1px solid #ddd",
                                        }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="example@gmail.com"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        style={{
                                            borderRadius: "8px",
                                            border: "1px solid #ddd",
                                        }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formMessage" className="mb-3">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="message"
                                        rows={4}
                                        placeholder="I Love X LabelSync Pro, but how do I do this one specific thing?"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        style={{
                                            borderRadius: "8px",
                                            border: "1px solid #ddd",
                                        }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formPreference" className="mb-3">
                                    <Form.Label>I print labels at..</Form.Label>
                                    <Col className="p-0 mt-2">
                                        <label htmlFor="business" className="radio-label">
                                            <input
                                                className="radio-input"
                                                type="radio"
                                                name="businessType"
                                                id="business"
                                                value="Business"
                                                checked={formData.businessType === "Business"}
                                                onChange={handleChange}
                                            />
                                            <span className="custom-radio" />
                                            Business
                                        </label>

                                        <label htmlFor="home" className="radio-label">
                                            <input
                                                className="radio-input"
                                                type="radio"
                                                name="businessType"
                                                id="home"
                                                value="Home"
                                                checked={formData.businessType === "Home"}
                                                onChange={handleChange}
                                            />
                                            <span className="custom-radio" />
                                            Home
                                        </label>
                                    </Col>
                                </Form.Group>

                                <Form.Group controlId="usingmach" className="mb-3">
                                    <Form.Label> I am using a... </Form.Label>
                                    <Col className="p-0 mt-2">
                                        <label htmlFor="mac" className="radio-label">
                                            <input
                                                className="radio-input"
                                                type="radio"
                                                name="deviceType"
                                                id="mac"
                                                value="Mac"
                                                checked={formData.deviceType === "Mac"}
                                                onChange={handleChange}
                                            />
                                            <span className="custom-radio" />
                                            Mac
                                        </label>

                                        <label htmlFor="window" className="radio-label">
                                            <input
                                                className="radio-input"
                                                type="radio"
                                                name="deviceType"
                                                id="window"
                                                value="Window"
                                                checked={formData.deviceType === "Window"}
                                                onChange={handleChange}
                                            />
                                            <span className="custom-radio" />
                                            Window
                                        </label>
                                    </Col>
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    style={{
                                        width: "100%",
                                        height: "50px",
                                        fontSize: "16px",
                                        borderRadius: "8px",
                                        background: "linear-gradient(135deg, rgb(0 36 86), rgb(116 182 241))",
                                        border: "none",
                                        color: "#fff",
                                        boxShadow: '0px 0px 0px'
                                    }}
                                >
                                    Message
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
            {/* New Section */}



            <Container fluid className="faq-bg-sec position-relative pt-4 pb-4">
                <Container>
                    <Row>
                        <Col className="col-sm-6 col-12">
                            <Image src="https://label.live/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F111664%2F437x437%2Fff574f2738%2Ffaqs-icons.png&w=640&q=75" className="img-fluid" />
                        </Col>

                        <Col className="col-sm-6 col-12 mt-auto mb-auto content-para">
                            <h2 className="fw-bold fs42px text-white">FAQs</h2>
                            <p style={{ color: "#fff", fontSize: "17px" }}>
                                Find answers to the most commonly asked questions about X LabelSync Pro.
                            </p>
                            <ul style={{ color: "#fff", fontSize: "17px" }}>
                                <li>How to add data to a label?</li>
                                <li>How to create a new project?</li>
                                <li>How to add a new printer?</li>
                                <li>How to change between printers?</li>
                            </ul>
                            {/* <Button
                                variant="light"
                                style={{
                                  backgroundColor: "#fff",
                                  color: "#004e92",
                                  borderRadius: "8px",
                                  padding: "8px 20px",
                                  fontWeight: "bold",
                                }}
                              >
                                Learn More
                              </Button> */}
                        </Col>
                    </Row>
                </Container>
            </Container>


            <Container fluid className="faq-bg-sec right-bg-move position-relative pt-4 pb-4">
                <Container>
                    <Row>

                        <Col className="col-sm-5 col-12 mt-auto mb-auto content-para pr-4">
                            <h2 className="fw-bold fs42px text-white"> Don’t want to install any software? </h2>
                            {/* <p style={{ color: "#fff", fontSize: "17px" }}>
                                Find answers to the most commonly asked questions about Label LIVE.
                              </p> */}
                            <ul style={{ color: "#fff", fontSize: "17px" }}>
                                <li> Stop stressing over barcodes </li>
                                <li> Let us design your barcode and label </li>
                                <li> Send us a spreadsheet and we will send you a quote for managing your barcodes </li>
                            </ul>
                            <Button
                                variant="light"
                                style={{
                                    backgroundColor: "#fff",
                                    color: "#004e92",
                                    borderRadius: "8px",
                                    padding: "8px 20px",
                                    fontWeight: "bold",
                                }}
                            >
                                Contact Us
                            </Button>
                        </Col>

                        <Col className="col-sm-7 col-12 text-center mt-sm-0 mt-4">
                            <Image src="https://label.live/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F111664%2F1142x868%2Fdcb03ca0c8%2Flabels.png&w=1200&q=75" className="img-fluid" width={'80%'} />
                        </Col>
                    </Row>
                </Container>
            </Container>



            <Container fluid className="bg-white pt-5 pb-5">
                <Container>
                    <Row className="px-sm-4 px-1">
                        <Col className="col-sm-4 mb-4">
                            <Col className="p-4 rounded card-box">
                                <i class="fa fa-file-text-o"></i>
                                <h3 className="text-blue fw-bold"> Guides </h3>
                                <p className="text-grey"> How to make X LabelSync Pro work for you, in detail. </p>
                                {/* <a href="#" className="btn read-btn"> Read the guides </a> */}
                            </Col>
                        </Col>

                        <Col className="col-sm-4 mb-4">
                            <Col className="p-4 rounded card-box">
                                <i class="fa fa-question"></i>
                                <h3 className="text-blue fw-bold"> Find Answers </h3>
                                <p className="text-grey"> If you have questions... we have answers. Check out our in-depth FAQs. </p>
                                {/* <a href="#" className="btn read-btn"> View the FAQs </a> */}
                            </Col>
                        </Col>

                        <Col className="col-sm-4 mb-4">
                            <Col className="p-4 rounded card-box">
                                <i class="fa fa-barcode"></i>
                                <h3 className="text-blue fw-bold"> Barcodes </h3>
                                <p className="text-grey"> See the barcodes we support and learn how to use them in your labels. </p>
                                {/* <a href="#" className="btn read-btn"> See more barcodes </a> */}
                            </Col>
                        </Col>
                    </Row>
                </Container>
            </Container>


            <Container fluid className="bg-gradiant pt-5 pb-4 footer-sec">
                <Container className="pt-2">
                    <Row>
                        <Col className="col-sm-3">
                            <h2 className="text-white"> X LabelSync Pro </h2>
                        </Col>
                        <Col className="col-sm-3">
                            <h5 className="text-white fw-bold mb-3"> Pages </h5>
                            <ul className="foo-navlist m-0 p-0">
                                <li><a href="/"> Home </a></li>
                                <li><a href="/"> Pricing</a> </li>
                                <li><a href="/contact-us"> Contact Us </a></li>

                            </ul>
                        </Col>
                        {/* <Col className="col-sm-2">
                            <h5 className="text-white fw-bold mb-3"> Features </h5>
                            <ul className="foo-navlist m-0 p-0">
                                <li><a href="#"> App </a></li>
                                <li><a href="#"> Design </a> </li>
                                <li><a href="#"> Data </a></li>
                                <li><a href="#"> Print </a></li>

                            </ul>
                        </Col> */}
                        {/* <Col className="col-sm-4">
                            <h5 className="text-white fw-bold mb-3"> Guides </h5>
                            <p className="text-white fs17px"> How to Print Labels from an Excel Spreadsheet How to Create Barcodes Without Printed Check Digit
                                Create Food Rotation Labels With Automatic Relative Dates </p>
                        </Col> */}
                    </Row>

                    <Row className="mt-4">
                        <Col className="col-sm-12">
                            <ul className="terms-list p-0 m-0">
                                <li><a href="#">Privacy Policy </a></li>
                                <li><a href="#">   Terms and Conditions </a></li>
                                <li><a href="#">  End-User License Agreement </a></li>
                            </ul>
                            <h6 className="mt-3 text-white fw-light" style={{ 'font-size': "13px" }}>&copy; Copyrights 2025 X LabelSync Pro. All Right Reserved  </h6>
                        </Col>
                    </Row>
                </Container>
            </Container>

        </div>


    );
};

export default ContactUs;
