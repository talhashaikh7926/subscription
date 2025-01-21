import React from 'react';
import { Layout, Typography } from 'antd';

const { Content } = Layout;
const { Title } = Typography;

const LearningVideo = () => {
    
    return (
        <Layout style={{ padding: '20px', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
        <Content
            style={{
                backgroundColor: '#ffffff',
                padding: '20px',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
               
                maxHeight: '80vh',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Title level={2} style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
                Demo Video
            </Title>
            <hr style={{ width: '100%', marginBottom: '20px' }} />

            <div
                style={{
                    width: '100%',
                    maxWidth: '920px',
                    height: '800px',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <iframe
                    title="Demo Video"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </Content>
    </Layout>

    );
};

export default LearningVideo;