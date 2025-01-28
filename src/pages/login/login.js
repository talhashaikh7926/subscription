import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Card, Layout, Typography, Divider, notification, Row, Col } from "antd";
import { adminLogin, registerLogin } from "../../redux/actions/login.action";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title } = Typography;

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    if (isRegister) {
      dispatch(registerLogin(values)).then((res) => {
        console.log(res,"check");
        
        if (res?.message === "User registered successfully!") {
          notification.success({
            message: res.message,
            placement: "top",
          });
          setIsRegister(false);
        } else {
          notification.error({
            message: res.payload?.data?.error || "Registration failed!",
            placement: "top",
          });
        }
      });
    } else {
      dispatch(adminLogin(values)).then((res) => {
        if (res.message === "Login successful") {
          localStorage.setItem("userInfo", JSON.stringify(res));
          localStorage.setItem("token", JSON.stringify(res?.access_token));
          notification.success({
            message: res.message,
            placement: "top",
          });
          navigate("/dashboard");
        } else {
          notification.error({
            message: res.message || "Login failed!",
            placement: "top",
          });
        }
      });
    }
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #000428 0%, #004e92 30%, #6db3f2 60%, #e5e5e5 100%)",
      }}
    >
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          padding: "20px",
        }}
      >
        <Card
          style={{
            width: "100%",
            maxWidth: "550px",
            padding: "30px",
            textAlign: "center",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
            borderRadius: "10px",
            backgroundColor: "#fff",
          }}
        >
          <Title
            level={2}
            style={{
              fontWeight: "bold",
              marginBottom: 0,
              color: "#004e92",
            }}
          >
            {isRegister ? "Create Account" : "Welcome Back!"}
          </Title>
          <Divider style={{ marginBottom: 40 }} />
          <Form
            name={isRegister ? "register" : "login"}
            layout="vertical"
            onFinish={onFinish}
            style={{ fontSize: "16px" }}
          >
            {/* Common fields for both login and registration */}
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                placeholder="Enter your email"
                style={{ height: "45px", fontSize: "16px", borderRadius: "5px" }}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password
                placeholder="Enter your password"
                style={{ height: "45px", fontSize: "16px", borderRadius: "5px" }}
              />
            </Form.Item>

            {/* Additional fields for registration */}
            {isRegister && (
              <>
                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  rules={[{ required: true, message: "Please confirm your password!" }]}
                >
                  <Input.Password
                    placeholder="Confirm your password"
                    style={{ height: "45px", fontSize: "16px", borderRadius: "5px" }}
                  />
                </Form.Item>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="First Name"
                      name="first_name"
                      rules={[{ required: true, message: "Please input your first name!" }]}
                    >
                      <Input
                        placeholder="Enter your first name"
                        style={{ height: "45px", fontSize: "16px", borderRadius: "5px" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Last Name"
                      name="last_name"
                      rules={[{ required: true, message: "Please input your last name!" }]}
                    >
                      <Input
                        placeholder="Enter your last name"
                        style={{ height: "45px", fontSize: "16px", borderRadius: "5px" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="Mobile Number"
                  name="mobile_no"
                  rules={[{ required: true, message: "Please input your mobile number!" }]}
                >
                  <Input
                    placeholder="Enter your mobile number"
                    style={{ height: "45px", fontSize: "16px", borderRadius: "5px" }}
                  />
                </Form.Item>

                <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: "Please input your username!" }]}
                >
                  <Input
                    placeholder="Enter your username"
                    style={{ height: "45px", fontSize: "16px", borderRadius: "5px" }}
                  />
                </Form.Item>
              </>
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  height: "50px",
                  fontSize: "18px",
                  borderRadius: "5px",
                  background: "linear-gradient(135deg, #004e92 30%, #13c2c2 100%)",
                  border: "none",
                }}
              >
                {isRegister ? "Register" : "Login"}
              </Button>
            </Form.Item>
          </Form>

          <Divider />
          <Typography.Text style={{ fontSize: "16px", color: "#666" }}>
            {isRegister ? "Already have an account? " : "New here? "}
            <a
              onClick={() => setIsRegister(!isRegister)}
              style={{
                color: "#004e92",
                cursor: "pointer",
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              {isRegister ? "Login" : "Create Account"}
            </a>
          </Typography.Text>
        </Card>
      </Content>
    </Layout>
  );
};

export default Login;
