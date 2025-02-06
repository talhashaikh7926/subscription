import React, { useState } from 'react';
import { Button, Row, Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const Faq = () => {
  
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
                        maxWidth: "100%",  // Full width of the screen
                        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
                    }}
                    className="mb-4 position-relative"
                >
                    <Row className="align-items-center">
                        
                        {/* Right Section (FAQ) */}
                        <Col md={12} xs={12}> {/* Full width now */}
                            <h3 className="fw-bold mb-4">Frequently Asked Questions</h3>
                            <div>
                                <h5><strong>What is X Label Sync Pro?</strong></h5>
                                <p>X Label Sync Pro is an all-in-one software solution designed for e-commerce resellers. It helps users print price tags and list items quickly on platforms like Square Up POS, Soon to Shopify, eBay, and Amazon.</p>

                                <h5><strong>Who can benefit from using X Label Sync Pro?</strong></h5>
                                <p>Our software is ideal for retailers using Square Up. We plan to expand to platforms like Shopify, eBay, and Amazon in the future.</p>

                                <h5><strong>What makes X Label Sync Pro unique?</strong></h5>
                                <p>We offer a custom push solution for Square customers, a large database for price lookup, and tools to help users list more items in less time. Additionally, we provide individual Zoom calls for onboarding and technical support.</p>

                                <h5><strong>How much does X Label Sync Pro cost?</strong></h5>
                                <p>We offer a Pro Monthly Plan at $59 Pro Plan or $599 for a Full Year.</p>

                                <h5><strong>How can I sign up for X Label Sync Pro?</strong></h5>
                                <p>You can sign up by visiting our website, xlabelsync.com.</p>

                                <h5><strong>What platforms does X Label Sync Pro integrate with?</strong></h5>
                                <p>Our software integrates with Square Up POS. We are working on expanding to other platforms like Shopify, eBay, and Amazon.</p>

                                <h5><strong>What kind of support does X Label Sync Pro offer?</strong></h5>
                                <p>We provide individual Zoom calls for onboarding and technical support to ensure you have a smooth experience using our software.</p>

                                <h5><strong>How can I contact customer support?</strong></h5>
                                <p>You can reach out to our customer support team via email or through our social media platforms on Facebook.</p>

                                <h5><strong>What are the future plans for X Label Sync Pro?</strong></h5>
                                <p>Our primary goal for 2025 is to achieve at least 10,000 customer signups. We also plan to start paid advertising soon and expand our platform integrations.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Faq;
