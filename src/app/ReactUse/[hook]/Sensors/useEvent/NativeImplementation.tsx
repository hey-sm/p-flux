"use client";
import React, { useState, useEffect, useRef } from "react";

/**
 * @description 自定义 useEvent Hook 实现
 * @param name 事件名称
 * @param handler 事件处理函数
 * @param target 目标元素，默认为window
 * @param options 事件选项
 */
export function useEventImpl(
  name: string,
  handler: (event: Event) => void,
  target: EventTarget | null = window,
  options?: boolean | AddEventListenerOptions
) {
  // 使用ref存储最新的handler，避免闭包问题
  const handlerRef = useRef(handler);

  // 当handler变化时更新ref
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    // 如果没有目标元素，则不添加事件监听
    if (!target) return;

    // 创建事件处理器，调用ref中存储的最新handler
    const eventListener = (event: Event) => handlerRef.current(event);

    // 添加事件监听器
    target.addEventListener(name, eventListener, options);

    // 清理函数：移除事件监听器
    return () => {
      target.removeEventListener(name, eventListener, options);
    };
  }, [name, target, options]);
}

export const CODE_EXAMPLES = {
  // 传统方式实现事件监听的代码
  traditional: `import React, { useEffect, useState } from 'react';

const ScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // 处理滚动事件
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // 添加事件监听
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 清理函数：移除事件监听
    return () => {
      window.removeEventListener('scroll', handleScroll, { passive: true });
    };
  }, []); // 空依赖数组表示只在挂载和卸载时执行

  return (
    <div>
      <p>当前滚动位置：{scrollY}px</p>
    </div>
  );
};`,

  // 使用useEvent钩子的代码
  hook: `import React, { useState } from 'react';
import { useEvent } from 'react-use';

const ScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);

  // 使用useEvent钩子监听滚动事件
  useEvent(
    'scroll',
    () => {
      setScrollY(window.scrollY);
    },
    window,
    { passive: true }
  );

  return (
    <div>
      <p>当前滚动位置：{scrollY}px</p>
    </div>
  );
};`,
};
