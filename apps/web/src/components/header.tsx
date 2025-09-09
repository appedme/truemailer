'use client';

import { Layout, Menu, Button, Drawer, Space } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { ModeToggle } from './mode-toggle';
import UserMenu from './user-menu';

const { Header: AntHeader } = Layout;

export default function Header() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { theme: currentTheme } = useTheme();

  const backgroundColor = currentTheme === 'dark' ? '#1f1f1f' : '#ffffff';
  const borderColor = currentTheme === 'dark' ? '#303030' : '#f0f0f0';
  const textColor = currentTheme === 'dark' ? '#ffffff' : '#000000';

  const links = [
    { to: '/', label: 'Home' },
    { to: '/dashboard', label: 'Dashboard' },
  ] as const;

  const menuItems = links.map(({ to, label }) => ({
    key: to,
    label: <Link href={to}>{label}</Link>,
  }));

  return (
    <AntHeader 
      style={{ 
        background: backgroundColor,
        borderBottom: `1px solid ${borderColor}`,
        padding: 0
      }}
    >
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '0 16px',
        height: '100%'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/" style={{ 
            color: textColor, 
            fontSize: '18px', 
            fontWeight: 'bold',
            textDecoration: 'none'
          }}>
            Truemailer
          </Link>
        </div>

        {/* Desktop Menu */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'none', marginRight: '24px' }}>
            <Menu
              mode="horizontal"
              items={menuItems}
              style={{ 
                background: 'transparent',
                borderBottom: 'none'
              }}
            />
          </div>

          <Space size="middle">
            <ModeToggle />
            <UserMenu />
          </Space>

          {/* Mobile Menu Button */}
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setDrawerVisible(true)}
            style={{ display: 'none', marginLeft: '12px' }}
          />
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={280}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Menu
            mode="vertical"
            items={menuItems}
            onClick={() => setDrawerVisible(false)}
            style={{ border: 'none' }}
          />
        </div>
      </Drawer>
    </AntHeader>
  );
}