'use client';

import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { useTheme } from 'next-themes';

type FormValues = {
 name: string;
  email: string;
  message: string;
};

export default function AntdFormDemo() {
  const [form] = Form.useForm();
  const { theme: currentTheme } = useTheme();
  
  const cardBackgroundColor = currentTheme === 'dark' ? '#1f1f1f' : '#ffffff';
  const borderColor = currentTheme === 'dark' ? '#303030' : '#f0f0f0';
  const textColor = currentTheme === 'dark' ? '#ffffff' : '#000000';
  const primaryColor = currentTheme === 'dark' ? '#177ddc' : '#1890ff';

  const onFinish = (values: FormValues) => {
    console.log('Form submitted:', values);
    message.success('Form submitted successfully!');
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Form validation failed:', errorInfo);
    message.error('Please fill in all required fields');
  };

  return (
    <Card 
      title="Contact Form Demo" 
      style={{ 
        maxWidth: '500px',
        background: cardBackgroundColor,
        borderColor: borderColor
      }}
    >
      <Form
        form={form}
        name="contact"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label={<span style={{ color: textColor }}>Name</span>}
          name="name"
          rules={[
            { required: true, message: 'Please enter your name!' },
            { min: 2, message: 'Name must be at least 2 characters' }
          ]}
        >
          <Input 
            prefix={<UserOutlined />} 
            placeholder="Enter your name" 
            size="large"
            style={{
              background: currentTheme === 'dark' ? '#141414' : '#ffffff',
              borderColor: currentTheme === 'dark' ? '#434343' : '#d9d9d9',
              color: textColor
            }}
          />
        </Form.Item>

        <Form.Item
          label={<span style={{ color: textColor }}>Email</span>}
          name="email"
          rules={[
            { required: true, message: 'Please enter your email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input 
            prefix={<MailOutlined />} 
            placeholder="Enter your email" 
            size="large"
            style={{
              background: currentTheme === 'dark' ? '#141414' : '#ffffff',
              borderColor: currentTheme === 'dark' ? '#434343' : '#d9d9d9',
              color: textColor
            }}
          />
        </Form.Item>

        <Form.Item
          label={<span style={{ color: textColor }}>Message</span>}
          name="message"
          rules={[
            { required: true, message: 'Please enter your message!' },
            { min: 10, message: 'Message must be at least 10 characters' }
          ]}
        >
          <Input.TextArea 
            rows={4}
            placeholder="Enter your message"
            showCount
            maxLength={500}
            style={{
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
            size="large" 
            block
            style={{
              background: primaryColor,
              borderColor: primaryColor
            }}
          >
            Submit Message
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}