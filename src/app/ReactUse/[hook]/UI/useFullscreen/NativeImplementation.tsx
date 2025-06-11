// useFullscreen 钩子的原生实现示例
export const CODE_EXAMPLES = {
  // 使用 hooks 实现全屏显示
  hook: `import React, { useRef } from 'react';
import { useFullscreen } from 'react-use';

function FullscreenComponent() {
  // 创建一个引用，指向要全屏显示的元素
  const ref = useRef(null);
  
  // 使用 useFullscreen 钩子，返回是否全屏的状态和控制函数
  const [isFullscreen, toggleFullscreen] = useFullscreen(ref);
  
  return (
    <div>
      <div 
        ref={ref} 
        style={{
          backgroundColor: '#f3f4f6',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center'
        }}
      >
        <h3>这个元素可以全屏显示</h3>
        <p>当前状态: {isFullscreen ? '全屏' : '普通'}</p>
        <button onClick={toggleFullscreen}>
          {isFullscreen ? '退出全屏' : '进入全屏'}
        </button>
        {isFullscreen && (
          <p style={{ marginTop: '10px' }}>
            按ESC键也可以退出全屏
          </p>
        )}
      </div>
    </div>
  );
}`,

  // 自定义 useFullscreen 钩子的实现
  customHook: `import { useState, useRef, useLayoutEffect, RefObject } from 'react';

// 自定义的 useFullscreen 钩子
export const useCustomFullscreen = (elRef: RefObject<HTMLElement>) => {
  // 存储全屏状态
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // 存储退出全屏的原生方法
  const exitFullscreenRef = useRef<() => Promise<void>>(() => Promise.resolve());
  
  // 进入/退出全屏的方法
  const toggleFullscreen = async () => {
    if (!elRef.current) return;
    
    if (!isFullscreen) {
      try {
        // 尝试不同浏览器的全屏API
        const el = elRef.current;
        
        // 使用标准Fullscreen API
        if (el.requestFullscreen) {
          await el.requestFullscreen();
          exitFullscreenRef.current = () => document.exitFullscreen();
        // 兼容Safari
        } else if (el.webkitRequestFullscreen) {
          await el.webkitRequestFullscreen();
          exitFullscreenRef.current = () => document.webkitExitFullscreen();
        // 兼容Firefox
        } else if (el.mozRequestFullScreen) {
          await el.mozRequestFullScreen();
          exitFullscreenRef.current = () => document.mozCancelFullScreen();
        // 兼容IE/Edge
        } else if (el.msRequestFullscreen) {
          await el.msRequestFullscreen();
          exitFullscreenRef.current = () => document.msExitFullscreen();
        }
        
        setIsFullscreen(true);
      } catch (error) {
        console.error('进入全屏失败:', error);
      }
    } else {
      try {
        // 调用存储的退出全屏方法
        await exitFullscreenRef.current();
        setIsFullscreen(false);
      } catch (error) {
        console.error('退出全屏失败:', error);
      }
    }
  };
  
  // 监听全屏变化事件
  useLayoutEffect(() => {
    const handleFullscreenChange = () => {
      // 检查当前文档是否处于全屏状态
      const fullscreenElement = 
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;
      
      // 如果没有全屏元素或全屏元素不是目标元素，设置状态为false
      if (!fullscreenElement || (elRef.current && fullscreenElement !== elRef.current)) {
        setIsFullscreen(false);
      }
    };
    
    // 添加全屏变化事件监听器
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    
    // 清理函数
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [elRef]);
  
  // 返回状态和控制函数
  return [isFullscreen, toggleFullscreen] as const;
};`,
};
