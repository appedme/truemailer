'use client'
import { Card, Row, Col, Typography, Space } from 'antd';
import { 
  CheckCircleOutlined, 
  CloudOutlined, 
  SafetyCertificateOutlined, 
  ThunderboltOutlined,
  GlobalOutlined,
  ApiOutlined 
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const features = [
  {
    icon: <CheckCircleOutlined className="text-4xl text-green-500" />,
    title: 'RFC-Compliant Validation',
    description: 'Thorough syntax validation ensuring emails meet international standards and best practices.'
  },
  {
    icon: <GlobalOutlined className="text-4xl text-blue-500" />,
    title: 'Domain & MX Verification',
    description: 'Real-time domain existence and mail server checks to ensure deliverability.'
  },
  {
    icon: <SafetyCertificateOutlined className="text-4xl text-orange-500" />,
    title: 'Disposable Email Detection',
    description: 'Blocks temporary email services like 10minutemail, YOPmail, and 500+ others.'
  },
  {
    icon: <ThunderboltOutlined className="text-4xl text-purple-500" />,
    title: 'Smart Spam Scoring',
    description: 'AI-powered heuristic analysis for detecting suspicious and spam email patterns.'
  },
  {
    icon: <CloudOutlined className="text-4xl text-cyan-500" />,
    title: 'Edge-Deployed & Fast',
    description: 'Powered by Cloudflare Workers for ultra-low latency worldwide performance.'
  },
  {
    icon: <ApiOutlined className="text-4xl text-red-500" />,
    title: 'Developer-Friendly API',
    description: 'Simple REST API with comprehensive documentation and no authentication required.'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Title level={2} className="mb-4">
            Why Choose Truemailer?
          </Title>
          <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built with modern technologies and best practices to provide the most reliable 
            email validation service for developers and businesses.
          </Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          {features.map((feature, index) => (
            <Col xs={24} md={12} lg={8} key={index}>
              <Card 
                className="h-full hover:shadow-lg transition-shadow duration-300"
                bordered={false}
              >
                <Space direction="vertical" size="large" className="text-center w-full">
                  <div>{feature.icon}</div>
                  <Title level={4} className="mb-2">
                    {feature.title}
                  </Title>
                  <Paragraph className="text-gray-600 mb-0">
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
