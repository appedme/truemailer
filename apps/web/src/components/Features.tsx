'use client';

import { Card, Row, Col, Typography, Space, theme } from 'antd';
import { 
  CheckCircleOutlined, 
  CloudOutlined, 
  SafetyCertificateOutlined, 
  ThunderboltOutlined,
  GlobalOutlined,
  ApiOutlined 
} from '@ant-design/icons';
import { useTheme } from 'next-themes';

const { Title, Paragraph } = Typography;

const features = [
  {
    icon: <CheckCircleOutlined />,
    title: 'RFC-Compliant Validation',
    description: 'Thorough syntax validation ensuring emails meet international standards and best practices.'
  },
  {
    icon: <GlobalOutlined />,
    title: 'Domain & MX Verification',
    description: 'Real-time domain existence and mail server checks to ensure deliverability.'
  },
  {
    icon: <SafetyCertificateOutlined />,
    title: 'Disposable Email Detection',
    description: 'Blocks temporary email services like 10minutemail, YOPmail, and 500+ others.'
  },
  {
    icon: <ThunderboltOutlined />,
    title: 'Smart Spam Scoring',
    description: 'AI-powered heuristic analysis for detecting suspicious and spam email patterns.'
  },
  {
    icon: <CloudOutlined />,
    title: 'Edge-Deployed & Fast',
    description: 'Powered by Cloudflare Workers for ultra-low latency worldwide performance.'
  },
  {
    icon: <ApiOutlined />,
    title: 'Developer-Friendly API',
    description: 'Simple REST API with comprehensive documentation and no authentication required.'
  }
];

export default function Features() {
  const { theme: currentTheme } = useTheme();
  const { token } = theme.useToken();
  
  // Define colors based on theme
  const backgroundColor = currentTheme === 'dark' ? '#141414' : '#f5f5f5';
  const textColor = currentTheme === 'dark' ? '#ffffff' : '#000000';
  const descriptionColor = currentTheme === 'dark' ? '#bfbfbf' : '#666666';
  const iconColor = currentTheme === 'dark' ? '#177ddc' : '#1890ff';

  return (
    <section id="features">
      <div style={{ 
        padding: '64px 24px', 
        background: backgroundColor,
        color: textColor
      }}>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '48px',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <Title 
            level={2} 
            style={{ 
              marginBottom: '16px',
              color: textColor
            }}
          >
            Why Choose Truemailer?
          </Title>
          <Paragraph style={{ 
            fontSize: '16px', 
            color: descriptionColor, 
            maxWidth: '720px', 
            margin: '0 auto'
          }}>
            Built with modern technologies and best practices to provide the most reliable 
            email validation service for developers and businesses.
          </Paragraph>
        </div>

        <Row gutter={[24, 24]} justify="center">
          {features.map((feature, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card 
                style={{ 
                  height: '100%',
                  background: currentTheme === 'dark' ? '#1f1f1f' : '#ffffff',
                  borderColor: currentTheme === 'dark' ? '#303030' : '#f0f0f0'
                }}
                bordered={true}
              >
                <Space direction="vertical" size="large" style={{ textAlign: 'center', width: '100%' }}>
                  <div style={{ 
                    fontSize: '32px', 
                    color: iconColor
                  }}>
                    {feature.icon}
                  </div>
                  <Title 
                    level={4} 
                    style={{ 
                      marginBottom: '8px',
                      color: textColor
                    }}
                  >
                    {feature.title}
                  </Title>
                  <Paragraph style={{ 
                    color: descriptionColor, 
                    marginBottom: '0'
                  }}>
                    {feature.description}
                  </Paragraph>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}