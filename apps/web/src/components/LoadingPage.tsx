import { Spin } from 'antd';

export default function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-4">
        <div className="text-4xl mb-4">📧</div>
        <Spin size="large" />
        <div className="text-lg font-semibold text-gray-700">Loading Truemailer...</div>
      </div>
    </div>
  );
}
