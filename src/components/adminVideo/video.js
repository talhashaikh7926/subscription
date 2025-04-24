import React, { useEffect, useState } from 'react';
import {
    Layout, Typography, Table, Button, Modal, Form, Input, Switch, notification, Popconfirm, Space
} from 'antd';
import {
    PlusOutlined, EditOutlined, DeleteOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { addVideo, updateVideo, deleteVideo, getVideo } from '../../redux/actions/createVideo.action';

const { Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;

const AdminVideo = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingVideo, setEditingVideo] = useState(null);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewVideoUrl, setPreviewVideoUrl] = useState(null);
    const dispatch = useDispatch();
    const { getVideos } = useSelector((state) => state);

    useEffect(() => {
        dispatch(getVideo());
    }, [dispatch]);

    const handleEdit = (video) => {
        setEditingVideo(video);
        form.setFieldsValue(video);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingVideo(null);
        form.resetFields();
    };

    const handleAddEdit = (values) => {
        const finalValues = {
            ...values,
            is_public: values.is_public || false,
        };

        const action = editingVideo
            ? updateVideo({ ...finalValues, id: editingVideo.id })
            : addVideo(finalValues);

        dispatch(action).then((res) => {
            const successType = editingVideo ? "UPDATE_VIDEO_SUCCESS" : "POST_VIDEO_SUCCESS";
            const actionText = editingVideo ? "Updated" : "Added";

            if (res.type === successType) {
                notification.success({
                    message: `Video ${actionText} Successfully`,
                    placement: "top",
                    className: "toast-success",
                });
                dispatch(getVideo());
                handleModalClose();
            } else {
                notification.error({
                    message: "Request Failed",
                    placement: "top",
                    className: "toast-error",
                });
            }
        });
    };

    const handleDelete = (videoId) => {
        dispatch(deleteVideo(videoId)).then((res) => {
            if (res.type === "DELETE_VIDEO_SUCCESS") {
                notification.success({
                    message: "Video Deleted Successfully",
                    placement: "top",
                    className: "toast-success",
                });
                dispatch(getVideo());
            } else {
                notification.error({
                    message: "Request Failed",
                    placement: "top",
                    className: "toast-error",
                });
            }
        });
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: '20%',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: '30%',
        },
        {
            title: 'Video URL',
            dataIndex: 'video_url',
            key: 'video_url',
            render: (text) => (
                <Button type="link" onClick={() => {
                    setPreviewVideoUrl(text);
                    setPreviewVisible(true);
                }}>
                    View
                </Button>
            ),
            width: '20%',
        },
        {
            title: 'Public',
            dataIndex: 'is_public',
            key: 'is_public',
            render: (isPublic) => <Text type="secondary">{isPublic ? "Yes" : "No"}</Text>,
            width: '10%',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>Edit</Button>
                    <Popconfirm title="Are you sure to delete this video?" onConfirm={() => handleDelete(record.id)}>
                        <Button danger icon={<DeleteOutlined />}>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
            width: '20%',
        }
    ];

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <Content style={{ padding: '24px' }}>
                <div style={{
                    maxWidth: '100%',
                    backgroundColor: '#ffffff',
                    padding: '32px',
                    borderRadius: '16px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                    <Title level={2} style={{ color: "#004e92", textAlign: "center", marginBottom: "40px" }}>
                        Video Management
                    </Title>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            style={{ backgroundColor: '#13c2c2', borderColor: '#13c2c2' }}
                            onClick={() => {
                                form.resetFields();
                                setEditingVideo(null);
                                setIsModalOpen(true);
                            }}
                        >
                            Add Video
                        </Button>
                    </div>

                    <Table
                        dataSource={getVideos?.payload}
                        columns={columns}
                        rowKey="id"
                        loading={getVideos?.loading}
                        bordered
                        pagination={{ pageSize: 5 }}
                        scroll={{ x: true }}
                    />
                </div>

                <Modal
                    title={editingVideo ? "Edit Video" : "Add Video"}
                    open={isModalOpen}
                    onCancel={handleModalClose}
                    footer={null}
                    centered
                >
                    <Form form={form} layout="vertical" onFinish={handleAddEdit}>
                        <Form.Item
                            name="title"
                            label="Title"
                            rules={[{ required: true, message: 'Please enter the video title' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[{ required: true, message: 'Please enter the description' }]}
                        >
                            <TextArea rows={3} />
                        </Form.Item>
                        <Form.Item
                            name="video_url"
                            label="Video URL"
                            rules={[
                                { required: true, message: 'Please enter the video URL' },
                                {
                                    pattern: /^(https?:\/\/.*\.(mp4|webm|ogg))$/i,
                                    message: 'Please enter a valid video URL ending in .mp4, .webm, or .ogg',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="is_public"
                            label="Public"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                {editingVideo ? "Update Video" : "Create Video"}
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title="Video Preview"
                    open={previewVisible}
                    onCancel={() => setPreviewVisible(false)}
                    footer={null}
                    centered
                >
                    <video width="100%" height="auto" controls>
                        <source src={previewVideoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </Modal>
            </Content>
        </Layout>
    );
};

export default AdminVideo;
