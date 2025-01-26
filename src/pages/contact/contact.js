import React, { useState } from "react";
import { Form, Input, Button, Card, Layout, Row, Col, Typography, Divider, notification } from 'antd';

import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title } = Typography;

const ContactUs = () => {


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
            <p>
                Contact Us
            </p>
        </Layout>
    );
};

export default ContactUs;
