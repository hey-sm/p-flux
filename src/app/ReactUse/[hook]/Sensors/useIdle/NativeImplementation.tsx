"use client";

// useIdle 钩子的原生实现示例
export const CODE_EXAMPLES = {
  // 使用 hooks 实现空闲状态检测
  hook: `import React from 'react';
import { useIdle } from 'react-use';

function IdleDetection() {
  // 设置3秒空闲时间阈值
  const isIdle = useIdle(3000);
  
  return (
    <div>
      <p>用户当前状态: {isIdle ? '空闲' : '活动中'}</p>
    </div>
  );
}`,

  // 自定义 useIdle 钩子的实现
  customHook: `import { useState, useEffect } from 'react';

// 自定义useIdle钩子
export const useCustomIdle = (ms = 3000, initialState = false) => {
  const [idle, setIdle] = useState(initialState);
  
  useEffect(() => {
    let idleTimer;
    
    // 重置计时器的函数
    const handleUserActivity = () => {
      setIdle(false);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setIdle(true), ms);
    };
    
    // 要监听的事件
    const events = [
      'mousemove',
      'keydown',
      'mousedown',
      'touchstart',
      'scroll'
    ];
    
    // 添加事件监听器
    events.forEach(event => 
      window.addEventListener(event, handleUserActivity)
    );
    
    // 初始设置计时器
    idleTimer = setTimeout(() => setIdle(true), ms);
    
    // 清理函数
    return () => {
      clearTimeout(idleTimer);
      events.forEach(event => 
        window.removeEventListener(event, handleUserActivity)
      );
    };
  }, [ms]);
  
  return idle;
};

// 使用示例
function IdleDetection() {
  const isIdle = useCustomIdle(3000);
  
  return (
    <div>
      <p>用户当前状态: {isIdle ? '空闲' : '活动中'}</p>
    </div>
  );
}`,
};
