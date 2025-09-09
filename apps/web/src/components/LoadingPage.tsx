'use client';

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useTheme } from 'next-themes';

export default function LoadingPage() {
  const { theme: currentTheme } = useTheme();
  
  const backgroundColor = currentTheme === 'dark' ? '#141414' : '#f0f8ff';
  const textColor = currentTheme === 'dark' ? '#ffffff' : '#00000';
  const primaryColor = currentTheme === 'dark' ? '#177ddc' : '#1890ff';

  const antIcon = <LoadingOutlined style={{ fontSize: 24, color: primaryColor }} spin />;

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: backgroundColor
    }}>
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{ fontSize: '32px', marginBottom: '16px' }}>📧</div>
        <Spin indicator={antIcon} size="large" />
        <div style={{ fontSize: '18px', fontWeight: '600', color: textColor }}>
          Loading Truemailer...
        </div>
      </div>
    </div>
  );
}