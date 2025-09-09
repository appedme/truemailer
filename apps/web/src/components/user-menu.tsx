'use client';

import { Dropdown, Button, Skeleton } from 'antd';
import { UserOutlined, LogoutOutlined, MailOutlined } from '@ant-design/icons';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from 'next-themes';

export default function UserMenu() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const { theme: currentTheme } = useTheme();

  const backgroundColor = currentTheme === 'dark' ? '#1f1f1f' : '#ffffff';
  const borderColor = currentTheme === 'dark' ? '#303030' : '#f0f0f0';
  const textColor = currentTheme === 'dark' ? '#ffffff' : '#000000';
  const primaryColor = currentTheme === 'dark' ? '#177ddc' : '#1890ff';

  if (isPending) {
    return <Skeleton.Button active style={{ height: '36px', width: '96px' }} />;
  }

  if (!session) {
    return (
      <Button 
        variant="outlined" 
        style={{
          color: textColor,
          borderColor: currentTheme === 'dark' ? '#434343' : '#d9d9d9'
        }}
        asChild
      >
        <Link href="/login">Sign In</Link>
      </Button>
    );
  }

  const items = [
    {
      key: 'profile',
      label: (
        <div>
          <div style={{ fontWeight: '600', color: textColor }}>{session.user.name}</div>
          <div style={{ fontSize: '12px', color: currentTheme === 'dark' ? '#bfbfbf' : '#8c8c8c' }}>
            {session.user.email}
          </div>
        </div>
      ),
      disabled: true
    },
    {
      type: 'divider',
    },
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: <MailOutlined />,
      onClick: () => router.push('/dashboard')
    },
    {
      key: 'signout',
      label: 'Sign Out',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: () => {
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push('/');
            },
          },
        });
      }
    }
  ];

 return (
    <Dropdown
      menu={{ items }}
      trigger={['click']}
    >
      <Button 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: textColor,
          borderColor: currentTheme === 'dark' ? '#434343' : '#d9d9d9'
        }}
      >
        <UserOutlined />
        {session.user.name}
      </Button>
    </Dropdown>
  );
}