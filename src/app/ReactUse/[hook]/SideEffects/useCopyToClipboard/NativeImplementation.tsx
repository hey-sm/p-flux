// useCopyToClipboard 钩子的原生实现示例
export const CODE_EXAMPLES = {
  // 使用 hooks 实现剪贴板操作
  hook: `import React, { useState } from 'react';
import { useCopyToClipboard } from 'react-use';

function CopyButton() {
  const [text, setText] = useState('');
  const [state, copyToClipboard] = useCopyToClipboard();
  
  const handleCopy = () => {
    copyToClipboard(text);
  };

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="输入要复制的文本"
      />
      <button onClick={handleCopy}>复制到剪贴板</button>
      
      {state.error ? (
        <p>复制失败: {state.error.message}</p>
      ) : state.value ? (
        <p>已复制: {state.value}</p>
      ) : null}
    </div>
  );
}`,

  // 自定义 useCopyToClipboard 钩子的实现
  customHook: `import { useState, useCallback } from 'react';

// 自定义 useCopyToClipboard 钩子
export const useCustomCopyToClipboard = () => {
  const [state, setState] = useState({
    value: null,
    error: null,
    isPending: false,
  });

  const copy = useCallback(async (text) => {
    // 复制前重置状态
    setState({
      value: null,
      error: null,
      isPending: true,
    });

    try {
      // 使用 Clipboard API 复制文本
      await navigator.clipboard.writeText(text);
      
      // 复制成功
      setState({
        value: text,
        error: null,
        isPending: false,
      });
      
      return true;
    } catch (error) {
      // 复制失败
      setState({
        value: null,
        error,
        isPending: false,
      });
      
      return false;
    }
  }, []);

  return [state, copy];
};
`,
};
