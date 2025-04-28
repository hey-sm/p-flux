"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { createBreakpoint } from "react-use";

// 使用react-use库的createBreakpoint创建断点hook
const useBreakpoint = createBreakpoint({
  mobile: 0,
  tablet: 768,
  desktop: 1024,
});

// 响应式组件示例
function ResponsiveComponent() {
  const breakpoint = useBreakpoint();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">响应式组件</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 border rounded-md bg-slate-50">
          <div className="text-xl font-medium text-center p-4">
            当前屏幕类型: <span className="font-bold">{breakpoint}</span>
          </div>

          <div className="mt-4 flex justify-center gap-4">
            <div
              className={`px-3 py-2 rounded-lg ${
                breakpoint === "mobile"
                  ? "bg-blue-100 font-bold border-2 border-blue-400"
                  : "bg-white border"
              }`}
            >
              移动设备
            </div>
            <div
              className={`px-3 py-2 rounded-lg ${
                breakpoint === "tablet"
                  ? "bg-green-100 font-bold border-2 border-green-400"
                  : "bg-white border"
              }`}
            >
              平板设备
            </div>
            <div
              className={`px-3 py-2 rounded-lg ${
                breakpoint === "desktop"
                  ? "bg-amber-100 font-bold border-2 border-amber-400"
                  : "bg-white border"
              }`}
            >
              桌面设备
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-gray-500">
        尝试调整浏览器窗口大小，观察断点变化
      </CardFooter>
    </Card>
  );
}

// 导出示例组件
export const Examples = [
  {
    title: "响应式组件",
    example: <ResponsiveComponent />,
    code: `
import { createBreakpoint } from 'react-use';

const useBreakpoint = createBreakpoint({
  mobile: 0,
  tablet: 768,
  desktop: 1024,
});

export function ResponsiveComponent() {
  const breakpoint = useBreakpoint();

  return (
    <div>
      当前屏幕类型: {breakpoint}
    </div>
  );
}`,
  },
];
