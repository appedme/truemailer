'use client';

import { Card, Typography, Row, Col, Tag, Button, Space } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { useTheme } from 'next-themes';

const { Title, Paragraph, Text } = Typography;

export default function APIDocumentation() {
  const { theme: currentTheme } = useTheme();
  
  const backgroundColor = currentTheme === 'dark' ? '#141414' : '#ffffff';
  const cardBackgroundColor = currentTheme === 'dark' ? '#1f1f1f' : '#ffffff';
  const borderColor = currentTheme === 'dark' ? '#303030' : '#f0f0f0';
  const textColor = currentTheme === 'dark' ? '#ffffff' : '#000000';
  const secondaryTextColor = currentTheme === 'dark' ? '#bfbfbf' : '#666666';
  const codeBlockBackground = currentTheme === 'dark' ? '#1d1d1d' : '#f5f5f5';
  const primaryColor = currentTheme === 'dark' ? '#177ddc' : '#1890ff';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <section id="documentation">
      <div style={{ 
        padding: '64px 16px', 
        background: backgroundColor,
        color: textColor
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <Title level={2} style={{ marginBottom: '16px', color: textColor }}>
              Simple API Integration
            </Title>
            <Paragraph style={{ 
              fontSize: '18px', 
              color: secondaryTextColor, 
              maxWidth: '720px', 
              margin: '0 auto'
            }}>
              Get started in seconds with our RESTful API. No authentication required for basic usage.
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <Card 
                title="Quick Start" 
                style={{ 
                  height: '100%',
                  background: cardBackgroundColor,
                  borderColor: borderColor
                }}
              >
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <div>
                    <Title level={4} style={{ color: textColor }}>Base URL</Title>
                    <div style={{ 
                      background: codeBlockBackground,
                      padding: '12px',
                      borderRadius: '6px',
                      fontFamily: 'monospace',
                      fontSize: '14px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <Text code style={{ 
                        background: 'transparent',
                        color: currentTheme === 'dark' ? '#73d13d' : '#52c41a'
                      }}>
                        https://api.truemailer.io
                      </Text>
                      <Button 
                        size="small" 
                        icon={<CopyOutlined />}
                        onClick={() => copyToClipboard('https://api.truemailer.io')}
                        style={{
                          color: textColor,
                          borderColor: currentTheme === 'dark' ? '#434343' : '#d9d9d9'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <Title level={4} style={{ color: textColor }}>Validate Email</Title>
                    <div style={{ 
                      background: codeBlockBackground,
                      padding: '12px',
                      borderRadius: '6px',
                      fontFamily: 'monospace',
                      fontSize: '14px'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: '8px'
                      }}>
                        <Text code style={{ 
                          background: 'transparent',
                          color: currentTheme === 'dark' ? '#73d13d' : '#52c41a'
                        }}>
                          GET /validate?email=test@gmail.com
                        </Text>
                        <Button 
                          size="small" 
                          icon={<CopyOutlined />}
                          onClick={() => copyToClipboard('GET /validate?email=test@gmail.com')}
                          style={{
                            color: textColor,
                            borderColor: currentTheme === 'dark' ? '#434343' : '#d9d9d9'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Title level={4} style={{ color: textColor }}>cURL Example</Title>
                    <div style={{ 
                      background: currentTheme === 'dark' ? '#1d1d1d' : '#1f1f1f',
                      color: currentTheme === 'dark' ? '#73d13d' : '#52c41a',
                      padding: '16px',
                      borderRadius: '6px',
                      fontFamily: 'monospace',
                      fontSize: '14px',
                      overflowX: 'auto'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'flex-start',
                        marginBottom: '8px'
                      }}>
                        <pre style={{ 
                          color: currentTheme === 'dark' ? '#73d13d' : '#52c41a',
                          margin: 0,
                          flex: 1
                        }}>
                          {`curl "https://api.truemailer.io/validate?email=test@gmail.com"`}
                        </pre>
                        <Button 
                          size="small" 
                          icon={<CopyOutlined />}
                          onClick={() => copyToClipboard('curl "https://api.truemailer.io/validate?email=test@gmail.com"')}
                          style={{
                            color: textColor,
                            borderColor: currentTheme === 'dark' ? '#434343' : '#d9d9d9',
                            marginLeft: '8px'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Space>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card 
                title="Response Format" 
                style={{ 
                  height: '100%',
                  background: cardBackgroundColor,
                  borderColor: borderColor
                }}
              >
                <div style={{ 
                  background: currentTheme === 'dark' ? '#1d1d1d' : '#1f1f1f',
                  color: currentTheme === 'dark' ? '#73d13d' : '#52c41a',
                  padding: '16px',
                  borderRadius: '6px',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  overflowX: 'auto'
                }}>
                  <pre style={{ 
                    color: currentTheme === 'dark' ? '#73d13d' : '#52c41a',
                    margin: 0
                  }}>
                    {`{
  "email": "test@gmail.com",
  "valid_syntax": true,
  "domain_exists": true,
  "is_disposable": false,
  "spam_score": 5,
  "verdict": "good"
}`}
                  </pre>
                </div>

                <div style={{ marginTop: '16px' }}>
                  <Title level={4} style={{ color: textColor }}>Spam Score Guide</Title>
                  <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Tag color="green">0 - 20</Tag>
                      <Text style={{ color: textColor }}>✅ Good</Text>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Tag color="orange">21 - 60</Tag>
                      <Text style={{ color: textColor }}>⚠️ Suspicious</Text>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Tag color="red">61+</Tag>
                      <Text style={{ color: textColor }}>🚫 Likely Spam</Text>
                    </div>
                  </Space>
                </div>
              </Card>
            </Col>
          </Row>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Title level={3} style={{ color: textColor }}>Ready to Get Started?</Title>
            <Paragraph style={{ 
              fontSize: '18px', 
              marginBottom: '24px',
              color: secondaryTextColor
            }}>
              No signup required. Start validating emails right away!
            </Paragraph>
            <Space size="large">
              <Button 
                type="primary" 
                size="large" 
                style={{ 
                  borderRadius: '6px',
                  background: primaryColor,
                  borderColor: primaryColor
                }}
              >
                View Full Documentation
              </Button>
              <Button 
                size="large" 
                style={{ 
                  borderRadius: '6px',
                  color: textColor,
                  borderColor: currentTheme === 'dark' ? '#434343' : '#d9d9d9'
                }}
              >
                GitHub Repository
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </section>
  );
}