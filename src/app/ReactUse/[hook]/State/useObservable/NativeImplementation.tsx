export const CODE_EXAMPLES = {
  // 原生实现代码
  customHooks: `import { useState, useEffect } from 'react';
import { Observable } from 'rxjs';

// 原生React实现的useObservable钩子 - 模仿react-use
function useObservable<T>(observable$: Observable<T>, initialValue: T): T {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    // 订阅Observable
    const subscription = observable$.subscribe(
      // 成功回调：更新状态值
      (newValue) => {
        setValue(newValue);
      },
      // 错误回调：记录错误
      (error) => {
        console.error('useObservable error:', error);
      }
    );

    // 清理函数：取消订阅
    return () => {
      subscription.unsubscribe();
    };
  }, [observable$]); // 当observable$变化时重新订阅

  return value;
}
`,
  // 库使用示例代码
  hooks: `import { useObservable } from 'react-use';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

const Demo = () => {
  // 创建一个每秒递增的计数器Observable
  const counter$ = interval(1000).pipe(
    map(count => count + 1)
  );
  
  // 使用useObservable订阅这个Observable，初始值为0
  const count = useObservable(counter$, 0);
  
  return (
    <div>
      <p>当前计数: {count}</p>
    </div>
  );
};
`,
};
