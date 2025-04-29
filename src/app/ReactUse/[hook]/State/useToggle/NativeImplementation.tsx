export const CODE_EXAMPLES = {
  // 原生实现代码
  customHooks: `
// 原生React实现的useToggle钩子 - 模仿react-use
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  // 定义toggle、setTrue和setFalse函数
  // 使用useCallback包裹以避免不必要的重新渲染
  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  // 返回react-use的useToggle相同的API
  return { value, toggle, setTrue, setFalse };
}
`,
  // 库使用示例代码
  hooks: `import {useToggle} from 'react-use';

const Demo = () => {
  const [on, toggle] = useToggle(true);

  return (
    <div>
      <div>{on ? 'ON' : 'OFF'}</div>
      <button onClick={toggle}>Toggle</button>
      <button onClick={() => toggle(true)}>set ON</button>
      <button onClick={() => toggle(false)}>set OFF</button>
    </div>
  );
};
`,
};
