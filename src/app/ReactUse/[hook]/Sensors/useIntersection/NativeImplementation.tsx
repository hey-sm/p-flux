"use client";

// useIntersection 钩子的实现示例
export const CODE_EXAMPLES = {
  // 使用 hooks 实现元素交叉检测
  hook: `import React, { useRef } from 'react';
import { useIntersection } from 'react-use';

function IntersectionExample() {
  const ref = useRef(null);
  const intersection = useIntersection(ref, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  });
  
  return (
    <div>
      <div
        ref={ref}
        style={{
          border: '1px solid #ccc',
          padding: '20px',
          background: intersection && intersection.isIntersecting 
            ? '#e6ffe6' : '#fff'
        }}
      >
        <p>
          {intersection && intersection.isIntersecting 
            ? '元素在视图中!' 
            : '元素不在视图中'}
        </p>
        {intersection && (
          <p>交叉比例: {Math.round(intersection.intersectionRatio * 100)}%</p>
        )}
      </div>
    </div>
  );
}`,

  // 自定义 useIntersection 钩子的实现
  customHook: `import { useState, useEffect, useRef } from 'react';

// 自定义useIntersection钩子
export const useCustomIntersection = (options = {}) => {
  const [entry, setEntry] = useState(null);
  const elementRef = useRef(null);
  const observer = useRef(null);

  const { root = null, rootMargin = '0px', threshold = 0 } = options;

  useEffect(() => {
    // 如果已经有observer实例，先断开连接
    if (observer.current) {
      observer.current.disconnect();
    }

    // 创建新的IntersectionObserver实例
    observer.current = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
      },
      { root, rootMargin, threshold }
    );

    // 获取当前元素引用
    const element = elementRef.current;

    // 如果元素存在，开始观察
    if (element) {
      observer.current.observe(element);
    }

    // 清理函数
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [root, rootMargin, threshold]);

  return [elementRef, entry];
};

// 使用示例
function IntersectionExample() {
  const [ref, entry] = useCustomIntersection({
    threshold: 0.5
  });
  
  const isIntersecting = entry?.isIntersecting;

  return (
    <div>
      <div
        ref={ref}
        style={{
          border: '1px solid #ccc',
          padding: '20px',
          background: isIntersecting ? '#e6ffe6' : '#fff'
        }}
      >
        <p>
          {isIntersecting 
            ? '元素在视图中!' 
            : '元素不在视图中'}
        </p>
        {entry && (
          <p>交叉比例: {Math.round(entry.intersectionRatio * 100)}%</p>
        )}
      </div>
    </div>
  );
}`,
};
