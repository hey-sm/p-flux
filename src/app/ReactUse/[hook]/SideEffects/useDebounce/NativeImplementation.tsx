// useDebounce 钩子的原生实现示例
export const CODE_EXAMPLES = {
  // 使用 hooks 实现防抖功能
  hook: `import React, { useState } from 'react';
import { useDebounce } from 'react-use';

function SearchComponent() {
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  
  // 使用 useDebounce 钩子，当输入停止 500ms 后执行回调
  useDebounce(
    () => {
      setDebouncedValue(inputValue);
      console.log('执行搜索查询:', inputValue);
    },
    500, // 防抖延迟时间 (ms)
    [inputValue] // 依赖项
  );

  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="输入搜索关键词..."
      />
      <p>当前输入值: {inputValue}</p>
      <p>防抖后的值 (500ms): {debouncedValue}</p>
    </div>
  );
}`,

  // 自定义 useDebounce 钩子的实现
  customHook: `import { useEffect, useRef } from 'react';

// 自定义 useDebounce 钩子
export const useCustomDebounce = (fn, ms = 0, deps = []) => {
  const timerRef = useRef(null);
  
  // 清除定时器的函数
  const clear = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // 每当依赖项变化时重新设置定时器
  useEffect(() => {
    // 清除旧的定时器
    clear();
    
    // 设置新的定时器
    timerRef.current = setTimeout(() => {
      fn();
    }, ms);
    
    // 组件卸载或依赖项变化时清除定时器
    return clear;
  }, deps);

  // 返回清除定时器的函数，允许手动取消
  return clear;
};
`,
};
