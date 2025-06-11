// useClickAway 钩子的原生实现示例
export const CODE_EXAMPLES = {
  // 使用 hooks 实现点击外部区域检测
  hook: `import React, { useState } from 'react';
import { useClickAway } from 'react-use';

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = React.useRef(null);
  
  // 当点击 ref 引用的元素外部时，关闭下拉菜单
  useClickAway(ref, () => {
    if (isOpen) setIsOpen(false);
  });
  
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>打开菜单</button>
      
      {isOpen && (
        <div 
          ref={ref}
          style={{
            position: 'absolute',
            padding: '1rem',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}
        >
          <div>选项 1</div>
          <div>选项 2</div>
          <div>选项 3</div>
        </div>
      )}
    </div>
  );
}`,

  // 自定义 useClickAway 钩子的实现
  customHook: `import { useEffect, RefObject } from 'react';

// 自定义的 useClickAway 钩子
export const useCustomClickAway = (
  ref: RefObject<HTMLElement>,
  onClickAway: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    // 处理点击事件
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickAway(event);
      }
    };
    
    // 处理触摸事件
    const handleTouch = (event: TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickAway(event);
      }
    };

    // 添加事件监听器
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleTouch);
    
    // 清理函数
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleTouch);
    };
  }, [ref, onClickAway]);
};
`,
};
