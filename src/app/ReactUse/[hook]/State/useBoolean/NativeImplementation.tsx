"use client";

import { useCallback, useState } from "react";

// =====================================
// 钩子的原生实现 - 模仿react-use的useBoolean
// =====================================
export function MyUseBoolean(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((v) => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return { value, toggle, setTrue, setFalse };
}

// =====================================
// 代码示例字符串
// =====================================
export const CODE_EXAMPLES = {
  // 原生实现代码
  MyHooks: `
// 原生React实现的useBoolean钩子 - 模仿react-use
function useBoolean(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  // 定义toggle、setTrue和setFalse函数
  // 使用useCallback包裹以避免不必要的重新渲染
  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  // 返回react-use的useBoolean相同的API
  return { value, toggle, setTrue, setFalse };
}
`,
  // 库使用示例代码
  hooks: `
// 使用react-use库的useBoolean
import { useBoolean } from 'react-use';

function MyComponent() {
  const [value, {toggle, on, off}] = useBoolean(false);
  
  return (
    <div>
      <p>当前状态: {String(value)}</p>
      <button onClick={toggle}>切换状态</button>
      <button onClick={on} disabled={value}>设为 true</button>
      <button onClick={off} disabled={!value}>设为 false</button>
    </div>
  );
}
`,
};
