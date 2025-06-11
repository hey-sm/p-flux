export const CODE_EXAMPLES = {
  // 原生实现代码
  MyHooks: `
// 原生React实现的useCounter钩子
function MyUseCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  // 定义increment、decrement和reset函数
  // 使用useCallback包裹以避免不必要的重新渲染
  const increment = useCallback(() => setCount(x => x + 1), []);
  const decrement = useCallback(() => setCount(x => x - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  // 返回与usehooks-ts的useCounter相同的API
  return { count, increment, decrement, reset, setCount };
}
`,
  // 库使用示例代码
  hooks: `
// 使用usehooks-ts库的useCounter
import {useCounter, useNumber} from 'react-use';

const Demo = () => {
  const [min, { inc: incMin, dec: decMin }] = useCounter(1);
  const [max, { inc: incMax, dec: decMax }] = useCounter(10);
  const [value, { inc, dec, set, reset }] = useCounter(5, max, min);

  return (
    <div>
      <div>
        current: { value } [min: { min }; max: { max }]
      </div>

      <br />
      Current value: <button onClick={ () => inc() }>Increment</button>
      <button onClick={ () => dec() }>Decrement</button>
      <button onClick={ () => inc(5) }>Increment (+5)</button>
      <button onClick={ () => dec(5) }>Decrement (-5)</button>
      <button onClick={ () => set(100) }>Set 100</button>
      <button onClick={ () => reset() }>Reset</button>
      <button onClick={ () => reset(25) }>Reset (25)</button>

      <br />
      <br />
      Min value:
      <button onClick={ () => incMin() }>Increment</button>
      <button onClick={ () => decMin() }>Decrement</button>

      <br />
      <br />
      Max value:
      <button onClick={ () => incMax() }>Increment</button>
      <button onClick={ () => decMax() }>Decrement</button>
    </div>
  );
};`,
};
