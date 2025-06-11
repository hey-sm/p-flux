// useBeforeUnload 钩子的原生实现示例
export const CODE_EXAMPLES = {
  // 使用 hooks 实现页面离开提示
  hook: `import React, { useState } from 'react';
import { useBeforeUnload } from 'react-use';

function FormComponent() {
  const [isDirty, setIsDirty] = useState(false);
  const [text, setText] = useState('');
  
  // 当表单被修改时，设置 isDirty 为 true
  const handleChange = (e) => {
    setText(e.target.value);
    setIsDirty(true);
  };
  
  // 只有当表单被修改且未保存时，才提示用户
  useBeforeUnload(isDirty, '您有未保存的更改，确定要离开吗？');
  
  // 模拟表单提交，清除脏状态
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('表单已保存:', text);
    setIsDirty(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={handleChange}
        placeholder="输入些内容试试..."
      />
      <button type="submit">保存</button>
      {isDirty && <p>您有未保存的更改</p>}
    </form>
  );
}`,

  // 自定义 useBeforeUnload 钩子的实现
  customHook: `import { useEffect } from 'react';

// 自定义 useBeforeUnload 钩子
export const useCustomBeforeUnload = (when, message) => {
  useEffect(() => {
    // 如果 when 为 false，不添加事件监听器
    if (!when) return;

    // 处理 beforeunload 事件
    const handleBeforeUnload = (event) => {
      // 获取消息文本（可以是字符串或函数）
      const finalMessage = 
        typeof message === 'function' ? message() : message;
      
      // 设置提示消息 (注意: 现代浏览器可能忽略自定义消息)
      event.preventDefault();
      if (finalMessage) {
        event.returnValue = finalMessage;
      }
      return finalMessage;
    };

    // 添加事件监听器
    window.addEventListener('beforeunload', handleBeforeUnload);

    // 清理函数
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [when, message]); // 依赖项数组
};
`,
};
