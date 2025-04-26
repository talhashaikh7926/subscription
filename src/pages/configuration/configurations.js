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
    Divider,
    Tabs
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    getLocationsSquare,
    getLocationsShopify,
} from "../../redux/actions/location.action";
import {
    configToken,
    getConfig,
} from "../../redux/actions/configuration.action";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const Configurations = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { location, Shopifylocation, getConfiguration, getUserInfo } =
        useSelector((state) => state);
    const token = JSON.parse(localStorage.getItem("userInfo"));

    useEffect(() => {
        dispatch(getLocationsSquare(token?.user_name));
        dispatch(getLocationsShopify(token?.user_name));
        dispatch(getConfig(token?.user_name));
    }, [dispatch, token?.user_name]);

    useEffect(() => {
        if (getConfiguration?.payload) {
            form.setFieldsValue({
                squareToken: getConfiguration.payload.squareToken,
                squareLocation: getConfiguration.payload.squareLocationId,
                storeNameSquare: getConfiguration.payload.storeNameSquare,
                shopifyToken: getConfiguration.payload.shopifyToken,
                shopifyLocation: getConfiguration.payload.shopifyLocationId,
                storeNameShopify: getConfiguration.payload.storeNameShopify,
            });
        }
    }, [getConfiguration?.payload, form]);

    const handleShopifySubmit = () => {
        const data = {
            username: token?.user_name,
            shopifyToken: form.getFieldValue("shopifyToken"),
            storeName: form.getFieldValue("storeNameShopify"),
            shopifyLocationId: form.getFieldValue("shopifyLocation"),

        };

        dispatch(configToken(data)).then((res) => {
            if (res.type === "TOKEN_SUCCESS") {
                notification.success({
                    message: "Shopify configuration saved!",
                    className: "toast-success",
                    placement: "top",
                });
                dispatch(getConfig(token?.user_name));
                dispatch(getLocationsShopify(token?.user_name));
            } else {
                notification.error({
                    message: res?.message,
                    className: "toast-error",
                    placement: "top",
                });
            }
        });
    };

    const handleSquareSubmit = () => {
        const data = {
            username: token?.user_name,
            squareToken: form.getFieldValue("squareToken"),
            storeName: form.getFieldValue("storeNameSquare"),
            squareLocationId: form.getFieldValue("squareLocation"),

        };

        console.log(data,'test square');
        

        dispatch(configToken(data)).then((res) => {
            if (res.type === "TOKEN_SUCCESS") {
                notification.success({
                    message: "Square configuration saved!",
                    className: "toast-success",
                    placement: "top",
                });
                dispatch(getConfig(token?.user_name));
                dispatch(getLocationsSquare(token?.user_name));
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
            style={{
                padding: "20px",
                minHeight: "100vh",
                backgroundColor: "#f0f2f5",
            }}
        >
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

                    <Tabs
                        defaultActiveKey="1"
                        tabBarStyle={{
                            fontWeight: 'bold',
                            fontSize: '16px',
                            backgroundColor: '#004e92',
                            color: '#fff',
                            borderRadius: '8px',
                            padding: '10px',
                        }}
                        tabBarGutter={20}
                        style={{
                            marginTop: '20px',
                            borderRadius: '8px',
                            backgroundColor: '#fff',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >











                        {/* Shopify Tab */}
                        <TabPane
                            tab="Shopify Configuration"
                            key="1"
                            style={{
                                backgroundColor: '#f9f9f9',
                                padding: '20px',
                                borderRadius: '8px',
                                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
                            }}
                        >
                            <Form form={form} layout="vertical">
                                <Form.Item label={
                                    <span style={{ fontWeight: "bold", color: "#004e92" }}>
                                        Shopify Store Name
                                    </span>
                                } name="storeNameShopify">
                                    <Input placeholder="e.g. shopbellso" style={{ borderRadius: '8px' }} />
                                </Form.Item>

                                <Row gutter={16}>
                                    <Col span={18}>
                                        <Form.Item
                                            label={
                                                <span style={{ fontWeight: "bold", color: "#004e92" }}>
                                                    Shopify Token
                                                </span>
                                            }
                                            name="shopifyToken"
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
                                            onClick={handleShopifySubmit}
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
                                        <Form.Item label={
                                            <span style={{ fontWeight: "bold", color: "#004e92" }}>
                                                Shopify Location
                                            </span>
                                        } name="shopifyLocation">
                                            <Select
                                                placeholder="Select Shopify Location"
                                                optionFilterProp="children"
                                                showSearch
                                                style={{ borderRadius: '8px' }}
                                            >
                                                {Array.isArray(Shopifylocation?.payload?.result) && Shopifylocation?.payload?.result.length > 0 ? (
                                                    Shopifylocation.payload.result.map((val, idx) => (
                                                        <Option key={idx} value={val.id}>
                                                            {val.name}
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
                                            onClick={handleShopifySubmit}
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
                        </TabPane>




                        {/* Square Tab */}
                        <TabPane
                            tab="Square Configuration"
                            key="2"
                            style={{
                                backgroundColor: '#f9f9f9',
                                padding: '20px',
                                borderRadius: '8px',
                                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
                            }}
                        >
                            <Form form={form} layout="vertical">
                                <Form.Item label={
                                    <span style={{ fontWeight: "bold", color: "#004e92" }}>
                                        Square Store Name
                                    </span>
                                } name="storeNameSquare">
                                    <Input placeholder="e.g. Belso Discount" style={{ borderRadius: '8px' }} />
                                </Form.Item>

                                <Row gutter={16}>
                                    <Col span={18}>
                                        <Form.Item
                                            label={
                                                <span style={{ fontWeight: "bold", color: "#004e92" }}>
                                                    Square Token
                                                </span>
                                            }
                                            name="squareToken"
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
                                            onClick={handleSquareSubmit}
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
                                            name="squareLocation"
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
                                            onClick={handleSquareSubmit}
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
                        </TabPane>





                    </Tabs>

                </div>
            </Content>
        </Layout>
    );
};

export default Configurations;
