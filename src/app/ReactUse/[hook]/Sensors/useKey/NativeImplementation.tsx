// 原生实现代码示例部分也需要更新
export const CODE_EXAMPLES = {
  // 原生实现代码
  MyHooks: `
// 原生React实现的useKey钩子 - 模仿react-use
function useKey(
  key: string | ((event: KeyboardEvent) => boolean),
  handler: (event: KeyboardEvent) => void,
  options: {
    event?: 'keydown' | 'keyup' | 'keypress';
    target?: 'window' | 'document' | RefObject<HTMLElement> | null;
    when?: boolean;
  } = {}
) {
  const { event = 'keydown', target = 'document', when = true } = options;
  
  useEffect(() => {
    if (!when) return;
    
    // 键盘事件判断函数
    const predicate = typeof key === 'function'
      ? key
      : (event: KeyboardEvent) => event.key === key;
    
    // 事件处理函数
    const listener = (event: KeyboardEvent) => {
      if (predicate(event)) {
        handler(event);
      }
    };
    
    // 确定事件目标
    let targetElement: HTMLElement | Document | Window;
    
    // 如果target是一个ref对象
    if (target && typeof target !== 'string' && 'current' in target && target.current) {
      targetElement = target.current;
    } else if (target === "window") {
      targetElement = window;
    } else {
      targetElement = document;
    }
    
    // 添加事件监听
    targetElement.addEventListener(event, listener);
    
    // 清理函数
    return () => {
      targetElement.removeEventListener(event, listener);
    };
  }, [key, event, target, handler, when]);
}
`,
  // 库使用示例代码
  hooks: `
// 使用react-use库的useKey - 限定在特定元素内生效
import { useKey } from 'react-use';
import { useRef } from 'react';

function KeyboardShortcuts() {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  
  // 注意: react-use的useKey接收一个DOM元素而不是RefObject
  useEffect(() => {
    // 确保元素已经存在
    if (elementRef.current) {
      // 按空格键增加计数 - 只在元素获得焦点时有效
      useKey(' ', () => {
        setCount(count + 1);
      }, { target: elementRef.current });
    }
  }, [elementRef.current, count]);
  
  return (
    <div ref={elementRef} tabIndex={0} style={{ padding: '20px', border: '1px solid #ccc' }}>
      <p>计数: {count}</p>
      <p>按空格键增加计数，按ESC重置 (点击此区域并获得焦点后有效)</p>
    </div>
  );
}
`,
};
