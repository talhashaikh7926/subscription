import React, { useState, useEffect } from 'react';
import {
    Layout, Form, Input, Button, Typography, Modal, Table, Space, Popconfirm, message, notification
} from 'antd';
import {
    PlusOutlined, EditOutlined, DeleteOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { addFaq, updateFaq, deleteFaq, FaqSearch } from '../../redux/actions/createFaq.action'

const { Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

const AdminFaq = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [faqs, setFaqs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFaq, setEditingFaq] = useState(null);
    const { getFaq } = useSelector((state) => state);


    useEffect(() => {
        dispatch(FaqSearch());
    }, [dispatch]);

    const handleEdit = (faq) => {
        setEditingFaq(faq);
        form.setFieldsValue(faq);
        setIsModalOpen(true);
    };


    const handleAddEdit = (values) => {
        if (editingFaq) {

            dispatch(updateFaq({ ...values, id: editingFaq.id })).then((res) => {

                if (res.type === "UPDATE_FAQ_SUCCESS") {
                    notification.success({
                        message: "Faq Updated Successfull",
                        className: "toast-success",
                        placement: "top",
                    });
                    dispatch(FaqSearch());
                } else {
                    notification.error({
                        message: "Request Failed",
                        className: "toast-error",
                        placement: "top",
                    });
                }

            })
        }

        else {
            dispatch(addFaq(values)).then((res) => {

                if (res.type === "POST_FAQ_SUCCESS") {
                    notification.success({
                        message: "Add Successful",
                        className: "toast-success",
                        placement: "top",
                    });
                    dispatch(FaqSearch());
                } else {
                    notification.error({
                        message: "Request Failed",
                        className: "toast-error",
                        placement: "top",
                    });
                }

            })
        }
        form.resetFields();
        setEditingFaq(null);
        setIsModalOpen(false);
    };

    const handleDelete = (faqId) => {
        dispatch(deleteFaq(faqId)).then((res) => {

            if (res.type === "DELETE_FAQ_SUCCESS") {
                notification.success({
                    message: "Delete Successful",
                    className: "toast-success",
                    placement: "top",
                });
                dispatch(FaqSearch());
            } else {
                notification.error({
                    message: "Request Failed",
                    className: "toast-error",
                    placement: "top",
                });
            }

        })
    };


    const columns = [
        {
            title: 'Question',
            dataIndex: 'question',
            key: 'question',
            width: '40%',
        },
        {
            title: 'Answer',
            dataIndex: 'answer',
            key: 'answer',
            width: '40%',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>Edit</Button>
                    <Popconfirm title="Are you sure to delete this FAQ?" onConfirm={() => handleDelete(record.id)}>
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
                    <Title level={2} style={{ color: "#004e92", textAlign: "center", marginBottom: "40px" }}>FAQ Management</Title>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            style={{ backgroundColor: '#13c2c2', borderColor: '#13c2c2' }}
                            onClick={() => {
                                form.resetFields();
                                setEditingFaq(null);
                                setIsModalOpen(true);
                            }}
                        >
                            Add FAQ
                        </Button>
                    </div>

                    <Table
                        dataSource={getFaq?.payload}
                        columns={columns}
                        rowKey="id"
                        loading={getFaq?.loading}
                        bordered
                        pagination={{ pageSize: 5 }}
                        scroll={{ x: true }}
                    />
                </div>

                <Modal
                    title={editingFaq ? "Edit FAQ" : "Add FAQ"}
                    open={isModalOpen}
                    onCancel={() => {
                        setIsModalOpen(false);
                        setEditingFaq(null);
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
                            label="Question"
                            name="question"
                            rules={[{ required: true, message: 'Please input the question!' }]}
                        >
                            <Input placeholder="Enter question..." />
                        </Form.Item>
                        <Form.Item
                            label="Answer"
                            name="answer"
                            rules={[{ required: true, message: 'Please input the answer!' }]}
                        >
                            <TextArea rows={4} placeholder="Enter answer..." />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                {editingFaq ? "Update FAQ" : "Create FAQ"}
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Content>
        </Layout>
    );
};

export default AdminFaq;
