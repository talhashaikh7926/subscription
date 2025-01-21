import React from 'react';
import { Form, Input, Row, Col, Button, Space } from 'antd';

const AdvancedFilterForm = ({ columns, onFilter }) => {
    const [form] = Form.useForm(); // Use the form instance

    const onFinish = (values) => {
        console.log('Form values:', values);
        onFilter(values); // Trigger the callback to send data to parent
    };

    const handleReset = () => {
        form.resetFields(); // Reset all fields to initial values
        onFilter({}); // Optionally clear the filters after reset
    };

    return (
        <Form form={form} layout="inline" onFinish={onFinish}>
            <Row gutter={[16, 16]} style={{ width: '100%' }}>
                {columns
                    .filter((col) => col.title !== "Action") // Filter out the "Action" field
                    .map((col, idx) => (
                        <Col
                            xs={24} // Full width on extra small screens (mobile)
                            sm={12} // Half width on small screens (tablet)
                            md={8}  // One third width on medium screens (desktop)
                            key={idx}
                        >
                            <Form.Item
                                name={col.dataIndex}
                                label={col.title}
                            >
                                <Input placeholder={`Enter value for ${col.title}`} />
                            </Form.Item>
                        </Col>
                    ))}

                <Col justify="end" style={{ width: '100%', marginTop: '0px' }}
                    xs={24} // Full width on extra small screens (mobile)
                    sm={12} // Half width on small screens (tablet)
                    md={8}  // One third width on medium screens (desktop)
                >
                    <Space size="small">
                        <Button type="primary" htmlType="submit">
                            Search
                        </Button>
                        <Button htmlType="button" onClick={handleReset}>
                            Clear
                        </Button>
                    </Space>
                </Col>
            </Row>
        </Form>
    );
};

export default AdvancedFilterForm;
