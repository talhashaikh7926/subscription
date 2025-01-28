import React from "react";
import { Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const ContactUs = () => {
    return (
        <Container className="bg-transparent">
            {/* Header Section */}
            <Container className="header-absolute position-absolute mx-auto">
                <Row>
                    <Col className="col-sm-12">
                        <Navbar expand="lg" className="w-100">
                            <Navbar.Brand href="/" className="fs25px text-white"> <strong> LabelPro </strong></Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                                <Nav className="me-auto">
                                    <Nav.Link href="#" className="text-white"> SignUp </Nav.Link>
                                    <Nav.Link href="#" className="text-white"> Login </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </Col>
                </Row>
            </Container>

            {/* Main Content */}
            <Container fluid className="pt-5 pb-5 bg-gradiant relative">
                <Container className="pt-5">
                    <Row>
                        <Col sm={7}>
                            <h3 className="text-white">Got a question about Label LIVE?</h3>
                            <p className="text-white">Try searching for an answer or get in touch today.</p>
                        </Col>

                        <Col sm={5}>
                            {/* React-Bootstrap Form */}
                            <Form>
                                <Form.Group controlId="formName" className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="Enter your name"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formMessage" className="mb-3">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="message"
                                        rows={4}
                                        placeholder="Type your message"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formPreference" className="mb-3">
                                    <Form.Label>Contact Preference</Form.Label>
                                    <div>
                                        <Form.Check
                                            type="radio"
                                            name="preference"
                                            label="Option 1"
                                            value="option1"
                                        />
                                        <Form.Check
                                            type="radio"
                                            name="preference"
                                            label="Option 2"
                                            value="option2"
                                        />
                                        <Form.Check
                                            type="radio"
                                            name="preference"
                                            label="Option 3"
                                            value="option3"
                                        />
                                    </div>
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </Container>
    );
};

export default ContactUs;
