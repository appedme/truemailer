'use client';

import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";
import { Button, Input, Form, Typography } from 'antd';
import { useRouter } from "next/navigation";
import { useTheme } from 'next-themes';

const { Title, Text } = Typography;

export default function SignInForm({
  onSwitchToSignUp,
}: {
  onSwitchToSignUp: () => void;
}) {
  const router = useRouter();
  const { isPending } = authClient.useSession();
  const { theme: currentTheme } = useTheme();

  const backgroundColor = currentTheme === 'dark' ? '#1f1f1f' : '#ffffff';
  const textColor = currentTheme === 'dark' ? '#ffffff' : '#000000';
  const secondaryTextColor = currentTheme === 'dark' ? '#bfbfbf' : '#666666';
  const primaryColor = currentTheme === 'dark' ? '#177ddc' : '#1890ff';

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: () => {
            router.push("/dashboard");
            toast.success("Sign in successful");
          },
          onError: (error) => {
            toast.error(error.error.message || error.error.statusText);
          },
        },
      );
    },
    validators: {
      onSubmit: z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
      }),
    },
  });

  if (isPending) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '200px' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '40px auto', 
      padding: '24px',
      background: backgroundColor,
      borderRadius: '8px'
    }}>
      <Title level={2} style={{ 
        textAlign: 'center', 
        marginBottom: '24px',
        color: textColor
      }}>
        Welcome Back
      </Title>

      <Form
        layout="vertical"
        onFinish={(values) => {
          form.handleSubmit();
        }}
      >
        <Form.Item
          label={<Text style={{ color: textColor }}>Email</Text>}
          name="email"
          rules={[{ required: true, message: 'Please enter your email' }]}
        >
          <Input
            type="email"
            placeholder="Enter your email"
            style={{
              background: currentTheme === 'dark' ? '#141414' : '#ffffff',
              borderColor: currentTheme === 'dark' ? '#434343' : '#d9d9d9',
              color: textColor
            }}
          />
        </Form.Item>

        <Form.Item
          label={<Text style={{ color: textColor }}>Password</Text>}
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password
            placeholder="Enter your password"
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
            block
            style={{
              background: primaryColor,
              borderColor: primaryColor
            }}
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>

      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <Button 
          type="link" 
          onClick={onSwitchToSignUp}
          style={{ color: primaryColor }}
        >
          Need an account? Sign Up
        </Button>
      </div>
    </div>
  );
}