"use client";

import React, { useState, useRef, useEffect } from "react";
import { useEvent } from "react-use";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

// 鼠标跟踪示例
function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // 使用useEvent监听鼠标移动
  useEvent("mousemove", (event: MouseEvent) => {
    setPosition({
      x: event.clientX,
      y: event.clientY,
    });
  });

  return (
    <div className="p-4 border rounded-md">
      <p>
        鼠标位置: X: {position.x}, Y: {position.y}
      </p>
    </div>
  );
}

// 键盘事件监听示例
function KeyboardListener() {
  const [lastKey, setLastKey] = useState("");
  const [keys, setKeys] = useState<string[]>([]);

  // 使用useEvent监听键盘按下事件
  useEvent("keydown", (event: KeyboardEvent) => {
    setLastKey(event.key);
    setKeys((prev) => {
      const newKeys = [...prev, event.key];
      // 只保留最后5个按键
      return newKeys.slice(Math.max(0, newKeys.length - 5));
    });
  });

  return (
    <div className="p-4 border rounded-md">
      <div className="flex flex-col items-center">
        <p className="mb-2">最后按下的键: {lastKey || "无"}</p>
        <div className="flex space-x-2">
          {keys.map((key, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-slate-100 rounded text-sm"
            >
              {key === " " ? "Space" : key}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// 窗口大小监听示例
function WindowResizer() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEvent(
    "resize",
    () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    },
    window
  );

  // 初始化
  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  return (
    <div className="p-4 border rounded-md">
      <p>
        窗口大小: 宽度: {windowSize.width}px, 高度: {windowSize.height}px
      </p>
    </div>
  );
}

// 导出示例组件
export const Examples = [
  {
    title: "鼠标跟踪",
    example: <MouseTracker />,
    code: `const MouseTracker = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // 使用useEvent监听鼠标移动
  useEvent('mousemove', (event: MouseEvent) => {
    setPosition({
      x: event.clientX,
      y: event.clientY,
    });
  });

  return (
    <div>
      <p>鼠标位置: X: {position.x}, Y: {position.y}</p>
    </div>
  );
};`,
  },
  {
    title: "键盘事件监听",
    example: <KeyboardListener />,
    code: `const KeyboardListener = () => {
  const [lastKey, setLastKey] = useState("");

  // 使用useEvent监听键盘按下事件
  useEvent('keydown', (event: KeyboardEvent) => {
    setLastKey(event.key);
  });

  return (
    <div>
      <p>最后按下的键: {lastKey || "无"}</p>
    </div>
  );
};`,
  },
  {
    title: "窗口大小监听",
    example: <WindowResizer />,
    code: `const WindowResizer = () => {
  const [windowSize, setWindowSize] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0 
  });

  useEvent('resize', () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, window);

  // 初始化
  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  return (
    <div>
      <p>窗口大小: 宽度: {windowSize.width}px, 高度: {windowSize.height}px</p>
    </div>
  );
};`,
  },
];
