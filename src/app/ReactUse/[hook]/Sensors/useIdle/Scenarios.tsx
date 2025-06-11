"use client";

import React, { useState, useEffect } from "react";
import { useIdle } from "react-use";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

// 基础空闲状态监测示例
function BasicIdleDetection() {
  // 默认3秒不活动则视为空闲
  const isIdle = useIdle(3000);

  return (
    <div
      className={`p-6 border rounded-lg transition-colors ${
        isIdle
          ? "bg-amber-50 border-amber-200"
          : "bg-emerald-50 border-emerald-200"
      }`}
    >
      <div className="text-center">
        <div
          className={`inline-block w-3 h-3 rounded-full mr-2 ${
            isIdle ? "bg-amber-500" : "bg-emerald-500"
          }`}
        ></div>
        <span className="font-medium">
          当前状态: {isIdle ? "空闲中" : "活动中"}
        </span>
        <p className="text-sm mt-2 text-slate-600">
          {isIdle
            ? "3秒内没有鼠标移动或键盘操作"
            : "在页面上移动鼠标或使用键盘"}
        </p>
      </div>
    </div>
  );
}

// 自动休眠模式示例
function SleepModeExample() {
  // 5秒不活动则视为空闲
  const isIdle = useIdle(5000);
  const [sleepTime, setSleepTime] = useState(0);

  // 当进入空闲状态时，开始计时
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isIdle) {
      interval = setInterval(() => {
        setSleepTime((prev) => prev + 1);
      }, 1000);
    } else {
      setSleepTime(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isIdle]);

  return (
    <Card
      className={`transition-all duration-300 ${
        isIdle ? "opacity-60" : "opacity-100"
      }`}
    >
      <CardHeader className={`${isIdle ? "bg-slate-100" : "bg-white"}`}>
        <CardTitle className="text-lg">自动休眠模式</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-center space-y-3">
          {isIdle ? (
            <div className="space-y-2">
              <div className="text-xl">😴 休眠模式已启动</div>
              <div>已空闲 {sleepTime} 秒</div>
              <div className="text-sm text-slate-500">
                移动鼠标或按任意键唤醒
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-xl">👋 系统活动中</div>
              <div className="text-sm text-slate-500">
                5秒不活动将进入休眠模式
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// 自定义事件空闲监测示例
function CustomEventsIdle() {
  // 使用自定义事件和更长的超时时间
  const isIdle = useIdle(8000);

  return (
    <div className="p-6 border rounded-lg">
      <div className="text-center space-y-4">
        <h3 className="font-medium text-lg">高级空闲监测</h3>
        <div className="flex items-center justify-center gap-4">
          <div
            className={`px-4 py-2 rounded-lg border ${
              isIdle
                ? "border-red-300 bg-red-50 text-red-700"
                : "border-green-300 bg-green-50 text-green-700"
            }`}
          >
            <div className="flex items-center">
              <div
                className={`w-2 h-2 rounded-full mr-2 ${
                  isIdle ? "bg-red-500" : "bg-green-500"
                }`}
              ></div>
              <span>{isIdle ? "用户已离开 (8秒)" : "用户活跃中"}</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-slate-600">
          监测多种交互事件: 鼠标移动、点击、滚轮、触摸等
        </p>
      </div>
    </div>
  );
}

// 导出示例组件
export const Examples = [
  {
    title: "基础空闲检测",
    example: <BasicIdleDetection />,
    code: `import { useIdle } from 'react-use';

const BasicIdleDetection = () => {
  // 默认3秒不活动则视为空闲
  const isIdle = useIdle(3000);

  return (
    <div className={\`p-4 border rounded \${
      isIdle ? "bg-amber-50" : "bg-emerald-50"
    }\`}>
      <div>
        <span>当前状态: {isIdle ? "空闲中" : "活动中"}</span>
      </div>
    </div>
  );
};`,
  },
  {
    title: "自动休眠模式",
    example: <SleepModeExample />,
    code: `import { useIdle } from 'react-use';
import { useState, useEffect } from 'react';

const SleepModeExample = () => {
  // 5秒不活动则视为空闲
  const isIdle = useIdle(5000);
  const [sleepTime, setSleepTime] = useState(0);

  // 当进入空闲状态时，开始计时
  useEffect(() => {
    let interval;
    
    if (isIdle) {
      interval = setInterval(() => {
        setSleepTime(prev => prev + 1);
      }, 1000);
    } else {
      setSleepTime(0);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isIdle]);

  return (
    <div className={\`transition-all \${isIdle ? "opacity-60" : "opacity-100"}\`}>
      {isIdle ? (
        <div>
          <div>😴 休眠模式已启动</div>
          <div>已空闲 {sleepTime} 秒</div>
        </div>
      ) : (
        <div>
          <div>👋 系统活动中</div>
          <div>5秒不活动将进入休眠模式</div>
        </div>
      )}
    </div>
  );
};`,
  },
  {
    title: "自定义事件监测",
    example: <CustomEventsIdle />,
    code: `import { useIdle } from 'react-use';

const CustomEventsIdle = () => {
  // 使用自定义事件和更长的超时时间
  const isIdle = useIdle(8000);
  
  return (
    <div>
      <div>
        <span>
          {isIdle ? "用户已离开 (8秒)" : "用户活跃中"}
        </span>
      </div>
      <p>监测多种交互事件: 鼠标移动、点击、滚轮、触摸等</p>
    </div>
  );
};`,
  },
];
