import React from 'react';
import { Layout, Typography } from 'antd';

const { Content } = Layout;
const { Title } = Typography;

const LearningVideo = () => {
    return (
        <Layout
            style={{
                padding: '20px',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #000428 0%, #004e92 30%, #6db3f2 60%, #e5e5e5 100%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Content
                style={{
                    backgroundColor: '#ffffff',
                    padding: '40px',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    maxHeight: '80vh',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                    width: '100%',
                    maxWidth: '960px',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                }}
            >
                <Title
                    level={2}
                    style={{
                        textAlign: 'center',
                        marginBottom: '20px',
                        color: '#004e92',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    How to Use X LabelSync Pro
                </Title>
                <hr
                    style={{
                        width: '80%',
                        borderTop: '2px solid #004e92',
                        marginBottom: '20px',
                    }}
                />

                <div
                    style={{
                        width: '100%',
                        maxWidth: '900px',
                        height: '500px',
                        overflow: 'hidden',
                        borderRadius: '12px',
                        border: '1px solid #ddd',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                    }}
                >
                    <iframe
                        title="Demo Video"
                        src="https://photos.onedrive.com/share/786723E1B453155C!sdb5f745ffd0143b38317364534fb86be?cid=786723E1B453155C&resId=786723E1B453155C!sdb5f745ffd0143b38317364534fb86be&ithint=video&migratedtospo=true&redeem=aHR0cHM6Ly8xZHJ2Lm1zL3YvYy83ODY3MjNlMWI0NTMxNTVjL0VWOTBYOXNCX2JORGd4YzJSVFQ3aHI0Qk8zdnhodFRZczI0Y2xLb2JYN1Z6UXc"
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
