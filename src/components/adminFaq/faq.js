import React, { useState, useEffect } from 'react';
import {
    Layout, Form, Input, Button, Typography, Modal, Table, Space, Popconfirm, notification
} from 'antd';
import {
    PlusOutlined, EditOutlined, DeleteOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { addSubscription, updateSubscription, deleteSubscription, SubscriptionSearch } from '../../redux/actions/createSubscription.action';

const { Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

const AdminSubscription = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [subscriptions, setSubscriptions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSubscription, setEditingSubscription] = useState(null);
    const { getSubscription } = useSelector((state) => state);

    // Fetch subscriptions on mount
    useEffect(() => {
        dispatch(SubscriptionSearch());
    }, [dispatch]);

    const handleEdit = (subscription) => {
        setEditingSubscription(subscription);
        form.setFieldsValue(subscription);
        setIsModalOpen(true);
    };

    const handleAddEdit = (values) => {
        if (editingSubscription) {
            dispatch(updateSubscription({ ...values, subscription_id: editingSubscription.subscription_id })).then((res) => {
                if (res.type === "UPDATE_SUBSCRIPTION_SUCCESS") {
                    notification.success({
                        message: "Subscription Updated Successfully",
                        className: "toast-success",
                        placement: "top",
                    });
                    dispatch(SubscriptionSearch());
                } else {
                    notification.error({
                        message: "Request Failed",
                        className: "toast-error",
                        placement: "top",
                    });
                }
            });
        } else {
            dispatch(addSubscription(values)).then((res) => {
                if (res.type === "POST_SUBSCRIPTION_SUCCESS") {
                    notification.success({
                        message: "Subscription Added Successfully",
                        className: "toast-success",
                        placement: "top",
                    });
                    dispatch(SubscriptionSearch());
                } else {
                    notification.error({
                        message: "Request Failed",
                        className: "toast-error",
                        placement: "top",
                    });
                }
            });
        }
        form.resetFields();
        setEditingSubscription(null);
        setIsModalOpen(false);
    };

    const handleDelete = (subscriptionId) => {
        dispatch(deleteSubscription(subscriptionId)).then((res) => {
            if (res.type === "DELETE_SUBSCRIPTION_SUCCESS") {
                notification.success({
                    message: "Subscription Deleted Successfully",
                    className: "toast-success",
                    placement: "top",
                });
                dispatch(SubscriptionSearch());
            } else {
                notification.error({
                    message: "Request Failed",
                    className: "toast-error",
                    placement: "top",
                });
            }
        });
    };

    const columns = [
        {
            title: 'Subscription Name',
            dataIndex: 'subscription_name',
            key: 'subscription_name',
            width: '30%',
        },
        {
            title: 'Price',
            dataIndex: 'subscription_price',
            key: 'subscription_price',
            width: '30%',
        },
        {
            title: 'Duration',
            dataIndex: 'subscription_duration',
            key: 'subscription_duration',
            width: '20%',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>Edit</Button>
                    <Popconfirm title="Are you sure to delete this subscription?" onConfirm={() => handleDelete(record.subscription_id)}>
                        <Button danger icon={<DeleteOutlined />}>Delete</Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <Content style={{ padding: '24px' }}>
                <div style={{ maxWidth: '100%', backgroundColor: '#ffffff', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    <Title level={2} style={{ color: "#004e92", textAlign: "center", marginBottom: "40px" }}>Subscription Management</Title>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            style={{ backgroundColor: '#13c2c2', borderColor: '#13c2c2' }}
                            onClick={() => {
                                form.resetFields();
                                setEditingSubscription(null);
                                setIsModalOpen(true);
                            }}
                        >
                            Add Subscription
                        </Button>
                    </div>

                    <Table
                        dataSource={getSubscription?.payload}
                        columns={columns}
                        rowKey="subscription_id"
                        loading={getSubscription?.loading}
                        bordered
                        pagination={{ pageSize: 5 }}
                        scroll={{ x: true }}
                    />
                </div>

                <Modal
                    title={editingSubscription ? "Edit Subscription" : "Add Subscription"}
                    open={isModalOpen}
                    onCancel={() => {
                        setIsModalOpen(false);
                        setEditingSubscription(null);
                        form.resetFields();
                    }}
                    footer={null}
                    centered
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleAddEdit}
                    >
                        <Form.Item
                            label="Subscription Name"
                            name="subscription_name"
                            rules={[{ required: true, message: 'Please input the subscription name!' }]}
                        >
                            <Input placeholder="Enter subscription name..." />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="subscription_price"
                            rules={[{ required: true, message: 'Please input the price!' }]}
                        >
                            <Input placeholder="Enter subscription price..." />
                        </Form.Item>
                        <Form.Item
                            label="Duration (in days)"
                            name="subscription_duration"
                            rules={[{ required: true, message: 'Please input the duration!' }]}
                        >
                            <Input placeholder="Enter subscription duration..." />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                {editingSubscription ? "Update Subscription" : "Create Subscription"}
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Content>
        </Layout>
    );
};

export default AdminSubscription;
