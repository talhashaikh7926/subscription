import React, { useEffect } from 'react';
import { Layout, Typography, Card, Row, Col } from 'antd';
import { FileTextOutlined, VideoCameraOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";

const { Content } = Layout;
const { Title, Text } = Typography;

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { getUserInfo } = useSelector((state) => state);

    useEffect(() => {
      
    }, [dispatch]);

    const dashboardData = [
        {
            title: "Total FAQs",
            icon: <FileTextOutlined style={{ fontSize: '40px', color: '#13c2c2' }} />,
            value: 120, // Replace with dynamic data
        },
        {
            title: "Total Videos",
            icon: <VideoCameraOutlined style={{ fontSize: '40px', color: '#13c2c2' }} />,
            value: 85, // Replace with dynamic data
        },
        {
            title: "Total Subscriptions",
            icon: <UsergroupAddOutlined style={{ fontSize: '40px', color: '#13c2c2' }} />,
            value: 340, // Replace with dynamic data
        },
    ];

    return (
        <Layout>
           
              

           <Row gutter={[32, 32]} justify="center">
                    {dashboardData.map((item, index) => (
                        <Col xs={24} sm={12} md={8} key={index}>
                            <Card
                                bordered={false}
                                style={{
                                    borderRadius: "20px",
                                    textAlign: "center",
                                    backgroundColor: "#ffffff",
                                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                    height: "280px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "20px"
                                }}
                                hoverable
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "scale(1.06)";
                                    e.currentTarget.style.boxShadow = "0 14px 36px rgba(0, 0, 0, 0.2)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "scale(1)";
                                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.15)";
                                }}
                            >
                                <div style={{ marginBottom: "30px" }}>{item.icon}</div>
                                <Title level={3} style={{ color: "#004e92", marginBottom: "10px" }}>{item.title}</Title>
                                <Text style={{ fontSize: "28px", fontWeight: "700", color: "#595959" }}>{item.value}</Text>
                            </Card>
                        </Col>
                    ))}
                </Row>
          
        </Layout>
    );
};

export default AdminDashboard;
