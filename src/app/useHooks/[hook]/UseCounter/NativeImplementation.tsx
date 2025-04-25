"use client";

import { useState, useCallback } from "react";
// 原生React实现的useCounter钩子
function MyUseCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  // 定义increment、decrement和reset函数
  // 使用useCallback包裹以避免不必要的重新渲染
  const increment = useCallback(() => setCount((x) => x + 1), []);
  const decrement = useCallback(() => setCount((x) => x - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  // 返回与usehooks-ts的useCounter相同的API
  return { count, increment, decrement, reset, setCount };
}
export const CODE_EXAMPLES = {
  // 原生实现代码
  MyHooks: `
// 原生React实现的useCounter钩子
function MyUseCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  // 定义increment、decrement和reset函数
  // 使用useCallback包裹以避免不必要的重新渲染
  const increment = useCallback(() => setCount(x => x + 1), []);
  const decrement = useCallback(() => setCount(x => x - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  // 返回与usehooks-ts的useCounter相同的API
  return { count, increment, decrement, reset, setCount };
}
`,
  // 库使用示例代码
  hooks: `
// 使用usehooks-ts库的useCounter
import { useCounter } from 'usehooks-ts';

function CounterComponent() {
  const { count, increment, decrement, reset, setCount } = useCounter(0);
  
  return (
    <div>
      <p>当前计数: {count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>重置</button>
      <button onClick={() => setCount(100)}>设为 100</button>
    </div>
  );
}
`,
};
