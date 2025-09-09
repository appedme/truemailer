'use client';

import { Typography, Button, Space, Row, Col, Card } from 'antd';
import { PlayCircleOutlined, GithubOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useTheme } from 'next-themes';

const { Title, Paragraph } = Typography;

export default function HeroSection() {
  const { theme: currentTheme } = useTheme();
  
  const backgroundColor = currentTheme === 'dark' ? '#141414' : '#f0f8ff';
  const cardBackgroundColor = currentTheme === 'dark' ? '#1f1f1f' : '#ffffff';
  const borderColor = currentTheme === 'dark' ? '#303030' : '#f0f0f0';
  const textColor = currentTheme === 'dark' ? '#ffffff' : '#000000';
  const secondaryTextColor = currentTheme === 'dark' ? '#bfbfbf' : '#666666';
  const primaryColor = currentTheme === 'dark' ? '#177ddc' : '#1890ff';
  const successColor = currentTheme === 'dark' ? '#49aa19' : '#52c41a';
  const infoColor = currentTheme === 'dark' ? '#17ddc' : '#1890ff';
  const purpleColor = currentTheme === 'dark' ? '#9254de' : '#722ed1';

  return (
    <section id="home">
      <div style={{ 
        padding: '80px 16px', 
        background: backgroundColor,
        color: textColor
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={14}>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                  <Title level={1} style={{ 
                    marginBottom: '16px', 
                    fontSize: '36px',
                    color: textColor
                  }}>
                    📧 <span style={{ 
                      background: currentTheme === 'dark' 
                        ? 'linear-gradient(to right, #177ddc, #9254de)' 
                        : 'linear-gradient(to right, #1890ff, #722ed1)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      Truemailer
                    </span>
                  </Title>
                  <Title level={2} style={{ 
                    color: currentTheme === 'dark' ? '#d9d9d9' : '#595959',
                    fontWeight: 'normal',
                    marginBottom: '24px'
                  }}>
                    Fast, Reliable Email Validation API
                  </Title>
                </div>

                <Paragraph style={{ 
                  fontSize: '18px', 
                  color: secondaryTextColor, 
                  lineHeight: '1.6',
                  maxWidth: '600px'
                }}>
                  Validate emails in real-time with our lightning-fast API. Detect disposable addresses, 
                  verify domains, and prevent spam before they enter your system. 
                  <strong> Built for developers, trusted by businesses.</strong>
                </Paragraph>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: successColor }}>
                    <ThunderboltOutlined />
                    <span style={{ fontWeight: '600' }}>Edge-deployed & fast</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: infoColor }}>
                    <PlayCircleOutlined />
                    <span style={{ fontWeight: '600' }}>No authentication required</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: purpleColor }}>
                    <GithubOutlined />
                    <span style={{ fontWeight: '600' }}>Open source</span>
                  </div>
                </div>

                <Space size="large" style={{ paddingTop: '24px' }}>
                  <Button 
                    type="primary" 
                    size="large" 
                    style={{ 
                      height: '48px', 
                      padding: '0 32px',
                      borderRadius: '6px',
                      fontWeight: '600',
                      boxShadow: currentTheme === 'dark' 
                        ? '0 4px 12px rgba(23, 125, 220, 0.3)' 
                        : '0 4px 12px rgba(24, 144, 255, 0.3)',
                      background: primaryColor,
                      borderColor: primaryColor
                    }}
                    onClick={() => document.getElementById('try-now')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Try It Now - Free
                  </Button>
                  <Button 
                    size="large" 
                    style={{ 
                      height: '48px', 
                      padding: '0 32px',
                      borderRadius: '6px',
                      fontWeight: '600',
                    //   color: textColor,
                      borderColor: currentTheme === 'dark' ? '#434343' : '#d9d9d9'
                    }}
                    onClick={() => document.getElementById('documentation')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    View Documentation
                  </Button>
                </Space>
              </Space>
            </Col>

            <Col xs={24} lg={10}>
              <div style={{ position: 'relative' }}>
                <Card style={{ 
                  borderRadius: '12px',
                  boxShadow: currentTheme === 'dark' 
                    ? '0 8px 24px rgba(0, 0, 0, 0.5)' 
                    : '0 8px 24px rgba(0, 0, 0, 0.1)',
                  background: cardBackgroundColor,
                  borderColor: borderColor
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ 
                      background: currentTheme === 'dark' ? '#1d1d1d' : '#1f1f1f',
                      color: '#73d13d',
                      padding: '16px',
                      borderRadius: '8px',
                      fontFamily: 'monospace',
                      fontSize: '14px'
                    }}>
                      <div style={{ color: '#5959' }}># Quick validation example</div>
                      <div style={{ color: '#40a9ff' }}>curl</div>
                      <div style={{ color: '#ffd666', marginLeft: '8px' }}>"https://api.truemailer.io/validate?email=test@gmail.com"</div>
                    </div>
                    
                    <div style={{ 
                      background: currentTheme === 'dark' ? '#1d2b1d' : '#f6ffed',
                      border: `1px solid ${currentTheme === 'dark' ? '#2d422d' : '#b7eb8f'}`,
                      padding: '16px',
                      borderRadius: '8px'
                    }}>
                      <div style={{ 
                        color: currentTheme === 'dark' ? '#95de64' : '#389e0d',
                        fontFamily: 'monospace',
                        fontSize: '14px'
                      }}>
                        <div>✅ Valid syntax: true</div>
                        <div>✅ Domain exists: true</div>
                        <div>✅ Not disposable: true</div>
                        <div>📊 Spam score: 5/100</div>
                        <div style={{ fontWeight: 'bold', marginTop: '8px' }}>🎉 Verdict: GOOD</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
}