"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/utils/trpc";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from 'antd';
import theme from '@/theme/themeConfig';


export default function Providers({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <AntdRegistry>
      <ConfigProvider theme={theme}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools />
          </QueryClientProvider>
          <Toaster richColors />
        </ThemeProvider>
      </ConfigProvider>
    </AntdRegistry>
  );
}
