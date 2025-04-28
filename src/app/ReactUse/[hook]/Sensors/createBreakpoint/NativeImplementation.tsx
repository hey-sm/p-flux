"use client";

import { useState, useEffect } from "react";

// 定义断点类型
type Breakpoints<T> = Record<T extends string ? T : string, number>;
type BreakpointReturn<T> = T extends string ? T : string;

// =====================================
// 钩子的原生实现 - 模仿react-use的createBreakpoint
// =====================================

// createBreakpoint的原生实现
function createBreakpoint<T extends string>(breakpoints: Breakpoints<T>) {
  const useBreakpointHook = (): BreakpointReturn<T> => {
    const [screen, setScreen] = useState<T | string>("");

    useEffect(() => {
      // 获取当前窗口宽度对应的断点
      const getBreakpoint = () => {
        const width = window.innerWidth;
        // 类型安全的转换
        const entries: Array<[string, number]> = Object.entries(
          breakpoints
        ) as Array<[string, number]>;
        const breakpointEntries = entries.sort((a, b) => a[1] - b[1]);

        // 从大到小匹配断点
        for (let i = breakpointEntries.length - 1; i >= 0; i--) {
          const [name, minWidth] = breakpointEntries[i];
          if (width >= minWidth) {
            return name;
          }
        }

        // 如果没有匹配的断点，返回第一个断点
        return breakpointEntries.length > 0 ? breakpointEntries[0][0] : "";
      };

      // 设置初始断点
      setScreen(getBreakpoint());

      // 监听窗口大小变化
      const handleResize = () => {
        setScreen(getBreakpoint());
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return screen as BreakpointReturn<T>;
  };

  return useBreakpointHook;
}

// 标准的useBreakpoint钩子，使用createBreakpoint直接创建
const useBreakpoint = createBreakpoint({
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
});

// 导出createBreakpoint和useBreakpoint
export { createBreakpoint, useBreakpoint };

// =====================================
// 代码示例
// =====================================
export const CODE_EXAMPLES = {
  // 原生实现代码
  MyHooks: `
// 原生实现createBreakpoint钩子
import { useState, useEffect } from 'react';

// 定义断点类型
type Breakpoints<T> = Record<T extends string ? T : string, number>;
type BreakpointReturn<T> = T extends string ? T : string;

// createBreakpoint的实现
export function createBreakpoint<T extends string>(breakpoints: Breakpoints<T>) {
  const useBreakpointHook = (): BreakpointReturn<T> => {
    const [screen, setScreen] = useState<T | string>("");

    useEffect(() => {
      // 获取当前窗口宽度对应的断点
      const getBreakpoint = () => {
        const width = window.innerWidth;
        // 类型安全的转换
        const entries: Array<[string, number]> = Object.entries(breakpoints) as Array<[string, number]>;
        const breakpointEntries = entries.sort(
          (a, b) => a[1] - b[1]
        );

        // 从大到小匹配断点
        for (let i = breakpointEntries.length - 1; i >= 0; i--) {
          const [name, minWidth] = breakpointEntries[i];
          if (width >= minWidth) {
            return name;
          }
        }

        // 如果没有匹配的断点，返回第一个断点
        return breakpointEntries.length > 0 ? breakpointEntries[0][0] : "";
      };

      // 设置初始断点
      setScreen(getBreakpoint());

      // 监听窗口大小变化
      const handleResize = () => {
        setScreen(getBreakpoint());
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return screen as BreakpointReturn<T>;
  };

  return useBreakpointHook;
}

// 创建一个预设断点的hook
export const useBreakpoint = createBreakpoint({
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
});`,

  // 库使用示例代码
  hooks: `
// 使用react-use库的createBreakpoint
import { createBreakpoint } from 'react-use';

// 创建自定义的useBreakpoint hook，指定断点名称和像素值
const useBreakpoint = createBreakpoint({
  xs: 0,    // 特小屏幕
  sm: 576,  // 小屏幕，如手机横向
  md: 768,  // 中等屏幕，如平板
  lg: 992,  // 大屏幕，如笔记本
  xl: 1200, // 超大屏幕，如桌面显示器
  xxl: 1600 // 巨大屏幕，如大型显示器
});

function ResponsiveComponent() {
  // 获取当前断点
  const breakpoint = useBreakpoint();
  
  // 根据断点渲染不同的UI
  return (
    <div>
      <h1>当前断点: {breakpoint}</h1>
      {breakpoint === 'xs' && <p>显示手机竖屏布局</p>}
      {breakpoint === 'sm' && <p>显示手机横屏布局</p>}
      {breakpoint === 'md' && <p>显示平板布局</p>}
      {(breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === 'xxl') && (
        <p>显示桌面布局</p>
      )}
    </div>
  );
}`,
};
