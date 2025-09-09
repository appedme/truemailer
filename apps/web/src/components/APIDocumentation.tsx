"use client";

import { Card, Typography, Row, Col, Tag, Button, Space } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export default function APIDocumentation() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Title level={2} className="mb-4">
            Simple API Integration
          </Title>
          <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get started in seconds with our RESTful API. No authentication required for basic usage.
          </Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card title="Quick Start" className="h-full">
              <Space direction="vertical" size="large" className="w-full">
                <div>
                  <Title level={4}>Base URL</Title>
                  <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm flex justify-between items-center">
                    <Text code>https://api.truemailer.io</Text>
                    <Button 
                      size="small" 
                      icon={<CopyOutlined />}
                      onClick={() => copyToClipboard('https://api.truemailer.io')}
                    />
                  </div>
                </div>

                <div>
                  <Title level={4}>Validate Email</Title>
                  <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm">
                    <div className="flex justify-between items-center mb-2">
                      <Text code>GET /validate?email=test@gmail.com</Text>
                      <Button 
                        size="small" 
                        icon={<CopyOutlined />}
                        onClick={() => copyToClipboard('GET /validate?email=test@gmail.com')}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Title level={4}>cURL Example</Title>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <div className="flex justify-between items-start mb-2">
                      <pre className="text-green-400 flex-1">{`curl "https://api.truemailer.io/validate?email=test@gmail.com"`}</pre>
                      <Button 
                        size="small" 
                        icon={<CopyOutlined />}
                        onClick={() => copyToClipboard('curl "https://api.truemailer.io/validate?email=test@gmail.com"')}
                        className="ml-2"
                      />
                    </div>
                  </div>
                </div>
              </Space>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="Response Format" className="h-full">
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`{
  "email": "test@gmail.com",
  "valid_syntax": true,
  "domain_exists": true,
  "is_disposable": false,
  "spam_score": 5,
  "verdict": "good"
}`}</pre>
              </div>

              <div className="mt-4">
                <Title level={4}>Spam Score Guide</Title>
                <Space direction="vertical" size="small" className="w-full">
                  <div className="flex justify-between items-center">
                    <Tag color="green">0 - 20</Tag>
                    <Text>✅ Good</Text>
                  </div>
                  <div className="flex justify-between items-center">
                    <Tag color="orange">21 - 60</Tag>
                    <Text>⚠️ Suspicious</Text>
                  </div>
                  <div className="flex justify-between items-center">
                    <Tag color="red">61+</Tag>
                    <Text>🚫 Likely Spam</Text>
                  </div>
                </Space>
              </div>
            </Card>
          </Col>
        </Row>

        <div className="text-center mt-12">
          <Title level={3}>Ready to Get Started?</Title>
          <Paragraph className="text-lg mb-6">
            No signup required. Start validating emails right away!
          </Paragraph>
          <Space size="large">
            <Button type="primary" size="large" className="rounded-lg">
              View Full Documentation
            </Button>
            <Button size="large" className="rounded-lg">
              GitHub Repository
            </Button>
          </Space>
        </div>
      </div>
    </section>
  );
}
