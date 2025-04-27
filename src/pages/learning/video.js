import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Typography } from 'antd';
import { getVideo } from '../../redux/actions/createVideo.action';

const { Content } = Layout;
const { Title } = Typography;

const LearningVideo = () => {
    const dispatch = useDispatch();
    const [publicVideoUrl, setPublicVideoUrl] = useState(null);
    const { getSubscription, getVideos } = useSelector((state) => state);
    useEffect(() => {
        dispatch(getVideo());
    }, [dispatch]);
    useEffect(() => {
        if (getVideos?.payload?.length > 0) {
            const publicVideos = getVideos.payload.filter(video => video.is_public === true);
            if (publicVideos.length > 0) {
                const randomIndex = Math.floor(Math.random() * publicVideos.length);
                setPublicVideoUrl(publicVideos[randomIndex].video_url);

            }
        }
    }, [getVideos]);
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
                       {publicVideoUrl ? (
                                    <video
                                        width="110%" // Increased width
                                        height="500px" // Increased height
                                        controls
                                        autoPlay
                                        poster="your-image-placeholder.jpg" // Optional: Add a thumbnail before video loads
                                        style={{
                                            borderRadius: '8px', // Rounded corners for the video player
                                            overflow: 'hidden', // Ensures rounded corners are respected
                                        }}
                                    >
                                        <source src={publicVideoUrl} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <p>Loading video...</p> // Show a loading message if the video is not yet available
                                )}
                </div>
            </Content>
        </Layout>
    );
};

export default LearningVideo;
