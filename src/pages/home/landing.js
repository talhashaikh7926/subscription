import React, { useState } from "react";
import { Form, Input, Button, Card, Layout, Row, Col, Typography, Divider, notification } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Table } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title } = Typography;

const Landing = () => {


    const [pricingRef, pricingInView] = useInView({ triggerOnce: true, threshold: 0.2 });
    const [monthlyRef, monthlyInView] = useInView({ triggerOnce: true, threshold: 0.2 });
    const [usedByRef, usedByInView] = useInView({ triggerOnce: true, threshold: 0.2 });
    const [iframeRef, iframeInView] = useInView({ triggerOnce: true, threshold: 0.2 });
    const [imageTextRef, imageTextInView] = useInView({ triggerOnce: true, threshold: 0.2 });
    const [recommendRef, recommendInView] = useInView({ triggerOnce: true, threshold: 0.2 });
    const [adviceRef, adviceInView] = useInView({ triggerOnce: true, threshold: 0.2 });



    return (
        <Layout className="bg-transparent">
            <Container className="header-absolute position-absolute mx-auto">
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

                                    {/* Contact Us Button */}
                                    <Button
                                        href="/contact-us"
                                        className="fw-bold"
                                        style={{
                                            width: "200px",
                                            height: "40px",
                                            borderRadius: "10px",
                                            backgroundColor: "#ffffff",
                                            color: "#004e92",
                                            border: "3px solid #004e92",
                                            fontSize: "18px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Contact Us
                                    </Button>

                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </Col>
                </Row>
            </Container>

            <Container fluid className="pt-5 pb-2 bg-gradiant relative">
                <Container ref={pricingRef}>
                    <Row className="pt-5 align-items-center position-relative z-1 justify-content-center">
                        <Col className="col-sm-12 text-center">
                            <motion.h2
                                className="fw-bold fs40px text-white"
                                initial={{ opacity: 0, y: -50 }}
                                animate={pricingInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8 }}
                            >
                                Simple one-time pricing
                            </motion.h2>
                            <motion.p
                                className="text-white fs23px fw-bold"
                                initial={{ opacity: 0, y: -50 }}
                                animate={pricingInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 1 }}
                            >
                                X LabelSync pro is licensed per computer.
                            </motion.p>
                        </Col>

                        {/* Pricing Cards */}
                        <Col className="col-sm-4 mt-2">
                            <motion.div
                                className="text-center bg-white px-4 pt-5 pb-5 pkg-plan-box"
                                initial={{ x: -200, opacity: 0 }}
                                animate={pricingInView ? { x: 0, opacity: 1 } : {}}
                                transition={{ duration: 1 }}
                            >
                                <h4 className="text-blue fw-bold fs25px">Monthly Plan</h4>
                                <h1 className="text-blue fw-bold fs45px">$59</h1>



                                <ul className="text-left fs18px px-3 text-blue mb-4 fix-panel">
                                    <li>Works with 2+ printers</li>
                                    <li>Unlimited label printing</li>
                                    <li>Preview Barcode</li>
                                    <li>Zebra Printing</li>
                                    <li>Support 300 & 200dpi</li>

                                </ul>
                                <a
                                    href="/login"
                                    className="btn download-btn bg-blue fs17px px-3 text-white pt-2 pb-2"
                                >
                                    Sign In
                                </a>
                            </motion.div>
                        </Col>

                        <Col className="col-sm-4 mt-2">
                            <motion.div
                                className="text-center bg-white px-4 pt-5 pb-5 pkg-plan-box"
                                initial={{ x: 200, opacity: 0 }}
                                animate={pricingInView ? { x: 0, opacity: 1 } : {}}
                                transition={{ duration: 1 }}
                            >
                                <h4 className="text-blue fw-bold fs25px">Yearly Plan</h4>
                                <h1 className="text-blue fw-bold fs45px">$599</h1>
                                {/* <p className="text-blue fs19px fw-normal">one-time</p> */}
                                <p className="text-success fw-bold fs18px">Save 15% compared to monthly!</p>
                                <ul className="text-left fs18px text-blue px-3 mb-4 mt-3">
                                    <li>Print Barcodes</li>

                                    <li>Unlimited Label printing</li>
                                    <li>Same day support</li>
                                    <li className="text-success fw-bold">Support 300 to 200dpi With Customization</li>
                                </ul>
                                <a
                                    href="/login"
                                    className="btn download-btn bg-blue fs17px px-3 text-white pt-2 pb-2"
                                >
                                    Sign In
                                </a>
                            </motion.div>
                        </Col>

                        {/* <Col className="col-sm-4 mt-2">
                            <motion.div
                                className="text-center bg-white px-4 pt-4 pb-4 pkg-plan-box"
                                initial={{ x: -200, opacity: 0 }}
                                animate={pricingInView ? { x: 0, opacity: 1 } : {}}
                                transition={{ duration: 1 }}
                            >
                                <h4 className="text-blue fw-bold fs25px">Logic</h4>
                                <h1 className="text-blue fw-bold fs45px">$247.99</h1>
                                <p className="text-blue fs19px fw-normal">one-time</p>
                                <ul className="text-left fs18px text-blue px-3 mb-4 fix-panel">
                                    <li>Everything in Business</li>
                                    <li>Script variables</li>
                                    <li>Advanced row selection</li>
                                    <li>Dynamic hide/show</li>
                                    <li>Integration APIs</li>
                                    <li>Watch for batch import</li>
                                </ul>
                                <a
                                    href="/login"
                                    className="btn download-btn fs17px px-3 text-blue pt-2 pb-2"
                                >
                                    Download Now
                                </a>
                            </motion.div>
                        </Col> */}

                    </Row>
                    {/* <Col className="position-absolute curve-img w-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            viewBox="0 0 1440 320"
                            preserveAspectRatio="none"
                        >
                            <defs>
                                <linearGradient id="polygonalGradient" x1="0" x2="1" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#000428" />
                                    <stop offset="35%" stopColor="#004e92" />
                                    <stop offset="65%" stopColor="#6db3f2" />
                                    <stop offset="100%" stopColor="#e5e5e5" />
                                </linearGradient>
                            </defs>
                            <path
                                fill="url(#polygonalGradient)"
                                d="M0,128L60,96L120,160L180,96L240,128L300,64L360,96L420,32L480,64L540,32L600,96L660,32L720,96L780,64L840,128L900,64L960,128L1020,96L1080,64L1140,128L1200,64L1260,96L1320,32L1380,64L1440,32L1440,320L1380,320L1320,320L1260,320L1200,320L1140,320L1080,320L1020,320L960,320L900,320L840,320L780,320L720,320L660,320L600,320L540,320L480,320L420,320L360,320L300,320L240,320L180,320L120,320L60,320L0,320Z"
                            ></path>
                        </svg>
                    </Col> */}


                </Container>
            </Container>

            <Container className="pt-5 pb-5">
                <Row>
                    <Table className="table tabldesign table-responsive">
                        <thead>
                            <tr>
                                <th>Feature</th>
                                <th>X LabelSync Pro</th>
                                <th>Others</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><h5>Seamlessly Integrated With Square POS</h5></td>
                                <td>✅</td>
                                <td>❌</td>
                            </tr>
                            <tr>
                                <td><h5>Display Retail and Discounted Prices to Boost Sales</h5></td>
                                <td>✅</td>
                                <td>❌</td>
                            </tr>
                            <tr>
                                <td><h5>Same-Day Customer Support</h5></td>
                                <td>✅</td>
                                <td>❌</td>
                            </tr>
                            <tr>
                                <td><h5>Unlimited Printing with No Additional Fees</h5></td>
                                <td>✅</td>
                                <td>❌</td>
                            </tr>
                            <tr>
                                <td><h5>Compatible with 300 & 200 dpi Printers</h5></td>
                                <td>✅</td>
                                <td>❌</td>
                            </tr>
                            <tr>
                                <td><h5>Compatible with Mac & PC</h5></td>
                                <td>✅</td>
                                <td>❌</td>
                            </tr>
                            <tr>
                                <td><h5> Fastest & Easiest Tag Printing And Item Listing</h5></td>
                                <td>✅</td>
                                <td>❌</td>
                            </tr>
                            <tr>
                                <td><h5>Life Time Support at No Extra Cost</h5></td>
                                <td>✅</td>
                                <td>❌</td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
            </Container>
            {/* <Container className="pt-5 pb-5">
                <Row>
                    <Table className="table tabldesign table-responsive">
                        <thead>
                            <tr>
                                <th> </th>
                                <th>Home</th>
                                <th>Business </th>
                                <th>Logic / Subscription</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> <h5> Text and Images </h5> </td>
                                <td><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle text-secondary" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg></td>
                                <td><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle text-secondary" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg></td>
                                <td><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle text-secondary" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg></td>
                            </tr>

                            <tr>
                                <td><h5> Works with USB Thermal Printers </h5>
                                </td>
                                <td><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle text-secondary" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg></td>
                                <td> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle text-secondary" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg> </td>
                                <td> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle text-secondary" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg> </td>
                            </tr>
                            <tr>
                                <td><h5> Works with Color Printers </h5>
                                </td>
                                <td> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle text-secondary" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg> </td>
                                <td><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle text-secondary" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg></td>
                                <td> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle text-secondary" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg></td>
                            </tr>
                            <tr>
                                <td> <h5> Unlimited Label Printing </h5>
                                </td>
                                <td><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle text-secondary" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg></td>
                                <td><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle text-secondary" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg></td>
                                <td> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle text-secondary" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg> </td>
                            </tr>
                            <tr>
                                <td><h5> Use at a Business  </h5></td>
                                <td> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-dot" class="svg-inline--fa fa-circle-dot text-gray-300" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-352a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"></path></svg> </td>
                                <td> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle text-secondary" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg>  </td>
                                <td> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle text-secondary" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg>  </td>
                            </tr>
                            <tr>
                                <td><h5> Print Barcodes  </h5></td>
                                <td> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-dot" class="svg-inline--fa fa-circle-dot text-gray-300" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-352a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"></path></svg> </td>
                                <td> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle text-secondary" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg></td>
                                <td> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle text-secondary" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg> </td>
                            </tr>
                            <tr>
                                <td><h5> Same Day Support </h5>
                                </td>
                                <td> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-dot" class="svg-inline--fa fa-circle-dot text-gray-300" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-352a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"></path></svg> </td>
                                <td> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle text-secondary" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg></td>
                                <td> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle text-secondary" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg> </td>
                            </tr>
                            <tr>
                                <td> <h5> Dynamic images and catalogs </h5>
                                </td>
                                <td> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-dot" class="svg-inline--fa fa-circle-dot text-gray-300" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-352a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"></path></svg> </td>
                                <td> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle text-secondary" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg></td>
                                <td> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle text-secondary" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg> </td>
                            </tr>
                            <tr>
                                <td> <h5> Variable label copies </h5>
                                </td>
                                <td> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-dot" class="svg-inline--fa fa-circle-dot text-gray-300" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-352a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"></path></svg> </td>
                                <td> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle text-secondary" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg></td>
                                <td> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle text-secondary" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg> </td>
                            </tr>

                            <tr>
                                <td> <h5> Save batch images and PDFs </h5>
                                </td>
                                <td> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-dot" class="svg-inline--fa fa-circle-dot text-gray-300" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-352a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"></path></svg> </td>
                                <td> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle text-secondary" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg></td>
                                <td> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle text-secondary" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg> </td>
                            </tr>
                            <tr>
                                <td> <h5> Use thermal transfer printers </h5>
                                </td>
                                <td> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-dot" class="svg-inline--fa fa-circle-dot text-gray-300" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-352a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"></path></svg> </td>
                                <td> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle text-secondary" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg></td>
                                <td> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle text-secondary" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg> </td>
                            </tr>

                            <tr>
                                <td> <h5> Data form views </h5>
                                </td>
                                <td> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-dot" class="svg-inline--fa fa-circle-dot text-gray-300" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-352a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"></path></svg> </td>
                                <td> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle text-secondary" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg></td>
                                <td> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle text-secondary" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg> </td>
                            </tr>


                        </tbody>
                    </Table>
                </Row>
            </Container> */}



            {/* Pay Monthly Section */}
            {/* <Container
                fluid
                className="pt-5 pb-4 bg-gradiant position-relative"
                ref={monthlyRef}
                style={{ position: "relative", overflow: "hidden" }}
            >
                <Container className="pb-5">
                    <Row
                        className="pt-5 align-items-center justify-content-center"
                        style={{ position: "relative", zIndex: 2 }}
                    >
                        <Col className="col-sm-12 text-center">
                            <motion.h2
                                className="fw-bold fs40px text-white"
                                initial={{ opacity: 0, y: -50 }}
                                animate={monthlyInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8 }}
                            >
                                Or, pay monthly...
                            </motion.h2>
                            <motion.p
                                className="text-white fs23px fw-bold"
                                initial={{ opacity: 0, y: -50 }}
                                animate={monthlyInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 1 }}
                            >
                                Every feature is included in our subscription.
                            </motion.p>
                        </Col>

                        
                        <Col className="col-sm-4 mt-4 px-4">
                            <motion.div
                                className="text-center bg-white rounded shadow-lg px-4 pt-4 pb-4 pkg-plan-box"
                                style={{
                                    position: "relative",
                                    zIndex: 2,
                                    backgroundColor: "#fff",
                                    borderRadius: "10px",
                                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                                }}
                                initial={{ x: -200, opacity: 0 }}
                                animate={monthlyInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 1 }}
                            >
                                <h4
                                    className="text-blue fw-bold fs25px"
                                    style={{ color: "rgb(63, 55, 146)" }}
                                >
                                    Subscription
                                </h4>
                                <h1
                                    className="text-blue fw-bold fs45px"
                                    style={{ color: "rgb(63, 55, 146)" }}
                                >
                                    $59
                                </h1>
                                <p
                                    className="text-blue fs19px fw-normal"
                                    style={{ color: "rgb(63, 55, 146)" }}
                                >
                                    per/month
                                </p>
                                <ul
                                    className="text-left fs18px px-3 text-blue mb-4"
                                    style={{ color: "rgb(63, 55, 146)" }}
                                >
                                    <li>Works with 2+ printers</li>
                                    <li>Unlimited label printing</li>
                                    <li>Preview Barcode</li>
                                    <li>Zebra Printing</li>
                                    <li>Support 300 & 200dpi</li>
                                </ul>
                                <a
                                    href="/login"
                                    className="btn download-btn fs17px px-3 pt-2 pb-2"
                                    style={{
                                        backgroundColor: "rgb(27 92 149)", 
                                        color: "white", 
                                        padding: "10px 20px", 
                                        borderRadius: "5px",
                                        textDecoration: "none", 
                                        display: "inline-block", 
                                        fontWeight: "bold", 
                                        fontSize: "17px", 
                                        textAlign: "center", 
                                    }}
                                >
                                    Download Now
                                </a>

                            </motion.div>
                        </Col>
                    </Row>

                    
                    <Col
                        className="position-absolute curve-img w-100"
                        style={{
                            zIndex: 1,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            overflow: "hidden",
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1440 320"
                            preserveAspectRatio="none"
                            width="100%"
                            height="150px"
                        >
                            <defs>
                                <linearGradient id="inlineGradient" x1="0" x2="1" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#000428" />
                                    <stop offset="40%" stopColor="#004e92" />
                                    <stop offset="70%" stopColor="#6db3f2" />
                                    <stop offset="100%" stopColor="#e5e5e5" />
                                </linearGradient>
                            </defs>
                            <path
                                fill="url(#inlineGradient)"
                                fillOpacity="1"
                                d="M0,256C120,192,240,128,360,96C480,64,600,96,720,128C840,160,960,192,1080,224C1200,256,1320,288,1440,320L1440,320L0,320Z"
                            ></path>
                        </svg>
                    </Col>
                </Container>
            </Container> */}




            <div>
                {/* Video Section */}
                <Container className="pt-5 pb-5" ref={iframeRef}>
                    <Row>
                        <Col className="text-center mx-auto col-sm-7">
                            <motion.iframe
                                width="100%"
                                height="412"
                                src="https://photos.onedrive.com/share/786723E1B453155C!sdb5f745ffd0143b38317364534fb86be?cid=786723E1B453155C&resId=786723E1B453155C!sdb5f745ffd0143b38317364534fb86be&ithint=video&migratedtospo=true&redeem=aHR0cHM6Ly8xZHJ2Lm1zL3YvYy83ODY3MjNlMWI0NTMxNTVjL0VWOTBYOXNCX2JORGd4YzJSVFQ3aHI0Qk8zdnhodFRZczI0Y2xLb2JYN1Z6UXc"
                                title="Introducing Label Printer Design Software For Mac And Windows"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                className="mx-auto"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={iframeInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.8 }}
                            ></motion.iframe>
                        </Col>
                    </Row>
                </Container>

                {/* Image and Text Section */}
                <Container className="pb-4" ref={imageTextRef}>
                    <Row className="pt-3 px-4">
                        <Col className="col-sm-6 px-4">
                            <motion.img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1200px-World_map_-_low_resolution.svg.png"
                                width="400px"
                                className="img-fluid"
                                initial={{ x: -200, opacity: 0 }}
                                animate={imageTextInView ? { x: 0, opacity: 1 } : {}}
                                transition={{ duration: 1 }}
                            />

                        </Col>
                        <Col className="col-sm-6 mt-auto mb-auto">
                            <motion.div
                                initial={{ x: 200, opacity: 0 }}
                                animate={imageTextInView ? { x: 0, opacity: 1 } : {}}
                                transition={{ duration: 1 }}
                            >
                                <h3 className="text-blue fs38px mb-3 fw-bold">Used by thousands</h3>
                                <p className="fs17px">
                                    Anyone can SignUp and use X LabelSync Pro to print labels. It's easy to
                                    use, priced right, always available without Internet, helpfully
                                    supported by humans when you need us, and constantly improving based
                                    on your feedback.
                                </p>
                                <a
                                    href="#"
                                    className="btn trusted-btn bg-blue text-white px-4 pt-2 pb-2 fw-bold fs17px mt-2"
                                >
                                    Trusted Worldwide
                                </a>
                            </motion.div>
                        </Col>
                    </Row>

                    <Row className="pt-5 px-4" ref={recommendRef}>
                        <Col className="col-sm-6 mt-auto mb-auto">
                            <motion.div
                                initial={{ x: -200, opacity: 0 }}
                                animate={recommendInView ? { x: 0, opacity: 1 } : {}}
                                transition={{ duration: 1 }}
                            >
                                <h3 className="text-blue fs38px mb-3 fw-bold">
                                    Need a new label printer? Bundle and Save
                                </h3>
                                <p className="fs17px">
                                    A complete label printing solution that works perfectly with X LabelSync Pro
                                    on Windows and macOS. The mydpi direct-thermal printer features
                                    300 dots-per-inch, ideal for barcodes and tiny text. Easy replacement
                                    and alternative to Recommen Zebra ZD421 300dpi.
                                </p>
                                <a
                                    href="#"
                                    className="btn trusted-btn bg-blue text-white px-4 pt-2 pb-2 fw-bold fs17px mt-2"
                                >
                                    Recommended Label Printer 👉
                                </a>
                            </motion.div>
                        </Col>
                        <Col className="col-sm-6 px-4 text-end">
                            {/* <motion.img
                                src="https://label.live/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F111664%2F480x316%2F7d7706418b%2Fmydpi-label-animation-r2.gif&w=1920&q=75"
                                width="400px"
                                className="img-fluid"
                                initial={{ x: 200, opacity: 0 }}
                                animate={recommendInView ? { x: 0, opacity: 1 } : {}}
                                transition={{ duration: 1 }}
                            /> */}
                        </Col>
                    </Row>

                    <Row className="pt-5 px-4 text-center" ref={adviceRef}>
                        <motion.div
                            className="col-sm-12 text-center"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={adviceInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="fw-bold text-blue">Need more advice on what is right for you?</h2>
                            <a href="/contact-us" className="btn bg-white text-blue fw-bold cont-btn fs19px">
                                Contact us
                            </a>
                        </motion.div>
                    </Row>
                </Container>
            </div>

            <Container className="pt-5 pb-5">
                <Row className="pt-2 pb-2 px-4">
                    <Col className="col-sm-6 icon-box pt-4 pb-4 m-auto">
                        <Col className="media">
                            <Col className="media-left">
                                <i className="fa fa-bank"></i>
                            </Col>
                            <Col className="media-body">
                                <h4 className="media-heading"> Fun and Easy to Learn </h4>
                                <p>  Like cooking in your own kitchen—everything has a place </p>
                            </Col>
                        </Col>
                    </Col>
                    <Col className="col-sm-6 icon-box pt-4 pb-4 m-auto">
                        <Col className="media">
                            <Col className="media-left">
                                <i class="fa fa-file-text-o"></i>
                            </Col>
                            <Col className="media-body">
                                <h4 className="media-heading"> Driverless Thermal Printing </h4>
                                <p> X LabelSync Pro directly supports popular thermal printers via USB </p>
                            </Col>
                        </Col>
                    </Col>

                    <Col className="col-sm-6 icon-box pt-4 pb-4 m-auto">
                        <Col className="media">
                            <Col className="media-left">
                                <i className="fa fa-print"></i>
                            </Col>
                            <Col className="media-body">
                                <h4 className="media-heading"> Recommended Label Printer </h4>
                                <p>   Need a new label printer? Bundle and Save </p>
                            </Col>
                        </Col>
                    </Col>

                    <Col className="col-sm-6 icon-box pt-4 pb-4 m-auto">
                        <Col className="media">
                            <Col className="media-left">
                                <i class="fa fa-paint-brush"></i>
                            </Col>
                            <Col className="media-body">
                                <h4 className="media-heading"> Full Color or Black & White </h4>
                                <p> Works with one-color thermal printers and full-color inkjet and laser printers </p>
                            </Col>
                        </Col>
                    </Col>
                </Row>
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
                                <li><a href="/contact-us"> Contact </a></li>

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
                            <h6 className="mt-3 text-white fw-light" style={{ 'font-size': "13px" }}>&copy; Copyrights 2025 XLabelSync Pro. All Right Reserved  </h6>
                        </Col>
                    </Row>
                </Container>
            </Container>

        </Layout>
    );
};

export default Landing;
