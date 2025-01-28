import React, { useState, useEffect } from "react";
import {
    Layout,
    Form,
    Input,
    Button,
    Typography,
    Select,
    Row,
    Col,
    notification,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getLocations } from "../../redux/actions/location.action";
import { configToken, getConfig } from "../../redux/actions/configuration.action";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const Configurations = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { location, getConfiguration, getUserInfo } = useSelector((state) => state);
    const token = JSON.parse(localStorage.getItem("userInfo"));

    useEffect(() => {
        dispatch(getLocations(token?.user_name));
        dispatch(getConfig(token?.user_name));
    }, [dispatch, token?.user_name]);

    useEffect(() => {
        if (getConfiguration?.payload) {
            form.setFieldsValue({
                token: getConfiguration.payload.squareToken,
                location: getConfiguration.payload.squareLocationId,
                store: getConfiguration.payload.storeName,
            });
        }
    }, [getConfiguration?.payload, form]);

    const handleTokenSubmit = () => {
        const tokenValue = form.getFieldValue("token");
        const storeValue = form.getFieldValue("store");
        const locationValue = form.getFieldValue("location");
        dispatch(configToken({ username: token?.user_name, token: tokenValue, storeName: storeValue, location: locationValue })).then((res) => {
            if (res.type === "TOKEN_SUCCESS") {
                notification.success({
                    message: res?.payload?.message,
                    className: "toast-success",
                    placement: "top",
                });
                dispatch(getConfig(token?.user_name));
            } else {
                notification.error({
                    message: res?.message,
                    className: "toast-error",
                    placement: "top",
                });
            }
        });
    };

    const handleLocationSubmit = () => {
        const locationValue = form.getFieldValue("location");
        const tokenValue = form.getFieldValue("token");
        const storeValue = form.getFieldValue("store");
        dispatch(configToken({ username: token?.user_name, token: tokenValue, storeName: storeValue, location: locationValue })).then((res) => {
            if (res.type === "TOKEN_SUCCESS") {
                notification.success({
                    message: res?.payload?.message,
                    className: "toast-success",
                    placement: "top",
                });
                dispatch(getConfig(getUserInfo?.payload?.username));
            } else {
                notification.error({
                    message: res?.message,
                    className: "toast-error",
                    placement: "top",
                });
            }
        });
    };

    return (
        <Layout style={{ padding: "20px", minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
            <Content
                style={{
                    background: "linear-gradient(135deg, #000428 0%, #004e92 30%, #6db3f2 60%, #e5e5e5 100%)",
                    padding: "40px",
                    borderRadius: "16px",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                }}
            >
                <div
                    style={{
                        maxWidth: "800px",
                        margin: "0 auto",
                        backgroundColor: "#ffffff",
                        padding: "20px",
                        borderRadius: "12px",
                        border: "1px solid #f0f0f0",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Title
                        level={3}
                        style={{
                            textAlign: "center",
                            color: "#004e92",
                            fontWeight: "bold",
                            marginBottom: "20px",
                        }}
                    >
                        Configuration
                    </Title>
                    <Form form={form} layout="vertical">
                        <Row gutter={16}>
                            <Col span={18}>
                                <Form.Item
                                    label={
                                        <span style={{ fontWeight: "bold", color: "#004e92" }}>
                                            Store Name
                                        </span>
                                    }
                                    name="store"
                                >
                                    <Input
                                        style={{
                                            height: "40px",
                                            fontSize: "14px",
                                            borderRadius: "8px",
                                            border: "1px solid #d9d9d9",
                                            padding: "0 12px",
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={18}>
                                <Form.Item
                                    label={
                                        <span style={{ fontWeight: "bold", color: "#004e92" }}>
                                            Square Token
                                        </span>
                                    }
                                    name="token"
                                >
                                    <Input
                                        style={{
                                            height: "40px",
                                            fontSize: "14px",
                                            borderRadius: "8px",
                                            border: "1px solid #d9d9d9",
                                            padding: "0 12px",
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6} style={{ display: "flex", alignItems: "center" }}>
                                <Button
                                    onClick={handleTokenSubmit}
                                    style={{
                                        width: "100%",
                                        height: "40px",
                                        background: "linear-gradient(135deg, #004e92, #13c2c2)",
                                        color: "#fff",
                                        fontWeight: "bold",
                                        borderRadius: "8px",
                                        border: "none",
                                    }}
                                >
                                    Save
                                </Button>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={18}>
                                <Form.Item
                                    label={
                                        <span style={{ fontWeight: "bold", color: "#004e92" }}>
                                            Square Location
                                        </span>
                                    }
                                    name="location"
                                >
                                    <Select
                                        placeholder="Select Location"
                                        optionFilterProp="children"
                                        showSearch
                                        style={{
                                            height: "40px",
                                            fontSize: "14px",
                                            borderRadius: "8px",
                                        }}
                                    >
                                        {Array.isArray(location?.payload) && location.payload.length > 0 ? (
                                            location.payload.map((val, idx) => (
                                                <Option key={idx} value={val.location_id}>
                                                    {val.location_name}
                                                </Option>
                                            ))
                                        ) : (
                                            <Option value="none" disabled>
                                                No locations available
                                            </Option>
                                        )}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={6} style={{ display: "flex", alignItems: "center" }}>
                                <Button
                                    onClick={handleLocationSubmit}
                                    style={{
                                        width: "100%",
                                        height: "40px",
                                        background: "linear-gradient(135deg, #004e92, #13c2c2)",
                                        color: "#fff",
                                        fontWeight: "bold",
                                        borderRadius: "8px",
                                        border: "none",
                                    }}
                                >
                                    Save
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Content>
        </Layout>
    );
};

export default Configurations;
