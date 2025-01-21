import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Card, Layout, Row, Col, Typography, Divider, notification } from 'antd';
import { adminLogin, registerLogin } from '../../redux/actions/login.action'

import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title } = Typography;

const Login = () => {

    const [isRegister, setIsRegister] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = values => {
        if (isRegister) {
            dispatch(registerLogin(values)).then((res) => {
                console.log(res,"asd");
                setIsRegister(false);
                if (res.type === "REGISTER_SUCCESS") {
                    notification.success({
                        message: res.message,
                        className: "toast-success",
                        placement: "top"
                    });
                    setIsRegister(false);
                } else {
                    notification.error({
                        message: res.payload?.data?.error,
                        className: "toast-error",
                        placement: "top"
                    });
                }
            });

        } else {
            dispatch(adminLogin(values)).then((res) => {
                if (res.message === "Login successful") {
                    localStorage.setItem('userInfo', JSON.stringify(res));
                    localStorage.setItem('token', JSON.stringify(res?.access_token));
                    notification.success({
                        message: res.message,
                        className: "toast-success",
                        placement: "top"
                    });
                    navigate("/dashboard");
                    window.location.reload();
                } else {
                    notification.error({
                        message: res.message,
                        className: "toast-error",
                        placement: "top"
                    });
                }
            });
        }
    };


    return (
        <Layout
            style={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f0f2f5',
            }}
        >
            <Content
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '100%',
                }}
            >
                <Card
                    style={{
                        width: '100%',
                        maxWidth: '600px',
                        padding: '40px 60px',
                        textAlign: 'center',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Title level={2} style={{ fontWeight: 'bold', marginBottom: 0 }}>
                        {isRegister ? 'Register' : 'Login'}
                    </Title>
                    <Divider style={{ marginBottom: 40 }} />
                    <Form name={isRegister ? 'register' : 'login'} layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            label={<span style={{ fontSize: '20px' }}>Email</span>}
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input
                                placeholder="Enter your email"
                                style={{ width: '100%', height: '50px', fontSize: '20px' }}
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span style={{ fontSize: '20px' }}>Password</span>}
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password
                                placeholder="Enter your password"
                                style={{ width: '100%', height: '50px', fontSize: '20px' }}
                            />
                        </Form.Item>

                        {isRegister && (
                            <>
                                <Form.Item
                                    label={<span style={{ fontSize: '20px' }}>Confirm Password</span>}
                                    name="confirmPassword"
                                    rules={[{ required: true, message: 'Please confirm your password!' }]}
                                >
                                    <Input.Password
                                        placeholder="Confirm your password"
                                        style={{ width: '100%', height: '50px', fontSize: '20px' }}
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Row gutter={16}>
                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                label={<span style={{ fontSize: '20px' }}>First Name</span>}
                                                name="first_name"
                                                rules={[{ required: true, message: 'Please input your first name!' }]}
                                            >
                                                <Input
                                                    placeholder="Enter your first name"
                                                    style={{ width: '100%', height: '50px', fontSize: '20px' }}
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                label={<span style={{ fontSize: '20px' }}>Last Name</span>}
                                                name="last_name"
                                                rules={[{ required: true, message: 'Please input your last name!' }]}
                                            >
                                                <Input
                                                    placeholder="Enter your last name"
                                                    style={{ width: '100%', height: '50px', fontSize: '20px' }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form.Item>

                                <Form.Item
                                    label={<span style={{ fontSize: '20px' }}>Mobile Number</span>}
                                    name="mobile_no"
                                    rules={[{ required: true, message: 'Please input your mobile number!' }]}
                                >
                                    <Input
                                        placeholder="Enter your mobile number"
                                        style={{ width: '100%', height: '50px', fontSize: '20px' }}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={<span style={{ fontSize: '20px' }}>Username</span>}
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input
                                        placeholder="Enter your username"
                                        style={{ width: '100%', height: '50px', fontSize: '20px' }}
                                    />
                                </Form.Item>
                            </>
                        )}

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{
                                    width: '100%',
                                    backgroundColor: '#13c2c2',
                                    height: '50px',
                                    fontSize: '20px',
                                }}
                            >
                                {isRegister ? 'Register' : 'Login'}
                            </Button>
                        </Form.Item>
                    </Form>

                    <Divider />
                    <Typography.Text style={{ fontSize: '16px' }}>
                        {isRegister ? "Already have an account? " : "Don't have an account? "}
                        <a
                            onClick={() => setIsRegister(!isRegister)}
                            style={{
                                color: '#2c63cc',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                textDecoration: 'underline',
                            }}
                        >
                            {isRegister ? 'Login' : 'Become a User'}
                        </a>
                    </Typography.Text>
                </Card>
            </Content>
        </Layout>
    );
};

export default Login;
