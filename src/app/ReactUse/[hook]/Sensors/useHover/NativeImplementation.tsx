// useHover 钩子的原生实现示例
export const CODE_EXAMPLES = {
  // 使用 hooks 实现悬停检测
  hook: `import React from 'react';
import { useHover } from 'react-use';

function HoverComponent() {
  const element = (hovered) => (
    <div 
      className={\`p-4 border rounded \${hovered ? 'bg-blue-100' : 'bg-white'}\`}
    >
      {hovered ? '鼠标悬停中!' : '将鼠标悬停在此区域'}
    </div>
  );

  const [hoverable] = useHover(element);

  return hoverable;
}`,

  // 自定义 useHover 钩子的实现
  customHook: `import { useState, useCallback, useRef, useEffect } from 'react';

// 自定义useHover钩子
export const useCustomHover = () => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseEnter, handleMouseLeave]);

  return [ref, isHovered];
};

// 使用示例
function HoverComponent() {
  const [ref, isHovered] = useCustomHover();

  return (
    <div 
      ref={ref}
      className={\`p-4 border rounded \${isHovered ? 'bg-blue-100' : 'bg-white'}\`}
    >
      {isHovered ? '鼠标悬停中!' : '将鼠标悬停在此区域'}
    </div>
  );
}`,
};
