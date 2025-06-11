// useAsync 钩子的原生实现示例
export const CODE_EXAMPLES = {
  // 使用 hooks 实现异步操作管理
  hook: `import React from 'react';
import { useAsync } from 'react-use';

function AsyncComponent() {
  const state = useAsync(async () => {
    // 模拟 API 请求
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: '请求成功获取的数据' };
  }, []);

  return (
    <div className="p-4 border rounded">
      {state.loading && <p>加载中...</p>}
      {state.error && <p>错误: {state.error.message}</p>}
      {state.value && <p>结果: {state.value.data}</p>}
    </div>
  );
}`,

  // 自定义 useAsync 钩子的实现
  customHook: `import { useState, useEffect, useCallback } from 'react';

// 自定义 useAsync 钩子
export const useCustomAsync = (asyncFunction, deps = []) => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    value: null
  });

  const callback = useCallback(() => {
    setState({ loading: true, error: null, value: null });
    
    asyncFunction()
      .then(value => setState({ loading: false, error: null, value }))
      .catch(error => setState({ loading: false, error, value: null }));
  }, deps);

  useEffect(() => {
    callback();
  }, [callback]);

  return state;
};`,
};
