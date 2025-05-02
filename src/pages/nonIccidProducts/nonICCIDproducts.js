import React, { useState, useEffect } from 'react';
import { Layout, Form, Input, Button, Typography, Table, Card, Row, Col, notification, Modal, Select, Spin, Tabs } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { CheckOutlined } from '@ant-design/icons';
import { subscriptionPlan, checkout } from '../../redux/actions/subscriptionPlan.action'
import { getTemplate, getCategories, getBarcodeDetail, printTag, pushSquare, getProductType, pushShopify } from '../../redux/actions/barcode.action'
import { getConfig } from "../../redux/actions/configuration.action";
import AdminDashboard from '../../components/adminDashboard/dashboard';


const { Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

const NonIccidProduct = () => {
    const [form] = Form.useForm();
    const [activeTab, setActiveTab] = useState("print");
    const [imageUrl, setImageUrl] = useState("");
    const [squareImageUrl, setSquareImageUrl] = useState([]);
    const [storeData, setStoreData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isStoreModalVisible, setIsStoreModalVisible] = useState(false);

    const dispatch = useDispatch();
    const { Shopifylocation, getSubscriptionPlan, getUserInfo, templates, getCategory, barcodeDetails, getConfiguration, getShopifyType } = useSelector((state) => state);

    const token = JSON.parse(localStorage.getItem("userInfo"));

    useEffect(() => {
        dispatch(subscriptionPlan());
        dispatch(getTemplate());
        dispatch(getConfig(token?.user_name));
        dispatch(getCategories(token?.user_name));
        dispatch(getProductType(token?.user_name));
        form.setFieldsValue({
            inwardDate: moment(),
        });
    }, [dispatch]);

    const containerStyle = {
        width: "100%",
        maxWidth: "1000px",
        margin: "-4px 50px 18px -25px"
    };


    const calculatePrice = () => {
        const { retailPrice, operations, ourPrice } = form.getFieldsValue();


        if (!retailPrice || !operations || !ourPrice) {
            alert("Please fill in all required fields.");
            return;
        }
        const retail = parseFloat(retailPrice.replace("$", "").trim());
        const operationValue = parseFloat(ourPrice.trim());


        let finalPrice;

        switch (operations) {
            case "percentage_addition":
                finalPrice = retail + (retail * operationValue) / 100;
                break;
            case "flat_addition":
                finalPrice = retail + operationValue;
                break;
            case "percentage_subtraction":
                finalPrice = retail - (retail * operationValue) / 100;
                break;
            case "flat_substraction":
                finalPrice = retail - operationValue;
                break;
            default:
                alert("Invalid operation selected.");
                return;
        }


        form.setFieldsValue({ finalPrice: finalPrice.toFixed(2) });
    };

    const subscribePlan = (data) => {

        dispatch(checkout({ ...data, username: getUserInfo?.payload?.username })).then((res) => {
            console.log(res, "checkout");

            if (res.type === "SUBSCRIPTION_SUCCESS") {
                notification.success({
                    message: "Proceed to Checkout",
                    className: "toast-success",
                    placement: "top"
                });
                window.location.href = res?.payload?.checkout_url
            }
            else {
                notification.error({
                    message: "Something went wrong!",
                    className: "toast-error",
                    placement: "top"
                });
            }
        })


    }

    const getDetail = () => {
        const BarCodeValue = form.getFieldValue("barCode");
        dispatch(getBarcodeDetail(BarCodeValue)).then((res) => {
            setSquareImageUrl(res?.product_images)
            setStoreData(res?.stores || []);
            form.setFieldsValue({
                Desc: res?.product_description,
                productName: res?.product_title,
                retailPrice: res?.retail_price
            });
        })
    }
    const templateFormat = async () => {
        const { productName, retailPrice, finalPrice, barCode, tag } = form.getFieldsValue();
        const [id, size] = tag.split(" ");
        const formattedSize = `${size}`;
        if (!tag) {
            notification.error({
                message: "Validation Error",
                description: "Please Select Tags.",
                placement: "top",
            });
            return;
        }

        const data = {
            productName,
            retailPrice,
            finalPrice,
            barCode,
            id: id,

        };

        try {
            const response = await dispatch(printTag(token.user_name, data));

            if (response.type === "PRINT_TAG_SUCCESS") {
                notification.success({
                    message: "Request Successful",
                    description: "The tag has been printed successfully.",
                    className: "toast-success",
                    placement: "top",
                });

                setImageUrl(response?.payload?.url)
                showZPLPreviewModal(response?.payload?.url, formattedSize);

            } else {
                notification.error({
                    message: "Something Went Wrong!",
                    description: response?.error || "Please try again later.",
                    className: "toast-error",
                    placement: "top",
                });
            }
        } catch (error) {
            notification.error({
                message: "API Call Failed",
                description: "There was an issue while communicating with the server. Please try again later.",
                className: "toast-error",
                placement: "top",
            });
            console.error("API call error:", error);
        }
    };


    const showZPLPreviewModal = (imageUrl, formattedSize) => {
        Modal.info({
            content: (
                <div style={{ textAlign: "center" }}>
                    <img
                        src={imageUrl}
                        alt="Barcode Preview"
                        style={{
                            maxWidth: "80%",
                            maxHeight: "80vh",
                            marginBottom: "20px",
                        }}
                    />
                    <Button
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "90px",
                            width: "220px",
                            fontSize: "24px",
                            fontWeight: "bold",
                            borderRadius: "12px",
                            background: "linear-gradient(90deg, #b0bec5, #eceff1)",
                            border: "none",
                            color: "#000",
                            cursor: "pointer",
                            transition: "transform 0.2s, box-shadow 0.2s",
                        }}
                        onClick={() => {
                            const printWindow = window.open("", "_blank");
                            printWindow.document.write(`
                                <html>
                                    <head>
                                        <style>
                                            @page {
                                                margin: 0;
                                            }
                                            body {
                                                margin: 0;
                                                padding: 0;
                                                display: flex;
                                                align-items: flex-start;
                                                justify-content: center;
                                                height: 100vh;
                                               
                                    
                                            }
                                            img {
                                              
                                                max-width: ${formattedSize === "3x2" ? "3in" : "2in"};
                                                max-height: ${formattedSize === "3x2" ? "2in" : "1in"};
                                                object-fit: contain;
                                                }
                                        </style>
                                    </head>
                                    <body>
                                        <img src="${imageUrl}" />
                                    </body>
                                </html>
                            `);

                            printWindow.document.close();
                            printWindow.focus();
                            setTimeout(() => {
                                printWindow.print();
                                printWindow.close();
                            }, 500);
                        }}
                    >
                        Print
                    </Button>
                </div>
            ),
            width: "60vw",
            centered: true,
            style: { top: 20 },
            onOk() { },
        });

    };

    const squareCall = async () => {

        const { productName, Desc, categories, finalPrice, quantity, barCode } = form.getFieldsValue();

        if (!barCode) {
            notification.error({
                message: "Validation Error",
                description: "Please Input BarCode.",
                placement: "top",
            });
            return;
        }


        const data = {
            barCode,
            finalPrice,
            productName,
            Desc,
            categories,
            quantity,
            squareImageUrl,
        };

        try {
            const response = await dispatch(pushSquare(token.user_name, data));

            if (response.type === "SQUARE_SUCCESS") {
                notification.success({
                    message: "Request Successful",
                    className: "toast-success",
                    placement: "top",
                });

                console.log(response, "Data");
                form.resetFields();

            } else {
                notification.error({
                    message: "Something Went Wrong!",
                    description: response?.message || "Please try again later.",
                    className: "toast-error",
                    placement: "top",
                });
            }
        } catch (error) {
            notification.error({
                message: "API Call Failed",
                description: "There was an issue while communicating with the server. Please try again later.",
                className: "toast-error",
                placement: "top",
            });
            console.error("API call error:", error);
        }

    }

    const pushShopifyCall = async () => {
        const { productName, Desc, productType, finalPrice, quantity, barCode, compareAtPrice, cost, vendor, sku } = form.getFieldsValue();

        if (!barCode) {
            notification.error({
                message: "Validation Error",
                description: "Please Input BarCode.",
                placement: "top",
            });
            return;
        }

        const data = {
            barCode,
            finalPrice,
            productName,
            Desc,
            productType,
            quantity,
            squareImageUrl,
            compareAtPrice,
            cost,
            vendor,
            sku

        };

        try {
            const response = await dispatch(pushShopify(token.user_name, data));

            if (response.type === "SHOPIFY_SUCCESS") {
                notification.success({
                    message: "Request Successful",
                    className: "toast-success",
                    placement: "top",
                });

                console.log(response, "Data");

            } else {
                notification.error({
                    message: "Something Went Wrong!",
                    description: response?.message || "Please try again later.",
                    className: "toast-error",
                    placement: "top",
                });
            }
        } catch (error) {
            notification.error({
                message: "API Call Failed",
                description: "There was an issue while communicating with the server. Please try again later.",
                className: "toast-error",
                placement: "top",
            });
            console.error("API call error:", error);
        }

    }

    const storeColumns = [
        {
            title: 'Currency',
            dataIndex: 'currency',
            key: 'currency',
        },
        {
            title: 'Last Update',
            dataIndex: 'last_update',
            key: 'last_update',
        },
        {
            title: 'Link',
            dataIndex: 'link',
            key: 'link',
            render: (text) => text ? (
                <a href={text} target="_blank" rel="noopener noreferrer">
                    View Store
                </a>
            ) : (
                "-"
            ),
        },
    ];



    const labelStyle = {
        fontSize: "16px",
        fontWeight: "500",
        color: "#555",
        fontFamily: "'Roboto', sans-serif",
        padding: "0 8px",
        display: "block",
        marginBottom: "8px",
    };

    const inputStyle = {
        height: "40px",
        fontSize: "14px",
        width: "100%",
        borderRadius: "8px",
        fontFamily: "'Roboto', sans-serif",
        padding: "0 12px",
        border: "1px solid #d1d1d1",
    };

    const selectStyle = {
        height: "40px",
        fontSize: "14px",
        width: "100%",
        borderRadius: "8px",
        fontFamily: "'Roboto', sans-serif",
    };

    const buttonStyle = {
        width: "100%",
        background: "linear-gradient(135deg, #004e92, #13c2c2)",
        color: "#fff",
        fontWeight: "bold",
        height: "45px",
        borderRadius: "8px",
        border: "none",
    };

    const showModal = () => {
        setIsModalVisible(true);
    };


    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showStoreModal = () => {
        setIsStoreModalVisible(true);
    };

    const handleStoreModalCancel = () => {
        setIsStoreModalVisible(false);
    };


    return (

        <Layout >
            <Content style={{
                backgroundColor: "#ffffff",
                padding: "40px",
                borderRadius: "16px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                maxWidth: "1200px",
                margin: "0 auto",
            }}
            >
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",               // Allow wrapping on smaller screens
                        alignItems: "center",           // Vertically center items
                        justifyContent: "space-between", // Space between heading and buttons
                        rowGap: "16px",                 // Vertical spacing on wrap
                        marginBottom: "40px",
                    }}
                >
                    {/* Title */}
                    <Title
                        level={2}
                        style={{
                            color: "#004e92",
                            fontFamily: "'Roboto', sans-serif",
                            fontWeight: "700",
                            margin: 0,
                            fontSize: "28px",
                        }}
                    >
                        X LabelSync Pro
                    </Title>

                    {/* Conditional Buttons */}
                    {(storeData?.length > 0 || squareImageUrl?.length > 0) && (
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "12px",
                                justifyContent: "flex-start",
                            }}
                        >
                            {storeData?.length > 0 && (
                                <Button
                                    type="primary"
                                    onClick={showStoreModal}
                                    style={{
                                        background: "linear-gradient(135deg, #13c2c2, #004e92)",
                                        border: "none",
                                        padding: "0 20px",
                                        height: "40px",
                                        fontWeight: "600",
                                        fontSize: "15px",
                                        borderRadius: "20px",
                                        fontFamily: "'Roboto', sans-serif",
                                        boxShadow: "0 4px 12px rgba(0, 78, 146, 0.3)",
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    View Store
                                </Button>
                            )}
                            {squareImageUrl?.length > 0 && (
                                <Button
                                    type="primary"
                                    onClick={showModal}
                                    style={{
                                        background: "linear-gradient(135deg, #13c2c2, #004e92)",
                                        border: "none",
                                        padding: "0 20px",
                                        height: "40px",
                                        fontWeight: "600",
                                        fontSize: "15px",
                                        borderRadius: "20px",
                                        fontFamily: "'Roboto', sans-serif",
                                        boxShadow: "0 4px 12px rgba(0, 78, 146, 0.3)",
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    Preview Images
                                </Button>
                            )}
                        </div>
                    )}
                </div>

                <Row gutter={[16, 16]} justify="center">
                    {getSubscriptionPlan?.loading && getUserInfo?.loading ? (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                minHeight: 'calc(100vh - 160px)',

                            }}
                        >
                            <Spin size="large" style={{ color: 'rgb(19, 194, 194)' }} />
                        </div>
                    ) : (
                        <>

                            {getUserInfo?.payload?.accessible === false ?
                                <>
                                    {getSubscriptionPlan?.payload?.map((plan, index) => (
                                        <Col key={index} xs={24} sm={12} md={8}>
                                            <Card
                                                title={
                                                    <Title
                                                        level={4}
                                                        style={{
                                                            margin: 0,
                                                            color: "#004e92",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        {plan.subscription_currency + " " + plan.subscription_price}
                                                    </Title>
                                                }
                                                bordered={false}
                                                style={{
                                                    borderRadius: "16px",
                                                    textAlign: "center",
                                                    backgroundColor: "#ffffff",
                                                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                                                    transition: "transform 0.3s, box-shadow 0.3s",
                                                    position: "relative",
                                                    overflow: "hidden",
                                                    height: "350px",
                                                    maxWidth: "350px",
                                                    margin: "0 auto",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "space-between",
                                                    paddingBottom: "20px",
                                                }}
                                                hoverable
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = "scale(1.05)";
                                                    e.currentTarget.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.2)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = "scale(1)";
                                                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.15)";
                                                }}
                                            >
                                                {/* Ribbon or Highlight */}
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: 0,
                                                        left: 0,
                                                        height: "8px",
                                                        width: "100%",
                                                        background: "linear-gradient(135deg, #004e92, #13c2c2)",
                                                    }}
                                                ></div>

                                                {/* Card Content */}
                                                <div>
                                                    <Title level={3} style={{ margin: "20px 0", color: "#595959" }}>
                                                        {plan.subscription_name}
                                                    </Title>

                                                    <ul
                                                        style={{
                                                            listStyleType: "none",
                                                            padding: 0,
                                                            textAlign: "left",
                                                            color: "#595959",
                                                            fontSize: "16px",
                                                            lineHeight: "1.8",
                                                        }}
                                                    >
                                                        <li
                                                            style={{
                                                                marginBottom: "10px",
                                                                display: "flex",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            <CheckOutlined style={{ color: "green", marginRight: "8px" }} />
                                                            {"Subscription Duration: " + plan?.subscription_duration + " Days"}
                                                        </li>
                                                    </ul>
                                                </div>

                                                {/* Subscribe Button */}
                                                <Button
                                                    onClick={() => subscribePlan(plan)}
                                                    size="large"
                                                    style={{
                                                        width: "100%",
                                                        background: "linear-gradient(135deg, #004e92, #13c2c2)",
                                                        color: "#fff",
                                                        fontWeight: "bold",
                                                        height: "45px",
                                                        borderRadius: "8px",
                                                        border: "none",
                                                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                                        transition: "background 0.3s",
                                                        marginTop: "auto", // Pushes the button to the bottom
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.background = "linear-gradient(135deg, #003366, #0a9e9e)";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.background = "linear-gradient(135deg, #004e92, #13c2c2)";
                                                    }}
                                                >
                                                    Subscribe
                                                </Button>
                                            </Card>
                                        </Col>
                                    ))}
                                </>


                                :
                                <>

                                    <div
                                        style={containerStyle}
                                    >
                                        <Form form={form} layout="horizontal">
                                            <Row gutter={[16, 16]} align="middle">
                                                {/* Barcode Field */}
                                                <Col xs={24} md={24}>
                                                    <Row align="middle" gutter={[16, 8]}>

                                                        <Col xs={6} md={4}><label
                                                            style={{
                                                                fontSize: "16px",
                                                                fontWeight: "500",
                                                                color: "#555",
                                                                fontFamily: "'Roboto', sans-serif",
                                                                padding: "0 8px",
                                                                display: "block",
                                                                marginBottom: "8px",
                                                            }}
                                                        >
                                                            Barcode:
                                                        </label>
                                                        </Col>
                                                        <Col xs={18} md={20}>
                                                            <Form.Item name="barCode">
                                                                <Input
                                                                    required
                                                                    style={{
                                                                        height: "40px",
                                                                        fontSize: "14px",
                                                                        width: "100%",
                                                                        borderRadius: "8px",
                                                                        fontFamily: "'Roboto', sans-serif",
                                                                        border: "1px solid #d1d1d1",
                                                                        padding: "0 12px",
                                                                    }}
                                                                />
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                </Col>

                                                <Col xs={24} md={24}>
                                                    <Button
                                                        style={{
                                                            width: "100%",
                                                            background: "linear-gradient(135deg, #004e92, #13c2c2)",
                                                            color: "#fff",
                                                            fontWeight: "bold",
                                                            height: "45px",
                                                            borderRadius: "8px",
                                                            border: "none",
                                                            marginBottom: "20px",


                                                        }}
                                                        onClick={getDetail}
                                                    >
                                                        Get Barcode Detail
                                                    </Button>
                                                </Col>

                                                {/* Retail Price Field */}
                                                <Col xs={24} md={24}>
                                                    <Row align="middle" gutter={[16, 8]}>
                                                        <Col xs={6} md={4}>
                                                            <label style={{
                                                                fontSize: "16px",
                                                                fontWeight: "500",
                                                                color: "#555",
                                                                fontFamily: "'Roboto', sans-serif",
                                                                padding: "0 8px",
                                                                display: "block",
                                                                marginBottom: "8px",
                                                            }}>Retail Price:</label>
                                                        </Col>
                                                        <Col xs={18} md={20}>
                                                            <Form.Item name="retailPrice">
                                                                <Input
                                                                    style={{
                                                                        height: "40px",
                                                                        fontSize: "14px",
                                                                        width: "100%",
                                                                        borderRadius: "8px",
                                                                        border: "1px solid #d1d1d1",
                                                                        fontFamily: "'Roboto', sans-serif",
                                                                        padding: "0 12px",
                                                                    }}
                                                                />
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                </Col>

                                                {/* Operations Field */}
                                                <Col xs={24} md={24}>
                                                    <Row align="middle" gutter={[16, 8]}>
                                                        <Col xs={6} md={4}>
                                                            <label style={{
                                                                fontSize: "16px",
                                                                fontWeight: "500",
                                                                color: "#555",
                                                                fontFamily: "'Roboto', sans-serif",
                                                                padding: "0 8px",
                                                                display: "block",
                                                                marginBottom: "8px",
                                                            }}>Operations:</label>
                                                        </Col>
                                                        <Col xs={12} md={14}>
                                                            <Form.Item name="operations">
                                                                <Select
                                                                    style={{
                                                                        width: "100%",
                                                                        height: "30px",
                                                                        fontSize: "14px",
                                                                        borderRadius: "12px",

                                                                        fontFamily: "'Roboto', sans-serif",
                                                                    }}
                                                                    placeholder="Select Operation"
                                                                >
                                                                    <Option value="percentage_addition">PERCENTAGE ADDITION</Option>
                                                                    <Option value="flat_addition">FLAT RATE ADDITION</Option>
                                                                    <Option value="percentage_subtraction">PERCENTAGE SUBSTRACTION</Option>
                                                                    <Option value="flat_substraction">FLAT RATE SUBSTRACTION</Option>
                                                                </Select>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col xs={6} md={6}>
                                                            <Form.Item name="ourPrice">
                                                                <Input
                                                                    style={{
                                                                        width: "100%",
                                                                        height: "40px",
                                                                        fontSize: "14px",
                                                                        borderRadius: "8px",
                                                                        border: "1px solid #d1d1d1",
                                                                        fontFamily: "'Roboto', sans-serif",

                                                                    }}
                                                                    placeholder="Enter value"
                                                                />
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                </Col>

                                                {/* Our Price Field */}
                                                {/* Our Price, Compare At, and Cost Fields */}
                                                <Col xs={24} md={24}>
                                                    <Row align="middle" gutter={[16, 8]}>
                                                        {/* Our Price and Display Value together */}
                                                        <Col xs={24} md={8}>
                                                            <label style={{
                                                                fontSize: "16px",
                                                                fontWeight: "500",
                                                                color: "#555",
                                                                fontFamily: "'Roboto', sans-serif",
                                                                padding: "0 8px",
                                                                display: "block",
                                                                marginBottom: "8px",
                                                            }}>Our Price:</label>
                                                            <Button
                                                                style={{
                                                                    width: "100%",
                                                                    background: "linear-gradient(135deg, #004e92, #13c2c2)",
                                                                    color: "#fff",
                                                                    fontWeight: "bold",
                                                                    height: "81px",
                                                                    borderRadius: "8px",
                                                                    border: "none",
                                                                    marginBottom: "4px",
                                                                }}
                                                                onClick={calculatePrice}
                                                            >
                                                                Calculate Price
                                                            </Button>
                                                            <Form.Item name="finalPrice">
                                                                <Input
                                                                    style={{
                                                                        width: "100%",
                                                                        height: "40px",
                                                                        fontSize: "14px",
                                                                        borderRadius: "8px",
                                                                        border: "1px solid #d1d1d1",
                                                                        fontFamily: "'Roboto', sans-serif",
                                                                        padding: "0 12px",
                                                                    }}
                                                                    placeholder="Display value"
                                                                />
                                                            </Form.Item>
                                                        </Col>

                                                        {/* Compare At Field */}
                                                        <Col xs={24} md={8}>
                                                            <label style={{
                                                                fontSize: "16px",
                                                                fontWeight: "500",
                                                                color: "#555",
                                                                fontFamily: "'Roboto', sans-serif",
                                                                padding: "0 8px",
                                                                display: "block",
                                                                marginBottom: "8px",
                                                            }}>Compare At:</label>
                                                            <Form.Item name="compareAtPrice">
                                                                <Input
                                                                    style={{

                                                                        width: "100%",
                                                                        height: "40px",
                                                                        fontSize: "14px",
                                                                        borderRadius: "8px",
                                                                        border: "1px solid #d1d1d1",
                                                                        fontFamily: "'Roboto', sans-serif",
                                                                        padding: "0 12px",
                                                                    }}
                                                                    placeholder="Enter compare at price"
                                                                />
                                                            </Form.Item>
                                                        </Col>

                                                        {/* Cost Field */}
                                                        <Col xs={24} md={8}>
                                                            <label style={{
                                                                fontSize: "16px",
                                                                fontWeight: "500",
                                                                color: "#555",
                                                                fontFamily: "'Roboto', sans-serif",
                                                                padding: "0 8px",
                                                                display: "block",
                                                                marginBottom: "8px",
                                                            }}>Cost:</label>
                                                            <Form.Item name="cost">
                                                                <Input
                                                                    style={{
                                                                        width: "100%",
                                                                        height: "40px",
                                                                        fontSize: "14px",
                                                                        borderRadius: "8px",
                                                                        border: "1px solid #d1d1d1",
                                                                        fontFamily: "'Roboto', sans-serif",
                                                                        padding: "0 12px",
                                                                    }}
                                                                    placeholder="Enter cost price"
                                                                />
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                </Col>



                                                {/* Product Name */}
                                                <Col xs={24} md={24}>
                                                    <Row align="middle" gutter={[16, 8]}>
                                                        <Col xs={6} md={4}>
                                                            <label style={{
                                                                fontSize: "16px",
                                                                fontWeight: "500",
                                                                color: "#555",
                                                                fontFamily: "'Roboto', sans-serif",
                                                                padding: "0 8px",
                                                                display: "block",
                                                                marginBottom: "8px",
                                                            }}>Product Name:</label>
                                                        </Col>
                                                        <Col xs={18} md={20}>
                                                            <Form.Item name="productName">
                                                                <Input
                                                                    style={{
                                                                        height: "40px",
                                                                        fontSize: "14px",
                                                                        width: "100%",
                                                                        borderRadius: "8px",
                                                                        border: "1px solid #d1d1d1",
                                                                        fontFamily: "'Roboto', sans-serif",
                                                                        padding: "0 12px",
                                                                    }}
                                                                />
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                </Col>



                                                {/* Tabs */}
                                                <Col xs={24} md={24}>
                                                    <Tabs
                                                        defaultActiveKey="print"
                                                        onChange={(key) => setActiveTab(key)}
                                                        style={{ minWidth: 320, fontSize: "20px", fontWeight: 700, textTransform: "uppercase", marginBottom: "16px" }}
                                                        tabBarGutter={32}
                                                        tabBarStyle={{
                                                            fontSize: "20px",
                                                            fontWeight: 700,
                                                            textTransform: "uppercase",
                                                            backgroundColor: "#f0f2f5",  // Set a subtle background color for the inactive tabs
                                                            borderRadius: "8px", // Rounded corners for the tab container
                                                        }}
                                                        className="custom-tabs"
                                                        centered
                                                    >
                                                        <TabPane tab="Print" key="print" />
                                                        <TabPane tab="Shopify" key="shopify" />
                                                        <TabPane tab="Square" key="square" />
                                                    </Tabs>
                                                </Col>

                                                {/* Add this style in your component directly */}
                                                <style>
                                                    {`
        /* Highlight active tab */
        .custom-tabs .ant-tabs-tab-active {
            background-color: #e6f7ff; /* Light blue background */
            border-radius: 8px 8px 0 0;
            color: #1890ff; /* Change text color of active tab */
        }

        /* Optional: add padding and smoother feel */
        .custom-tabs .ant-tabs-tab {
            padding: 12px 24px;
            transition: background 0.3s ease;
        }
    `}
                                                </style>



                                                {/* === Print Tab === */}
                                                {activeTab === "print" && (
                                                    <Col xs={24} md={24}>
                                                        <Row align="middle" gutter={[16, 8]}>
                                                            <Col xs={6} md={4}>
                                                                <label style={labelStyle}>Print Tag:</label>
                                                            </Col>
                                                            <Col xs={12} md={12}>
                                                                <Form.Item name="tag">
                                                                    <Select style={selectStyle} placeholder="Select Tag Option">
                                                                        {templates?.payload?.map((val, idx) => (
                                                                            <Option key={idx} value={val?.id + " " + val.size}>
                                                                                {val.name}
                                                                            </Option>
                                                                        ))}
                                                                    </Select>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col xs={6} md={6}>
                                                                <Button style={buttonStyle} onClick={templateFormat}>
                                                                    Print Label
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                )}

                                                {/* === Shopify Tab === */}
                                                {activeTab === "shopify" && (
                                                    <>
                                                        {/* Product Type */}
                                                        <Col xs={24} md={24}>
                                                            <Row align="middle" gutter={[16, 8]}>
                                                                <Col xs={6} md={4}>
                                                                    <label style={labelStyle}>Product Type:</label>
                                                                </Col>
                                                                <Col xs={18} md={20}>
                                                                    <Form.Item name="productType">
                                                                        <Select
                                                                            style={{ ...selectStyle, width: "80%" }}
                                                                            placeholder="Select a product type"
                                                                            disabled={!Array.isArray(getShopifyType?.payload?.result) || getShopifyType.payload?.result.length === 0}
                                                                        >
                                                                            {Array.isArray(getShopifyType?.payload?.result) &&
                                                                                getShopifyType.payload?.result.map((val, idx) => (
                                                                                    <Option key={idx} value={val}>
                                                                                        {val}
                                                                                    </Option>
                                                                                ))
                                                                            }
                                                                        </Select>
                                                                    </Form.Item>

                                                                </Col>
                                                            </Row>
                                                        </Col>

                                                        {/* Product Desc */}
                                                        <Col xs={24} md={24}>
                                                            <Row align="middle" gutter={[16, 8]}>
                                                                <Col xs={6} md={4}>
                                                                    <label style={labelStyle}>Product Desc:</label>
                                                                </Col>
                                                                <Col xs={18} md={20}>
                                                                    <Form.Item name="Desc">
                                                                        <Input.TextArea
                                                                            rows={2}
                                                                            style={{
                                                                                fontSize: "14px",
                                                                                width: "100%",
                                                                                borderRadius: "8px",
                                                                                border: "1px solid #d1d1d1",
                                                                                padding: "12px",
                                                                                fontFamily: "'Roboto', sans-serif",
                                                                            }}
                                                                        />
                                                                    </Form.Item>
                                                                </Col>
                                                            </Row>
                                                        </Col>

                                                        {/* Product Quantity */}
                                                        <Col xs={24} md={24}>
                                                            <Row align="middle" gutter={[16, 8]}>
                                                                <Col xs={6} md={4}>
                                                                    <label style={labelStyle}>Product Quantity:</label>
                                                                </Col>
                                                                <Col xs={18} md={20}>
                                                                    <Form.Item name="quantity">
                                                                        <Input style={inputStyle} placeholder="Enter quantity" />
                                                                    </Form.Item>
                                                                </Col>
                                                            </Row>
                                                        </Col>



                                                        {/* Vendor */}
                                                        <Col xs={24} md={24}>
                                                            <Row align="middle" gutter={[16, 8]}>
                                                                <Col xs={6} md={4}>
                                                                    <label style={labelStyle}>Vendor:</label>
                                                                </Col>
                                                                <Col xs={18} md={20}>
                                                                    <Form.Item name="vendor">
                                                                        <Input style={inputStyle} placeholder="Enter vendor" />
                                                                    </Form.Item>
                                                                </Col>
                                                            </Row>
                                                        </Col>

                                                        {/* SKU */}
                                                        <Col xs={24} md={24}>
                                                            <Row align="middle" gutter={[16, 8]}>
                                                                <Col xs={6} md={4}>
                                                                    <label style={labelStyle}>SKU:</label>
                                                                </Col>
                                                                <Col xs={18} md={20}>
                                                                    <Form.Item name="sku">
                                                                        <Input style={inputStyle} placeholder="Enter SKU" />
                                                                    </Form.Item>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </>
                                                )}

                                                {/* === Square Tab === */}
                                                {activeTab === "square" && (
                                                    <>
                                                        {/* Product Desc */}
                                                        <Col xs={24} md={24}>
                                                            <Row align="middle" gutter={[16, 8]}>
                                                                <Col xs={6} md={4}>
                                                                    <label style={labelStyle}>Product Desc:</label>
                                                                </Col>
                                                                <Col xs={18} md={20}>
                                                                    <Form.Item name="Desc">
                                                                        <Input.TextArea
                                                                            rows={2}
                                                                            style={{
                                                                                fontSize: "14px",
                                                                                width: "100%",
                                                                                borderRadius: "8px",
                                                                                border: "1px solid #d1d1d1",
                                                                                padding: "12px",
                                                                                fontFamily: "'Roboto', sans-serif",
                                                                            }}
                                                                        />
                                                                    </Form.Item>
                                                                </Col>
                                                            </Row>
                                                        </Col>

                                                        {/* Category */}
                                                        <Col xs={24} md={24}>
                                                            <Row align="middle" gutter={[16, 8]}>
                                                                <Col xs={6} md={4}>
                                                                    <label style={labelStyle}>Category:</label>
                                                                </Col>
                                                                <Col xs={18} md={20}>
                                                                    <Form.Item name="categories">
                                                                        <Select
                                                                            style={{ ...selectStyle, width: "80%" }}
                                                                            placeholder="Select a category"
                                                                            disabled={!Array.isArray(getCategory?.payload) || getCategory.payload.length === 0}
                                                                        >
                                                                            {Array.isArray(getCategory?.payload) &&
                                                                                getCategory.payload.map((val, idx) => (
                                                                                    <Option key={idx} value={val.id}>
                                                                                        {val.name}
                                                                                    </Option>
                                                                                ))}
                                                                        </Select>
                                                                    </Form.Item>
                                                                </Col>
                                                            </Row>
                                                        </Col>

                                                        {/* Product Quantity */}
                                                        <Col xs={24} md={24}>
                                                            <Row align="middle" gutter={[16, 8]}>
                                                                <Col xs={6} md={4}>
                                                                    <label style={labelStyle}>Product Quantity:</label>
                                                                </Col>
                                                                <Col xs={18} md={20}>
                                                                    <Form.Item name="quantity">
                                                                        <Input style={inputStyle} placeholder="Enter quantity" />
                                                                    </Form.Item>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </>
                                                )}

                                                {/* Push Square Button */}


                                                {activeTab === "shopify" && getConfiguration?.payload?.squareToken !== "" && (
                                                    <Col xs={24} md={24}>
                                                        <Button
                                                            style={{
                                                                width: "100%",
                                                                height: "45px",
                                                                fontSize: "16px",
                                                                fontWeight: "600",
                                                                borderRadius: "8px",
                                                                background: "linear-gradient(135deg, #004e92, #13c2c2)",
                                                                color: "#fff",
                                                                border: "none",
                                                            }}
                                                            onClick={pushShopifyCall}
                                                        >
                                                            Push Shopify
                                                        </Button>
                                                    </Col>
                                                )}

                                                {/* If Square Tab is Active */}
                                                {activeTab === "square" && getConfiguration?.payload?.squareToken !== "" && (
                                                    <Col xs={24} md={24}>
                                                        <Button
                                                            style={{
                                                                width: "100%",
                                                                height: "45px",
                                                                fontSize: "16px",
                                                                fontWeight: "600",
                                                                borderRadius: "8px",
                                                                background: "linear-gradient(135deg, #004e92, #13c2c2)",
                                                                color: "#fff",
                                                                border: "none",
                                                            }}
                                                            onClick={squareCall}
                                                        >
                                                            Push Square
                                                        </Button>
                                                    </Col>
                                                )}


                                            </Row>
                                        </Form>
                                    </div>

                                </>
                            }

                        </>
                    )}
                </Row>



                <Modal
                    title="Product Images"
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                    centered
                    bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
                >
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        {squareImageUrl?.length > 0 ? (
                            squareImageUrl.map((imgUrl, index) => (
                                <img
                                    key={index}
                                    src={imgUrl}
                                    alt={`Product ${index + 1}`}
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        borderRadius: "8px",
                                        objectFit: "contain",
                                    }}
                                />
                            ))
                        ) : (
                            <p style={{ textAlign: "center", color: "#999" }}>No Images Available</p>
                        )}
                    </div>
                </Modal>


                <Modal
                    title={
                        <Title level={4} style={{ margin: 0, color: '#004e92', textAlign: 'center' }}>
                            Store Details
                        </Title>
                    }
                    visible={isStoreModalVisible}
                    onCancel={handleStoreModalCancel}
                    footer={null}
                    centered
                    width={1000} // Wider for more columns
                    bodyStyle={{
                        padding: '20px',
                        borderRadius: '12px',
                        background: '#f0f5ff',
                    }}
                >
                    <div
                        style={{
                            background: '#ffffff',
                            borderRadius: '12px',
                            overflow: 'auto',
                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Table
                            dataSource={storeData.map((item, index) => ({ ...item, key: index }))}
                            columns={[

                                {
                                    title: <span style={{ color: '#004e92', fontWeight: 600 }}>Currency</span>,
                                    dataIndex: 'currency',
                                    key: 'currency',
                                    align: 'center',
                                },
                                {
                                    title: <span style={{ color: '#004e92', fontWeight: 600 }}>Price</span>,
                                    dataIndex: 'price',
                                    key: 'price',
                                    align: 'center',
                                    render: (_, record) => {
                                        const { price, currency } = record;
                                        const currencySymbols = {
                                            USD: '$',
                                            CAD: '$',
                                            EUR: '€',
                                            GBP: '£',
                                            PLN: 'zł',
                                            INR: '₹',
                                            JPY: '¥',
                                            CNY: '¥',
                                        };
                                        const symbol = currencySymbols[currency] || currency || '';
                                        const isPrefix = ['$', '€', '£', '₹', '¥', 'zł'].includes(symbol);
                                        const formattedPrice = isPrefix ? `${symbol}${price}` : `${price} ${symbol}`;

                                        return <span style={{ fontWeight: 500 }}>{formattedPrice}</span>;
                                    },
                                },
                                {
                                    title: <span style={{ color: '#004e92', fontWeight: 600 }}>Last Update</span>,
                                    dataIndex: 'last_update',
                                    key: 'last_update',
                                    align: 'center',
                                },

                                {
                                    title: <span style={{ color: '#004e92', fontWeight: 600 }}>Store Name</span>,
                                    dataIndex: 'storeName',
                                    key: 'storeName',
                                    align: 'center',
                                    render: text => <span style={{ fontWeight: 500 }}>{text || "-"}</span>,
                                },
                                {
                                    title: <span style={{ color: '#004e92', fontWeight: 600 }}>Country</span>,
                                    dataIndex: 'storeCountry',
                                    key: 'storeCountry',
                                    align: 'center',
                                    render: text => text || "-",
                                },
                                {
                                    title: <span style={{ color: '#004e92', fontWeight: 600 }}>Category</span>,
                                    dataIndex: 'category',
                                    key: 'category',
                                    align: 'center',
                                    render: text => (
                                        <div style={{ maxWidth: '220px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                            {text}
                                        </div>
                                    ),
                                },



                                {
                                    title: <span style={{ color: '#004e92', fontWeight: 600 }}>Link</span>,
                                    dataIndex: 'link',
                                    key: 'link',
                                    align: 'center',
                                    render: (text) =>
                                        text ? (
                                            <a
                                                href={text}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: '#1890ff', fontWeight: 500 }}
                                            >
                                                🔗 View Store
                                            </a>
                                        ) : (
                                            "-"
                                        ),
                                },
                            ]}
                            pagination={false}
                            bordered={false}
                            size="middle"
                            scroll={{ x: 'max-content' }}
                            rowClassName={(_, index) =>
                                index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
                            }
                        />
                    </div>
                </Modal>



            </Content >
        </Layout >
    );
};

export default NonIccidProduct;