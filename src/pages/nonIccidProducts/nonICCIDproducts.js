import React, { useState, useEffect } from 'react';
import { Layout, Form, Input, Button, Typography, Card, Row, Col, notification, Modal, Select, Spin } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { CheckOutlined } from '@ant-design/icons';
import { subscriptionPlan, checkout } from '../../redux/actions/subscriptionPlan.action'
import { getTemplate, getCategories, getBarcodeDetail, printTag, pushSquare } from '../../redux/actions/barcode.action'
import { getConfig } from "../../redux/actions/configuration.action";
import AdminDashboard from '../../components/adminDashboard/dashboard';


const { Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const NonIccidProduct = () => {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState("");
    const [squareImageUrl, setSquareImageUrl] = useState("");
    const dispatch = useDispatch();
    const { getSubscriptionPlan, getUserInfo, templates, getCategory, barcodeDetails, getConfiguration } = useSelector((state) => state);

    const token = JSON.parse(localStorage.getItem("userInfo"));

    useEffect(() => {
        dispatch(subscriptionPlan());
        dispatch(getTemplate());
        dispatch(getConfig(token?.user_name));
        dispatch(getCategories(token?.user_name));
        form.setFieldsValue({
            inwardDate: moment(),
        });
    }, [dispatch]);


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
                <Title level={2} style={{
                    textAlign: "center",
                    marginBottom: "40px",
                    color: "#004e92",
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: "700",
                }}>X LabelSync Pro</Title>
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

                            {getUserInfo?.payload?.is_admin === true
                                ?

                                <AdminDashboard />
                                :
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
                                                            height: "350px", // Uniform card height
                                                            maxWidth: "350px", // Uniform card width
                                                            margin: "0 auto",
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            justifyContent: "space-between", // Ensure button stays at the bottom
                                                            paddingBottom: "20px", // Space below content
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
                                                style={{
                                                    maxWidth: "800px", // Container width
                                                    margin: "0 auto",
                                                    backgroundColor: "#ffffff", // Slightly different background for better contrast
                                                    padding: "20px", // Increased padding for better spacing
                                                    borderRadius: "12px", // Larger border radius for smoother edges
                                                    border: "1px solid #e0e0e0", // Soft border for inputs and buttons
                                                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for 3D effect
                                                }}
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
                                                                    }}>Our Price:</label>
                                                                </Col>
                                                                <Col xs={10} md={10}>
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
                                                                        onClick={calculatePrice}
                                                                    >
                                                                        Calculate Price
                                                                    </Button>
                                                                </Col>
                                                                <Col xs={8} md={10}>
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

                                                        {/* Product Description */}
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
                                                                    }}>Product Desc:</label>
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
                                                                    <label style={{
                                                                        fontSize: "16px",
                                                                        fontWeight: "500",
                                                                        color: "#555",
                                                                        fontFamily: "'Roboto', sans-serif",
                                                                        padding: "0 8px",
                                                                        display: "block",
                                                                        marginBottom: "8px",
                                                                    }}>Category:</label>
                                                                </Col>
                                                                <Col xs={18} md={20}>
                                                                    <Form.Item name="categories">
                                                                        <Select
                                                                            style={{
                                                                                height: "40px",
                                                                                fontSize: "14px",
                                                                                width: "80%",
                                                                                borderRadius: "8px",
                                                                                fontFamily: "'Roboto', sans-serif",
                                                                            }}
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
                                                                    <label style={{
                                                                        fontSize: "16px",
                                                                        fontWeight: "500",
                                                                        color: "#555",
                                                                        fontFamily: "'Roboto', sans-serif",
                                                                        padding: "0 8px",
                                                                        display: "block",
                                                                        marginBottom: "8px",
                                                                    }}>Product Quantity:</label>
                                                                </Col>
                                                                <Col xs={18} md={20}>
                                                                    <Form.Item name="quantity">
                                                                        <Input
                                                                            style={{
                                                                                height: "40px",
                                                                                fontSize: "14px",
                                                                                width: "100%",
                                                                                borderRadius: "8px",
                                                                                fontFamily: "'Roboto', sans-serif",
                                                                                border: "1px solid #d1d1d1",
                                                                                padding: "0 12px",
                                                                            }}
                                                                            placeholder="Enter quantity"
                                                                        />
                                                                    </Form.Item>
                                                                </Col>
                                                            </Row>
                                                        </Col>

                                                        {/* Print Tag Section */}
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
                                                                    }}>Print Tag:</label>
                                                                </Col>
                                                                <Col xs={12} md={12}>
                                                                    <Form.Item name="tag">
                                                                        <Select

                                                                            style={{
                                                                                height: "40px",
                                                                                fontSize: "14px",
                                                                                width: "100%",
                                                                                borderRadius: "8px",
                                                                                fontFamily: "'Roboto', sans-serif",


                                                                            }}
                                                                            placeholder="Select Tag Option"
                                                                        >
                                                                            {templates?.payload?.map((val, idx) => (
                                                                                <Option key={idx} value={val?.id + " " + val.size}>

                                                                                    {val.name}
                                                                                </Option>
                                                                            ))}
                                                                        </Select>
                                                                    </Form.Item>

                                                                </Col>
                                                                <Col xs={6} md={6}>
                                                                    <Button

                                                                        style={{
                                                                            width: "100%",
                                                                            background: "linear-gradient(135deg, #004e92, #13c2c2)",
                                                                            color: "#fff",
                                                                            fontWeight: "bold",
                                                                            height: "45px",
                                                                            borderRadius: "8px",
                                                                            border: "none",
                                                                        }}
                                                                        onClick={templateFormat}
                                                                    >
                                                                        Print Label
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                                        </Col>

                                                        {/* Push Square Button */}
                                                        {getConfiguration?.payload?.squareToken !== "" && (
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
                            }
                        </>
                    )}
                </Row>
            </Content>
        </Layout>
    );
};

export default NonIccidProduct;