// useCookie 钩子的原生实现示例
export const CODE_EXAMPLES = {
  // 使用 hooks 实现 Cookie 操作
  hook: `import React, { useState } from 'react';
import { useCookie } from 'react-use';

function CookieManager() {
  // 使用 useCookie 钩子获取和设置 cookie
  const [themeCookie, updateThemeCookie, deleteThemeCookie] = useCookie('theme');
  
  // 更新主题
  const setLightTheme = () => updateThemeCookie('light');
  const setDarkTheme = () => updateThemeCookie('dark');
  
  // 删除主题 cookie
  const resetTheme = () => deleteThemeCookie();

  return (
    <div>
      <p>当前主题: {themeCookie || '未设置'}</p>
      <button onClick={setLightTheme}>设置为浅色主题</button>
      <button onClick={setDarkTheme}>设置为深色主题</button>
      <button onClick={resetTheme}>重置主题</button>
    </div>
  );
}`,

  // 自定义 useCookie 钩子的实现
  customHook: `import { useState, useCallback, useEffect } from 'react';

// 解析 cookie 字符串
const parseCookies = () => {
  const cookies = {};
  document.cookie.split(';').forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    if (name) cookies[name] = decodeURIComponent(value);
  });
  return cookies;
};

// 自定义 useCookie 钩子
export const useCustomCookie = (cookieName) => {
  // 初始化 cookie 值
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return null;
    const cookies = parseCookies();
    return cookies[cookieName] || null;
  });

  // 更新 cookie
  const updateCookie = useCallback((newValue, options = {}) => {
    const { days = 7, path = '/' } = options;
    
    // 设置过期日期
    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + days);
    
    // 构建 cookie 字符串
    const cookieValue = \`\${cookieName}=\${encodeURIComponent(newValue)};expires=\${expiresDate.toUTCString()};path=\${path}\`;
    
    // 设置 cookie
    document.cookie = cookieValue;
    setValue(newValue);
  }, [cookieName]);

  // 删除 cookie
  const deleteCookie = useCallback(() => {
    document.cookie = \`\${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/\`;
    setValue(null);
  }, [cookieName]);

  // 当组件挂载时，确保值是最新的
  useEffect(() => {
    const cookies = parseCookies();
    setValue(cookies[cookieName] || null);
  }, [cookieName]);

  return [value, updateCookie, deleteCookie];
};

// 使用示例
function CookieManager() {
  const [theme, setTheme, deleteTheme] = useCustomCookie('theme');
  
  return (
    <div>
      <p>当前主题: {theme || '未设置'}</p>
      <button onClick={() => setTheme('light')}>浅色主题</button>
      <button onClick={() => setTheme('dark')}>深色主题</button>
      <button onClick={deleteTheme}>重置主题</button>
    </div>
  );
}`,
};
