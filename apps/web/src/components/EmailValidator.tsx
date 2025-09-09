'use client';

import { Form, Input, Button, Card, Typography, Space, Badge, Alert } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { useEmailValidation } from '@/hooks/useEmailValidation';
import { useTheme } from 'next-themes';

const { Title, Text } = Typography;

export default function EmailValidator() {
  const [form] = Form.useForm();
  const { result, loading, error, validateEmail } = useEmailValidation();
  const { theme: currentTheme } = useTheme();
  
  const cardBackgroundColor = currentTheme === 'dark' ? '#1f1f1f' : '#ffffff';
  const borderColor = currentTheme === 'dark' ? '#303030' : '#f0f0f0';
  const textColor = currentTheme === 'dark' ? '#ffffff' : '#000000';
  const secondaryTextColor = currentTheme === 'dark' ? '#bfbfbf' : '#66666';
  const successColor = currentTheme === 'dark' ? '#49aa19' : '#52c41a';
  const warningColor = currentTheme === 'dark' ? '#d89614' : '#faad14';
  const errorColor = currentTheme === 'dark' ? '#dc446' : '#ff4d4f';
  const primaryColor = currentTheme === 'dark' ? '#177ddc' : '#1890ff';
  const cardSecondaryBackground = currentTheme === 'dark' ? '#141414' : '#fafafa';

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

  const getVerdictTextColor = (verdict: string) => {
    switch (verdict) {
      case 'good':
        return successColor;
      case 'suspicious':
        return warningColor;
      case 'spam':
        return errorColor;
      default:
        return textColor;
    }
  };

  return (
    <Card 
      id="try-now"
      style={{
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        boxShadow: currentTheme === 'dark' 
          ? '0 8px 24px rgba(0, 0, 0, 0.5)' 
          : '0 8px 24px rgba(0, 0, 0, 0.1)',
        background: cardBackgroundColor,
        borderColor: borderColor
      }}
      title={
        <Title level={3} style={{ textAlign: 'center', marginBottom: '0', color: textColor }}>
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
            style={{ 
              borderRadius: '6px',
              background: currentTheme === 'dark' ? '#141414' : '#ffffff',
              borderColor: currentTheme === 'dark' ? '#434343' : '#d9d9d9',
              color: textColor
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
            style={{
              borderRadius: '6px',
              height: '48px',
              fontWeight: '600',
              background: primaryColor,
              borderColor: primaryColor
            }}
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
          style={{ marginBottom: '16px' }}
        />
      )}

      {result && (
        <Card style={{ 
          marginTop: '16px',
          background: cardSecondaryBackground,
          borderColor: borderColor
        }}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div style={{ textAlign: 'center' }}>
              <Badge
                status={getVerdictColor(result.verdict) as any}
                text={
                  <Text strong style={{ 
                    fontSize: '18px', 
                    textTransform: 'capitalize',
                    color: getVerdictTextColor(result.verdict)
                  }}>
                    {getVerdictIcon(result.verdict)} {result.verdict}
                  </Text>
                }
              />
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '16px',
              fontSize: '14px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text style={{ color: secondaryTextColor }}>Valid Syntax:</Text>
                <Text strong style={{ 
                  color: result.valid_syntax ? successColor : errorColor
                }}>
                  {result.valid_syntax ? '✅ Yes' : '❌ No'}
                </Text>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text style={{ color: secondaryTextColor }}>Domain Exists:</Text>
                <Text strong style={{ 
                  color: result.domain_exists ? successColor : errorColor
                }}>
                  {result.domain_exists ? '✅ Yes' : '❌ No'}
                </Text>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text style={{ color: secondaryTextColor }}>Disposable:</Text>
                <Text strong style={{ 
                  color: result.is_disposable ? errorColor : successColor
                }}>
                  {result.is_disposable ? '⚠️ Yes' : '✅ No'}
                </Text>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text style={{ color: secondaryTextColor }}>Spam Score:</Text>
                <Text strong style={{
                  color: 
                    result.spam_score <= 20 ? successColor : 
                    result.spam_score <= 60 ? warningColor : errorColor
                }}>
                  {result.spam_score}/100
                </Text>
              </div>
            </div>

            <div style={{ 
              textAlign: 'center', 
              paddingTop: '8px', 
              borderTop: `1px solid ${borderColor}`
            }}>
              <Text style={{ fontSize: '12px', color: secondaryTextColor }}>
                Email: <Text code style={{ 
                  background: currentTheme === 'dark' ? '#1f1f1f' : '#f5f5f5',
                  color: textColor
                }}>
                  {result.email}
                </Text>
              </Text>
            </div>
          </Space>
        </Card>
      )}
    </Card>
  );
}