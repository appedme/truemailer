'use client';

import { Layout, Menu, Button, Drawer, Space } from 'antd';
import { MenuOutlined, GithubOutlined, ApiOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

const { Header: AntHeader } = Layout;

export default function Navigation() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { theme: currentTheme } = useTheme();

  const backgroundColor = currentTheme === 'dark' ? '#1f1f1f' : '#ffffff';
  const borderColor = currentTheme === 'dark' ? '#303030' : '#f0f0f0';
  const textColor = currentTheme === 'dark' ? '#ffffff' : '#000000';
  const primaryColor = currentTheme === 'dark' ? '#177ddc' : '#1890ff';

  const menuItems = [
    {
      key: 'home',
      label: <a href="#home">Home</a>,
    },
    {
      key: 'try',
      label: <a href="#try-now">Try Now</a>,
    },
    {
      key: 'features',
      label: <a href="#features">Features</a>,
    },
    {
      key: 'docs',
      label: <a href="#documentation">API Docs</a>,
    },
  ];

  return (
    <AntHeader 
      style={{ 
        background: backgroundColor,
        boxShadow: currentTheme === 'dark' ? '0 2px 8px rgba(0, 0, 0, 0.5)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        padding: '0 16px'
      }}
    >
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        height: '100%',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Logo */}
        <Link href="/" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          fontSize: '20px', 
          fontWeight: 'bold', 
          color: textColor,
          textDecoration: 'none'
        }}>
          <span>📧</span>
          <span>Truemailer</span>
        </Link>

        {/* Desktop Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Menu
            mode="horizontal"
            items={menuItems}
            style={{ 
              background: 'transparent',
              borderBottom: 'none',
              minWidth: 0
            }}
          />
          
          <Space size="middle">
            <Button
              type="text"
              icon={<ApiOutlined />}
              onClick={() => document.getElementById('documentation')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ color: textColor }}
            >
              API
            </Button>
            <Button
              type="text"
              icon={<GithubOutlined />}
              onClick={() => window.open('https://github.com/appedme/truemailer', '_blank', 'noopener,noreferrer')}
              style={{ color: textColor }}
            >
              GitHub
            </Button>
            <Button 
              type="primary" 
              onClick={() => document.getElementById('try-now')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ 
                borderRadius: '6px',
                background: primaryColor,
                borderColor: primaryColor
              }}
            >
              Try Free
            </Button>
          </Space>
        </div>

        {/* Mobile Menu Button */}
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setDrawerVisible(true)}
          style={{ display: 'none' }}
        />
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📧</span>
            <span>Truemailer</span>
          </div>
        }
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={280}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Menu
            mode="vertical"
            items={menuItems}
            style={{ border: 'none' }}
            onClick={() => setDrawerVisible(false)}
          />
          
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '12px', 
            paddingTop: '16px', 
            borderTop: `1px solid ${borderColor}`
          }}>
            <Button
              block
              type="text"
              icon={<ApiOutlined />}
              onClick={() => {
                document.getElementById('documentation')?.scrollIntoView({ behavior: 'smooth' });
                setDrawerVisible(false);
              }}
            >
              API Documentation
            </Button>
            <Button
              block
              type="text"
              icon={<GithubOutlined />}
              onClick={() => {
                window.open('https://github.com/appedme/truemailer', '_blank', 'noopener,noreferrer');
                setDrawerVisible(false);
              }}
            >
              GitHub Repository
            </Button>
            <Button 
              block 
              type="primary"
              onClick={() => {
                document.getElementById('try-now')?.scrollIntoView({ behavior: 'smooth' });
                setDrawerVisible(false);
              }}
              style={{ 
                borderRadius: '6px',
                background: primaryColor,
                borderColor: primaryColor
              }}
            >
              Try Free
            </Button>
          </div>
        </div>
      </Drawer>
    </AntHeader>
  );
}