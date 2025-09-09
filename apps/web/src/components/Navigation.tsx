"use client";

import { Layout, Menu, Button, Drawer, Space } from 'antd';
import { MenuOutlined, GithubOutlined, ApiOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Link from 'next/link';

const { Header } = Layout;

export default function Navigation() {
  const [drawerVisible, setDrawerVisible] = useState(false);

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
    <Header className="bg-white shadow-sm sticky top-0 z-50 px-4">
      <div className="container mx-auto flex justify-between items-center h-full">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
          <span>📧</span>
          <span>Truemailer</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Menu
            mode="horizontal"
            items={menuItems}
            className="border-0 bg-transparent"
            style={{ minWidth: 0 }}
          />
          
          <Space size="middle">
            <Button
              type="text"
              icon={<ApiOutlined />}
              onClick={() => document.getElementById('documentation')?.scrollIntoView({ behavior: 'smooth' })}
            >
              API
            </Button>
            <Button
              type="text"
              icon={<GithubOutlined />}
              onClick={() => window.open('https://github.com/appedme/truemailer', '_blank', 'noopener,noreferrer')}
            >
              GitHub
            </Button>
            <Button 
              type="primary" 
              onClick={() => document.getElementById('try-now')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-lg"
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
          className="md:hidden"
        />
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="📧 Truemailer"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={280}
      >
        <div className="space-y-4">
          <Menu
            mode="vertical"
            items={menuItems}
            className="border-0"
            onClick={() => setDrawerVisible(false)}
          />
          
          <div className="space-y-3 pt-4 border-t">
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
              className="rounded-lg"
            >
              Try Free
            </Button>
          </div>
        </div>
      </Drawer>
    </Header>
  );
}
