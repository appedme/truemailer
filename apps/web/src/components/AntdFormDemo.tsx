"use client";

import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';

type FormValues = {
  name: string;
  email: string;
  message: string;
};

export default function AntdFormDemo() {
  const [form] = Form.useForm();

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
    <Card title="Contact Form Demo" className="max-w-md">
      <Form
        form={form}
        name="contact"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
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
          />
        </Form.Item>

        <Form.Item
          label="Email"
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
          />
        </Form.Item>

        <Form.Item
          label="Message"
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
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" block>
            Submit Message
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
