"use client";
import { useState, useEffect } from "react";

/**
 * @description 自定义 createBreakpoint Hook 工厂
 * @param breakpoints - 断点配置，可以是对象或数组
 * @returns useBreakpoint Hook
 */
export function createBreakpoint<T extends string | number>(
  breakpoints: Record<T, number> | number[]
) {
  // 规范化断点数组
  const entries: [T, number][] = Array.isArray(breakpoints)
    ? (breakpoints.map((value, index) => [index as T, value]) as [T, number][])
    : (Object.entries(breakpoints) as [T, number][]);

  // 按最小宽度升序排列
  entries.sort((a, b) => a[1] - b[1]);

  // 返回一个 Hook
  return function useBreakpoint(): T {
    // 初始断点
    const getCurrentBreakpoint = (): T => {
      if (typeof window === "undefined") {
        // SSR 默认返回第一个
        return entries[0][0];
      }

      const width = window.innerWidth;
      let matched: T = entries[0][0];

      for (const [key, minWidth] of entries) {
        if (width >= minWidth) {
          matched = key;
        } else {
          break;
        }
      }

      return matched;
    };

    const [breakpoint, setBreakpoint] = useState<T>(getCurrentBreakpoint);

    useEffect(() => {
      let animationFrame: number;

      const onResize = () => {
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(() => {
          setBreakpoint(getCurrentBreakpoint());
        });
      };

      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(animationFrame);
      };
    }, []);

    return breakpoint;
  };
}

export const CODE_EXAMPLES = {
  // 原生实现代码
  MyHooks: `import { useState, useEffect } from 'react';

/**
 * @description 自定义 createBreakpoint Hook 工厂
 * @param breakpoints - 断点配置，可以是对象或数组
 * @returns useBreakpoint Hook
 */
export function createBreakpoint<T extends string | number>(
  breakpoints: Record<T, number> | number[]
) {
  // 规范化断点数组
  const entries: [T, number][] = Array.isArray(breakpoints)
    ? (breakpoints.map((value, index) => [index as T, value]) as [T, number][])
    : (Object.entries(breakpoints) as [T, number][]);

  // 按最小宽度升序排列
  entries.sort((a, b) => a[1] - b[1]);

  // 返回一个 Hook
  return function useBreakpoint(): T {
    // 初始断点
    const getCurrentBreakpoint = (): T => {
      if (typeof window === 'undefined') {
        // SSR 默认返回第一个
        return entries[0][0];
      }

      const width = window.innerWidth;
      let matched: T = entries[0][0];

      for (const [key, minWidth] of entries) {
        if (width >= minWidth) {
          matched = key;
        } else {
          break;
        }
      }

      return matched;
    };

    const [breakpoint, setBreakpoint] = useState<T>(getCurrentBreakpoint);

    useEffect(() => {
      let animationFrame: number;

      const onResize = () => {
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(() => {
          setBreakpoint(getCurrentBreakpoint());
        });
      };

      window.addEventListener('resize', onResize);

      return () => {
        window.removeEventListener('resize', onResize);
        cancelAnimationFrame(animationFrame);
      };
    }, []);

    return breakpoint;
  };
}
`,

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
