"use client";

// useScratch 钩子的原生实现示例
export const CODE_EXAMPLES = {
  // 使用 hooks 实现刮擦动作检测
  hook: `import { useRef, useState, useCallback, useEffect } from 'react';
import { useScratch } from 'react-use';

function ScratchExample() {
  const [state, setState] = useState({ x: 0, y: 0, dx: 0, dy: 0, down: false });
  const ref = useRef(null);

  // 使用 useScratch 来检测刮擦/拖拽动作
  useScratch(ref, {
    onScratch: (state) => setState(state),
  });

  return (
    <div>
      <div
        ref={ref}
        style={{
          width: '300px',
          height: '200px',
          border: '1px solid #ccc',
          position: 'relative',
          userSelect: 'none',
        }}
      >
        <div>拖动此区域</div>
        {state.down && (
          <div
            style={{
              position: 'absolute',
              left: state.x,
              top: state.y,
              width: '5px',
              height: '5px',
              background: 'red',
              borderRadius: '50%',
            }}
          />
        )}
      </div>

      <pre>
        {JSON.stringify(state, null, 2)}
      </pre>
    </div>
  );
}`,

  // 自定义 useScratch 钩子的实现
  customHook: `import { useEffect, useRef, useState } from 'react';

// 自定义useScratch钩子
export const useCustomScratch = (options = {}) => {
  const [state, setState] = useState({
    x: 0, y: 0,     // 当前位置
    dx: 0, dy: 0,   // 移动距离
    down: false     // 按下状态
  });
  
  const ref = useRef(null);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    // 开始拖动/触摸
    const handleMouseDown = (e) => {
      const { clientX, clientY } = e.touches ? e.touches[0] : e;
      const rect = el.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      setState({
        x, y, dx: 0, dy: 0, down: true
      });
    };
    
    // 拖动/触摸移动
    const handleMouseMove = (e) => {
      if (!state.down) return;
      
      const { clientX, clientY } = e.touches ? e.touches[0] : e;
      const rect = el.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      setState(prev => ({
        x, y,
        dx: x - prev.x,
        dy: y - prev.y,
        down: true
      }));
      
      // 调用用户提供的回调
      if (options.onScratch) {
        options.onScratch(state);
      }
    };
    
    // 结束拖动/触摸
    const handleMouseUp = () => {
      setState(prev => ({ ...prev, down: false }));
    };
    
    // 添加事件监听器
    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('touchstart', handleMouseDown);
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleMouseMove);
    
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    
    // 清理函数
    return () => {
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('touchstart', handleMouseDown);
      
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
      
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [state.down, options]);
  
  return [ref, state];
};

// 使用示例
function ScratchExample() {
  const [ref, state] = useCustomScratch({
    onScratch: (state) => console.log('Scratch state', state)
  });
  
  return (
    <div>
      <div
        ref={ref}
        style={{
          width: '300px',
          height: '200px',
          border: '1px solid #ccc',
        }}
      >
        <div>拖动此区域</div>
      </div>
      
      <pre>
        {JSON.stringify(state, null, 2)}
      </pre>
    </div>
  );
}`,
};
