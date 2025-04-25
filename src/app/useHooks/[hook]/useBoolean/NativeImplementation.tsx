"use client";

import { useState, useCallback } from "react";

// =====================================
// 钩子的原生实现
// =====================================
export function MyUseBoolean(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((v) => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return { value, toggle, setTrue, setFalse, setValue };
}

// =====================================
// 代码示例字符串
// =====================================
export const CODE_EXAMPLES = {
  // 原生实现代码
  MyHooks: `
// 原生React实现的useBoolean钩子
function MyUseBoolean(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  // 定义toggle、setTrue和setFalse函数
  // 使用useCallback包裹以避免不必要的重新渲染
  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  // 返回与usehooks-ts的useBoolean相同的API
  return { value, toggle, setTrue, setFalse, setValue };
}
`,
  // 库使用示例代码
  hooks: `
// 使用usehooks-ts库的useBoolean
import { useBoolean } from 'usehooks-ts';

function MyComponent() {
  const { value, toggle, setTrue, setFalse } = useBoolean(false);
  
  return (
    <div>
      <p>当前状态: {String(value)}</p>
      <button onClick={toggle}>切换状态</button>
      <button onClick={setTrue} disabled={value}>设为 true</button>
      <button onClick={setFalse} disabled={!value}>设为 false</button>
    </div>
  );
}
`,
};
