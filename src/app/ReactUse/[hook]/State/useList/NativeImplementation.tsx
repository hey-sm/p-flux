export const CODE_EXAMPLES = {
  // 原生实现代码
  customHooks: `import { useState, useCallback } from 'react';

// 原生React实现的useList钩子 - 模仿react-use
function useList<T>(initialList: T[] = []) {
  const [list, setList] = useState<T[]>(initialList);

  const actions = {
    set: useCallback((newList: T[]) => {
      setList(newList);
    }, []),

    push: useCallback((element: T) => {
      setList((prevList) => [...prevList, element]);
    }, []),

    removeAt: useCallback((index: number) => {
      setList((prevList) => {
        if (index < 0 || index >= prevList.length) return prevList;
        return [...prevList.slice(0, index), ...prevList.slice(index + 1)];
      });
    }, []),

    insertAt: useCallback((index: number, element: T) => {
      setList((prevList) => {
        const nextList = [...prevList];
        nextList.splice(index, 0, element);
        return nextList;
      });
    }, []),

    updateAt: useCallback((index: number, element: T) => {
      setList((prevList) => {
        if (index < 0 || index >= prevList.length) return prevList;
        const nextList = [...prevList];
        nextList[index] = element;
        return nextList;
      });
    }, []),

    clear: useCallback(() => {
      setList([]);
    }, []),
  };

  return [list, actions];
}
`,
  // 库使用示例代码
  hooks: `import { useList } from 'react-use';

const Demo = () => {
  const [list, { push, removeAt, clear }] = useList([
    'React',
    'Vue',
    'Angular'
  ]);

  return (
    <div>
      <div>
        <button onClick={() => push('Svelte')}>添加框架</button>
        <button onClick={() => removeAt(0)}>移除第一项</button>
        <button onClick={clear}>清空列表</button>
      </div>
      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => removeAt(index)}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
`,
};
