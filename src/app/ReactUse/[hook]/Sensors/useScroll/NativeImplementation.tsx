"use client";

// useScroll 钩子的原生实现示例
export const CODE_EXAMPLES = {
  // 使用 hooks 实现滚动监听
  hook: `import {useScroll} from 'react-use';

const Demo = () => {
  const scrollRef = React.useRef(null);
  const {x, y} = useScroll(scrollRef);

  return (
    <div ref={scrollRef}>
      <div>x: {x}</div>
      <div>y: {y}</div>
    </div>
  );
};`,

  // 自定义 useScroll 钩子的实现
  customHook: `import { useState, useEffect, RefObject } from 'react';

// 自定义 useScroll 钩子
export const useScroll = (elementRef: RefObject<HTMLElement>) => {
  // 初始化滚动位置状态
  const [scrollPosition, setScrollPosition] = useState({
    x: 0,
    y: 0
  });

  useEffect(() => {
    // 获取需要监听的元素
    const element = elementRef.current;
    if (!element) return;

    // 处理滚动事件的函数
    const handleScroll = () => {
      setScrollPosition({
        x: element.scrollLeft,
        y: element.scrollTop
      });
    };

    // 初始化滚动位置
    setScrollPosition({
      x: element.scrollLeft,
      y: element.scrollTop
    });

    // 添加滚动事件监听器 (使用passive: true以提高性能)
    element.addEventListener('scroll', handleScroll, { passive: true });

    // 清理函数
    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, [elementRef]); // 依赖于传入的元素引用

  return scrollPosition;
};
`,
};
