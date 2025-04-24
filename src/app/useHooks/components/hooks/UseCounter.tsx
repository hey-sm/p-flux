"use client";

import React from "react";
import { useCounter } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon, MinusIcon, RotateCcwIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

export default function UseCounterDemo() {
  const { count, increment, decrement, reset, setCount } = useCounter(0);
  const [step, setStep] = React.useState(1);

  const handleIncrement = () => increment(step);
  const handleDecrement = () => decrement(step);
  const handleSetCount = (value: number) => setCount(value);
  const handleStepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setStep(isNaN(value) ? 1 : value);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-6">
            {/* 显示当前计数 */}
            <div className="flex items-center justify-center">
              <div className="text-6xl font-semibold w-20 text-center">
                {count}
              </div>
            </div>

            {/* 控制按钮 */}
            <div className="flex justify-center items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleDecrement}
                title="减少"
              >
                <MinusIcon className="h-4 w-4" />
              </Button>

              <Button
                variant="default"
                size="icon"
                onClick={handleReset}
                title="重置"
              >
                <RotateCcwIcon className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={handleIncrement}
                title="增加"
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>

            {/* 步长控制 */}
            <div className="space-y-2">
              <div className="text-sm font-medium">步长</div>
              <div className="flex items-center gap-2">
                <Slider
                  value={[step]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => setStep(value[0])}
                />
                <Input
                  type="number"
                  value={step}
                  onChange={handleStepChange}
                  className="w-20"
                  min={1}
                />
              </div>
            </div>

            {/* 直接设置值 */}
            <div className="space-y-2">
              <div className="text-sm font-medium">直接设置值</div>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={count}
                  onChange={(e) =>
                    handleSetCount(parseInt(e.target.value) || 0)
                  }
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-muted p-4 rounded-md">
        <p className="text-sm font-medium mb-2">当前状态：</p>
        <code className="bg-primary/10 text-primary p-2 rounded-md block">
          {`count: ${count}\nstep: ${step}`}
        </code>
      </div>
    </div>
  );
}

// 代码示例，用于展示页面
export const CODE_EXAMPLE = `
import { useCounter } from 'usehooks-ts';

function MyComponent() {
  const { 
    count,       // 当前计数值
    increment,   // 递增函数 (可选参数: 步长)
    decrement,   // 递减函数 (可选参数: 步长)
    reset,       // 重置为初始值
    setCount     // 直接设置值
  } = useCounter(0);   // 初始值为 0

  return (
    <div>
      <p>当前计数: {count}</p>
      <button onClick={() => increment()}>+1</button>
      <button onClick={() => increment(5)}>+5</button>
      <button onClick={() => decrement()}>-1</button>
      <button onClick={() => reset()}>重置</button>
      <button onClick={() => setCount(100)}>设为 100</button>
    </div>
  );
}
`;

// Hook 的元数据
export const HOOK_META = {
  name: "useCounter",
  description:
    "用于管理计数器状态的 Hook，提供递增、递减、重置和直接设置值等功能",
  category: "状态",
  docsLink: "https://usehooks-ts.com/react-hook/use-counter",
  githubLink:
    "https://github.com/juliencrn/usehooks-ts/blob/master/packages/usehooks-ts/src/useCounter/useCounter.ts",
};
