"use client";

import { Typography, Button, Space, Row, Col } from 'antd';
import { PlayCircleOutlined, GithubOutlined, ThunderboltOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export default function HeroSection() {
  return (
    <section id="home" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={14}>
            <Space direction="vertical" size="large" className="w-full">
              <div>
                <Title level={1} className="mb-4 text-4xl lg:text-6xl font-bold">
                  📧 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Truemailer
                  </span>
                </Title>
                <Title level={2} className="text-gray-700 font-normal mb-6">
                  Fast, Reliable Email Validation API
                </Title>
              </div>

              <Paragraph className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Validate emails in real-time with our lightning-fast API. Detect disposable addresses, 
                verify domains, and prevent spam before they enter your system. 
                <strong> Built for developers, trusted by businesses.</strong>
              </Paragraph>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-green-600">
                  <ThunderboltOutlined />
                  <span className="font-semibold">Edge-deployed & fast</span>
                </div>
                <div className="flex items-center gap-2 text-blue-600">
                  <PlayCircleOutlined />
                  <span className="font-semibold">No authentication required</span>
                </div>
                <div className="flex items-center gap-2 text-purple-600">
                  <GithubOutlined />
                  <span className="font-semibold">Open source</span>
                </div>
              </div>

              <Space size="large" className="pt-6">
                <Button 
                  type="primary" 
                  size="large" 
                  className="h-12 px-8 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
                  onClick={() => document.getElementById('try-now')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Try It Now - Free
                </Button>
                <Button 
                  size="large" 
                  className="h-12 px-8 rounded-lg font-semibold"
                  onClick={() => document.getElementById('documentation')?.scrollIntoView({ behavior: 'smooth' })}
                  ghost
                >
                  View Documentation
                </Button>
              </Space>
            </Space>
          </Col>

          <Col xs={24} lg={10}>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="space-y-4">
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div className="text-gray-500"># Quick validation example</div>
                    <div className="text-blue-300">curl</div>
                    <div className="text-yellow-300 ml-2">"https://api.truemailer.io/validate?email=test@gmail.com"</div>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <div className="text-green-800 font-mono text-sm">
                      <div>✅ Valid syntax: true</div>
                      <div>✅ Domain exists: true</div>
                      <div>✅ Not disposable: true</div>
                      <div>📊 Spam score: 5/100</div>
                      <div className="font-bold mt-2">🎉 Verdict: GOOD</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full opacity-40"></div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
}
