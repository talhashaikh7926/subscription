import React, { useEffect } from 'react';
import { Button, Row, Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FaqSearch } from '../../redux/actions/createFaq.action'

const Faq = () => {
    const dispatch = useDispatch();
    const { getFaq } = useSelector((state) => state);

    useEffect(() => {
        dispatch(FaqSearch());
    }, [dispatch]);

    const faqs = getFaq?.payload || [];

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #000428 0%, #004e92 30%, #6db3f2 60%, #e5e5e5 100%)",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Header */}
            <Container className="header-absolute position-absolute mx-auto z-1">
                <Row>
                    <Col className="col-sm-12">
                        <Navbar expand="lg" className="w-100">
                            <Navbar.Brand href="/" className="fs25px text-white fw-bold">X LabelSync Pro</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                                <Nav className="me-auto d-flex align-items-center gap-3">
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
                    flex: 1,
                    padding: "40px 20px 20px 20px",
                }}
                className="mt-sm-5 mt-5"
            >
                <Col className="dots-contact-img">
                    <Image
                        src="https://label.live/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F111664%2F810x810%2Fc4c8d67ba8%2Forb-dots-gray.png&w=1920&q=75"
                        className="img-fluid"
                    />
                </Col>

                <Container
                    style={{
                        backgroundColor: "#ffffff",
                        padding: "30px",
                        borderRadius: "16px",
                        maxWidth: "100%",
                        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
                    }}
                    className="mb-4 position-relative"
                >
                    <Row className="align-items-center">
                        <Col md={12} xs={12}>
                            <h3 className="fw-bold mb-4">Frequently Asked Questions</h3>
                            <div>
                                {faqs.length > 0 ? (
                                    faqs.map((faq, index) => (
                                        <div key={index}>
                                            <h5><strong>{faq.question}</strong></h5>
                                            <p>{faq.answer}</p>
                                        </div>
                                    ))
                                ) : (
                                    <>
                                   Loading....
                                   </>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Faq;
