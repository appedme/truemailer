'use client';

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useTheme } from 'next-themes';

export default function Loader() {
  const { theme: currentTheme } = useTheme();
  
  const primaryColor = currentTheme === 'dark' ? '#177ddc' : '#1890ff';

  const antIcon = <LoadingOutlined style={{ fontSize: 24, color: primaryColor }} spin />;

  return (
    <div style={{ 
      display: 'flex', 
      height: '100%', 
      alignItems: 'center', 
      justifyContent: 'center', 
      paddingTop: '32px'
    }}>
      <Spin indicator={antIcon} />
    </div>
  );
}