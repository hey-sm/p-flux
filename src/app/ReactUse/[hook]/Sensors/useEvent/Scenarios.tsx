"use client";

import React, { useState, useRef, useEffect } from "react";
import { useEvent } from "react-use";

// 鼠标跟踪示例
export function MouseTracker() {
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
export function KeyboardListener() {
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

// 元素大小监听示例
export function ElementResizer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEvent(
    "resize",
    () => {
      if (containerRef.current) {
        setSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    },
    window
  );

  // 初始化
  useEffect(() => {
    if (containerRef.current) {
      setSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  }, []);

  return (
    <div className="p-4 border rounded-md" ref={containerRef}>
      <p>
        元素大小: 宽度: {size.width}px, 高度: {size.height}px
      </p>
    </div>
  );
}

// 导出场景示例组件
export function Scenarios() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">useEvent 使用场景示例</h2>

      <div>
        <h3 className="text-lg font-medium mb-2">鼠标跟踪</h3>
        <MouseTracker />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">键盘事件监听</h3>
        <KeyboardListener />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">窗口大小变化监听</h3>
        <ElementResizer />
      </div>
    </div>
  );
}

// 导出示例代码
export const EXAMPLES = {
  mouseTracker: `const MouseTracker = () => {
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

  keyboardListener: `const KeyboardListener = () => {
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

  elementResizer: `const ElementResizer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEvent('resize', () => {
    if (containerRef.current) {
      setSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  }, window);

  // 初始化
  useEffect(() => {
    if (containerRef.current) {
      setSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  }, []);

  return (
    <div ref={containerRef}>
      <p>元素大小: 宽度: {size.width}px, 高度: {size.height}px</p>
    </div>
  );
};`,
};
