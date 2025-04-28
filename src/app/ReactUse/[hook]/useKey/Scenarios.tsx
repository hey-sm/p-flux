"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useKey } from "react-use";

// =====================================
// 使用 react-use 的 useKey 实现的示例
// =====================================

// 示例1：文本输入工具 - 按键计数器 (全局)
function KeyboardCounter() {
  const [lastKey, setLastKey] = useState<string>("");
  const [keyCount, setKeyCount] = useState<Record<string, number>>({});

  // 处理按键事件的函数
  const handleKey = useCallback((event: KeyboardEvent) => {
    const key = event.key;
    setLastKey(key);

    // 更新按键计数
    setKeyCount((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));
  }, []);

  // 使用useKey钩子，全局监听
  useKey(
    () => true, // 监听所有按键
    handleKey,
    { event: "keydown" } // 移除 target
  );

  // 展示最常按的3个键
  const topKeys = Object.entries(keyCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">全局按键计数器</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className="p-4 border rounded-md bg-slate-50" // 移除 focus 样式和 tabIndex
          style={{ minHeight: "200px" }}
        >
          <h3 className="text-sm font-medium mb-2">在页面任意位置按键</h3>
          <div className="text-3xl font-mono text-center p-4 bg-white border rounded-md">
            {lastKey || "等待按键..."}
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4">
            {topKeys.map(([key, count]) => (
              <div key={key} className="text-center p-2 border rounded-md">
                <div className="text-lg font-mono">{key}</div>
                <div className="text-xs text-gray-500">按下 {count} 次</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-gray-500">
        这个示例使用了 useKey 钩子，在全局范围内捕获按键
      </CardFooter>
    </Card>
  );
}

// 示例2：快捷键管理器 (组件范围)
function ShortcutManager() {
  const [actions, setActions] = useState<string[]>([]);
  const elementRef = useRef<HTMLDivElement>(null);
  const [isTargetReady, setIsTargetReady] = useState(false);

  // 添加操作记录
  const addAction = useCallback((action: string) => {
    setActions((prev) => {
      const newActions = [action, ...prev.slice(0, 4)]; // 保留最近5条
      return newActions;
    });
  }, []);

  // 各种快捷键的处理函数
  const handleCopy = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
      addAction("复制文本"); // 移除 (全局)
    },
    [addAction]
  );

  const handlePaste = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
      addAction("粘贴文本"); // 移除 (全局)
    },
    [addAction]
  );

  const handleSave = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
      addAction("保存文档"); // 移除 (全局)
    },
    [addAction]
  );

  const handleFind = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
      addAction("查找内容"); // 移除 (全局)
    },
    [addAction]
  );

  // 挂载后标记 target 已准备好并聚焦
  useEffect(() => {
    if (elementRef.current) {
      setIsTargetReady(true);
      elementRef.current.focus();
    }
  }, []);

  // 根据状态确定 target
  const target = isTargetReady ? elementRef.current : null;

  // 复制 (Ctrl+C) - 组件范围
  useKey(
    (event) => event.key === "c" && event.ctrlKey,
    handleCopy,
    { event: "keydown", target },
    [target, handleCopy]
  );

  // 粘贴 (Ctrl+V) - 组件范围
  useKey(
    (event) => event.key === "v" && event.ctrlKey,
    handlePaste,
    { event: "keydown", target },
    [target, handlePaste]
  );

  // 保存 (Ctrl+S) - 组件范围
  useKey(
    (event) => event.key === "s" && event.ctrlKey,
    handleSave,
    { event: "keydown", target },
    [target, handleSave]
  );

  // 查找 (Ctrl+F) - 组件范围
  useKey(
    (event) => event.key === "f" && event.ctrlKey,
    handleFind,
    { event: "keydown", target },
    [target, handleFind]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">快捷键管理器 (组件范围)</CardTitle>{" "}
        {/* 更新标题 */}
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          ref={elementRef}
          tabIndex={0}
          className="p-4 bg-slate-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          style={{ minHeight: "200px" }}
          onClick={() => {
            elementRef.current?.focus();
          }}
        >
          <p className="mb-2 text-sm">
            点击此区域获得焦点，然后尝试以下快捷键: {/* 更新提示 */}
          </p>
          <Input
            placeholder="在此处输入文本，然后尝试常用快捷键..."
            className="mb-4"
          />

          <div className="space-y-2">
            <div className="font-medium text-xs">操作记录:</div>
            {actions.length > 0 ? (
              <ul className="text-sm space-y-1">
                {actions.map((action, i) => (
                  <li key={i} className="p-1 bg-white rounded border">
                    {action}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-sm text-gray-500">
                尚无操作，请尝试快捷键
              </div>
            )}
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-md text-xs">
          <p>可用快捷键 (点击组件获得焦点后生效):</p> {/* 更新提示 */}
          <ul className="grid grid-cols-2 gap-2 mt-1">
            <li>
              <code className="bg-slate-200 px-1 rounded">Ctrl+C</code> 复制
            </li>
            <li>
              <code className="bg-slate-200 px-1 rounded">Ctrl+V</code> 粘贴
            </li>
            <li>
              <code className="bg-slate-200 px-1 rounded">Ctrl+S</code> 保存
            </li>
            <li>
              <code className="bg-slate-200 px-1 rounded">Ctrl+F</code> 查找
            </li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-gray-500">
        这个示例使用了 useKey 钩子，实现了常见的组合键快捷方式 (组件范围)
      </CardFooter>
    </Card>
  );
}

// 导出示例组件
export const Examples = [
  {
    title: "全局按键计数器", // 更新标题
    example: <KeyboardCounter />,
    code: `
function KeyboardCounter() {
  const [lastKey, setLastKey] = useState<string>("");
  const [keyCount, setKeyCount] = useState<Record<string, number>>({});

  // 处理按键事件的函数
  const handleKey = useCallback((event: KeyboardEvent) => {
    const key = event.key;
    setLastKey(key);

    // 更新按键计数
    setKeyCount((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));
  }, []);

  // 使用useKey钩子，全局监听
  useKey(
    () => true, // 监听所有按键
    handleKey,
    { event: 'keydown' } // 移除 target
  );

  return (
    <div>
      <h3>在页面任意位置按键</h3>
      <div>{lastKey || "等待按键..."}</div>

      <div>
        {Object.entries(keyCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([key, count]) => (
            <div key={key}>
              <div>{key}</div>
              <div>按下 {count} 次</div>
            </div>
          ))}
      </div>
    </div>
  );
}`,
  },
  {
    title: "快捷键管理器 (组件范围)", // 更新标题
    example: <ShortcutManager />,
    code: `
function ShortcutManager() {
  const [actions, setActions] = useState<string[]>([]);
  const elementRef = useRef<HTMLDivElement>(null);
  const [isTargetReady, setIsTargetReady] = useState(false);

  // 添加操作记录
  const addAction = useCallback((action: string) => {
    setActions((prev) => {
      const newActions = [action, ...prev.slice(0, 4)]; // 保留最近5条
      return newActions;
    });
  }, []);

  // 各种快捷键的处理函数
  const handleCopy = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
      addAction("复制文本"); // 移除 (全局)
    },
    [addAction]
  );

  const handlePaste = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
      addAction("粘贴文本"); // 移除 (全局)
    },
    [addAction]
  );

  const handleSave = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
      addAction("保存文档"); // 移除 (全局)
    },
    [addAction]
  );

  const handleFind = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
      addAction("查找内容"); // 移除 (全局)
    },
    [addAction]
  );

  // 挂载后标记 target 已准备好并聚焦
  useEffect(() => {
    if (elementRef.current) {
      setIsTargetReady(true);
      elementRef.current.focus();
    }
  }, []);

  // 根据状态确定 target
  const target = isTargetReady ? elementRef.current : null;

  // 复制 (Ctrl+C) - 组件范围
  useKey(
    (event) => event.key === "c" && event.ctrlKey,
    handleCopy,
    { event: 'keydown', target },
    [target, handleCopy]
  );

  // 粘贴 (Ctrl+V) - 组件范围
  useKey(
    (event) => event.key === "v" && event.ctrlKey,
    handlePaste,
    { event: 'keydown', target },
    [target, handlePaste]
  );

  // 保存 (Ctrl+S) - 组件范围
  useKey(
    (event) => event.key === "s" && event.ctrlKey,
    handleSave,
    { event: 'keydown', target },
    [target, handleSave]
  );

  // 查找 (Ctrl+F) - 组件范围
  useKey(
    (event) => event.key === "f" && event.ctrlKey,
    handleFind,
    { event: 'keydown', target },
    [target, handleFind]
  );

  return (
    <div
      ref={elementRef}
      tabIndex={0}
      className="focus:outline-none focus:ring-2 focus:ring-blue-500"
      onClick={() => elementRef.current?.focus()}
    >
      <h3>快捷键管理器 (点击此区域获得焦点)</h3> {/* 更新标题 */}

      <input placeholder="在此处输入文本，然后尝试常用快捷键..." />

      <div>
        <div>操作记录:</div>
        {actions.length > 0 ? (
          <ul>
            {actions.map((action, i) => (
              <li key={i}>{action}</li>
            ))}
          </ul>
        ) : (
          <div>尚无操作，请尝试快捷键</div>
        )}
      </div>

      <div>
        <p>可用快捷键 (点击组件获得焦点后生效):</p> {/* 更新提示 */}
        <ul>
          <li>Ctrl+C: 复制</li>
          <li>Ctrl+V: 粘贴</li>
          <li>Ctrl+S: 保存</li>
          <li>Ctrl+F: 查找</li>
        </ul>
      </div>
    </div>
  );
}`, // Corrected backtick
  },
];
