"use client";

import { Form, Input, Button, Card, Typography, Space, Badge, Alert } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { useEmailValidation } from '@/hooks/useEmailValidation';

const { Title, Text } = Typography;

export default function EmailValidator() {
  const [form] = Form.useForm();
  const { result, loading, error, validateEmail } = useEmailValidation();

  const onFinish = (values: { email: string }) => {
    validateEmail(values.email);
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'good':
        return 'success';
      case 'suspicious':
        return 'warning';
      case 'spam':
        return 'error';
      default:
        return 'default';
    }
  };

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'good':
        return <CheckCircleOutlined />;
      case 'suspicious':
        return <WarningOutlined />;
      case 'spam':
        return <CloseCircleOutlined />;
      default:
        return null;
    }
  };

  return (
    <Card 
      className="w-full max-w-2xl mx-auto shadow-lg"
      title={
        <Title level={3} className="text-center mb-0">
          🚀 Try Email Validation
        </Title>
      }
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        size="large"
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please enter an email address' },
            { type: 'email', message: 'Please enter a valid email format' }
          ]}
        >
          <Input
            placeholder="Enter email to validate (e.g., test@gmail.com)"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
            className="rounded-lg h-12 font-semibold"
          >
            {loading ? 'Validating...' : 'Validate Email'}
          </Button>
        </Form.Item>
      </Form>

      {error && (
        <Alert
          message="Validation Info"
          description={error}
          type="info"
          showIcon
          className="mb-4"
        />
      )}

      {result && (
        <Card className="mt-4 bg-gray-50">
          <Space direction="vertical" size="middle" className="w-full">
            <div className="text-center">
              <Badge
                status={getVerdictColor(result.verdict) as any}
                text={
                  <Text strong className="text-lg capitalize">
                    {getVerdictIcon(result.verdict)} {result.verdict}
                  </Text>
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <Text>Valid Syntax:</Text>
                <Text strong className={result.valid_syntax ? 'text-green-600' : 'text-red-600'}>
                  {result.valid_syntax ? '✅ Yes' : '❌ No'}
                </Text>
              </div>
              
              <div className="flex justify-between">
                <Text>Domain Exists:</Text>
                <Text strong className={result.domain_exists ? 'text-green-600' : 'text-red-600'}>
                  {result.domain_exists ? '✅ Yes' : '❌ No'}
                </Text>
              </div>
              
              <div className="flex justify-between">
                <Text>Disposable:</Text>
                <Text strong className={result.is_disposable ? 'text-red-600' : 'text-green-600'}>
                  {result.is_disposable ? '⚠️ Yes' : '✅ No'}
                </Text>
              </div>
              
              <div className="flex justify-between">
                <Text>Spam Score:</Text>
                <Text strong className={
                  result.spam_score <= 20 ? 'text-green-600' : 
                  result.spam_score <= 60 ? 'text-yellow-600' : 'text-red-600'
                }>
                  {result.spam_score}/100
                </Text>
              </div>
            </div>

            <div className="text-center pt-2 border-t">
              <Text type="secondary" className="text-xs">
                Email: <Text code>{result.email}</Text>
              </Text>
            </div>
          </Space>
        </Card>
      )}
    </Card>
  );
}
