import React, { useState, useEffect } from "react";
import {
    Layout,
    Form,
    Input,
    Button,
    Table,
    Typography,
    Space,
    notification,
    Select,
    Row,
    Col,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getLocations } from "../../redux/actions/location.action"
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

    // Set form values when getConfig API response is available
    useEffect(() => {
        if (getConfiguration?.payload) {
            form.setFieldsValue({
                token: getConfiguration.payload.squareToken,
                location: getConfiguration.payload.squareLocationId,
                store: getConfiguration.payload.storeName
            });
        }
    }, [getConfiguration?.payload, form]);

    // Handle Token submission
    const handleTokenSubmit = () => {
        const tokenValue = form.getFieldValue("token");
        const storeValue = form.getFieldValue("store");
        const locationValue = form.getFieldValue("location");
        dispatch(configToken({ username: token?.user_name, token: tokenValue, storeName: storeValue, location: locationValue })).then((res) => {
      

            if (res.type == "TOKEN_SUCCESS") {
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

    // Handle Location submission
    const handleLocationSubmit = () => {
        const locationValue = form.getFieldValue("location");
        const tokenValue = form.getFieldValue("token");
        const storeValue = form.getFieldValue("store");
        dispatch(configToken({ username: token?.user_name, token: tokenValue, storeName: storeValue, location: locationValue })).then((res) => {
          

            if (res.type == "TOKEN_SUCCESS") {
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
        <Layout
            style={{ padding: "20px", minHeight: "100vh", backgroundColor: "white" }}
        >
            <Content
                style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "8px",
                }}
            >
                <div
                    style={{
                        maxWidth: "800px",
                        margin: "20px 0",
                        backgroundColor: "white",
                        padding: "20px",
                        borderRadius: "16px",
                        border: "1px solid #f0f0f0",
                    }}
                >
                    <Title level={3}>Configuration</Title>
                    <hr />
                    <Form form={form} layout="vertical">
                        <Row gutter={16}>
                            <Col span={18}>
                                <Form.Item label="Store Name" name="store">
                                    <Input />
                                </Form.Item>
                            </Col>

                        </Row>
                        <Row gutter={16}>
                            <Col span={18}>
                                <Form.Item label="Square Token" name="token">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6} style={{ display: "flex", alignItems: "center" }}>
                                <Button

                                    onClick={handleTokenSubmit}
                                    style={{ width: "100%", height: "40px" }}
                                >
                                    Save
                                </Button>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={18}>
                                <Form.Item label="Square Location" name="location">
                                    <Select placeholder="Select Location"
                                        optionFilterProp="children"
                                        showSearch>
                                        {location?.payload?.map((val, idx) => (
                                            <Option key={idx} value={val.location_id}>
                                                {val.location_name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={6} style={{ display: "flex", alignItems: "center" }}>
                                <Button

                                    onClick={handleLocationSubmit}
                                    style={{ width: "100%", height: "40px" }}
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