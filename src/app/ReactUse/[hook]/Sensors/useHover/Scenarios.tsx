"use client";

import React, { useState } from "react";
import { useHover } from "react-use";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

// 基础悬停示例
function BasicHover() {
  const element = (hovered: boolean) => (
    <div
      className={`p-6 border rounded-lg transition-colors ${
        hovered ? "bg-blue-100 border-blue-300" : "bg-slate-50 border-slate-200"
      }`}
    >
      <p className="text-center font-medium">
        {hovered ? "鼠标悬停中!" : "将鼠标悬停在此区域"}
      </p>
    </div>
  );

  const [hoverable, hovered] = useHover(element);

  return <div>{hoverable}</div>;
}

// Tooltip提示示例
function TooltipExample() {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const tooltipTrigger = (hovered: boolean) => {
    // 当悬停状态改变时更新tooltip可见性
    if (hovered !== isTooltipVisible) {
      setIsTooltipVisible(hovered);
    }

    return (
      <div className="relative inline-block">
        <button className="px-4 py-2 bg-slate-800 text-white rounded-md">
          悬停显示提示
        </button>
        {hovered && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-slate-400 text-white text-sm px-3 py-1.5 rounded shadow-lg min-w-[160px] text-center">
            <div className="absolute w-3 h-3 bg-slate-400 transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1.5"></div>
            这是一个Tooltip提示框
          </div>
        )}
      </div>
    );
  };

  const [tooltipElement] = useHover(tooltipTrigger);

  return <div className="flex justify-center py-10">{tooltipElement}</div>;
}

// 交互元素悬停示例
function InteractiveHover() {
  const [count, setCount] = useState(0);

  const interactiveElement = (hovered: boolean) => (
    <div
      className={`p-6 border rounded-lg transition-all duration-300 ${
        hovered
          ? "bg-green-50 border-green-300 shadow-md"
          : "bg-white border-slate-200"
      }`}
    >
      <div className="text-center space-y-3">
        <p className="font-medium">
          {hovered ? "悬停状态 + 交互" : "将鼠标悬停查看交互"}
        </p>
        {hovered && (
          <>
            <p className="text-sm text-slate-600">当前计数: {count}</p>
            <button
              onClick={() => setCount(count + 1)}
              className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
            >
              增加计数
            </button>
          </>
        )}
      </div>
    </div>
  );

  const [interactable] = useHover(interactiveElement);

  return <div>{interactable}</div>;
}
const CODE_EXAMPLES = {
  BasicHover: `const BasicHover = () => {
  const element = (hovered) => (
    <div className={\`p-4 border rounded \${
      hovered ? "bg-blue-100" : "bg-white"
    }\`}>
      <p>{hovered ? "鼠标悬停中!" : "将鼠标悬停在此区域"}</p>
    </div>
  );

  const [hoverable, hovered] = useHover(element);

  return <div>{hoverable}</div>;
};`,
  TooltipExample: `const TooltipExample = () => {
  const tooltipTrigger = (hovered) => (
    <div className="relative inline-block">
      <button className="px-4 py-2 bg-slate-800 text-white rounded-md">
        悬停显示提示
      </button>
      {hovered && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-slate-900 text-white px-3 py-1.5 rounded shadow-lg">
          <div className="absolute w-3 h-3 bg-slate-900 transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1.5"></div>
          这是一个Tooltip提示框
        </div>
      )}
    </div>
  );

  const [tooltipElement] = useHover(tooltipTrigger);

  return <div>{tooltipElement}</div>;
};`,
  InteractiveHover: `const InteractiveHover = () => {
  const [count, setCount] = useState(0);

  const interactiveElement = (hovered) => (
    <div className={\`p-4 border rounded \${
      hovered ? "bg-green-50 shadow-md" : "bg-white"
    }\`}>
      <p>{hovered ? "悬停状态 + 交互" : "将鼠标悬停查看交互"}</p>
      {hovered && (
        <>
          <p>当前计数: {count}</p>
          <button
            onClick={() => setCount(count + 1)}
            className="px-3 py-1 bg-green-600 text-white rounded-md"
          >
            增加计数
          </button>
        </>
      )}
    </div>
  );

  const [interactable] = useHover(interactiveElement);

  return <div>{interactable}</div>;
};`,
};
// 导出示例组件
export const Examples = [
  {
    title: "基础悬停效果",
    example: <BasicHover />,
    code: CODE_EXAMPLES.BasicHover,
  },
  {
    title: "Tooltip提示效果",
    example: <TooltipExample />,
    code: CODE_EXAMPLES.TooltipExample,
  },
  {
    title: "交互式悬停效果",
    example: <InteractiveHover />,
    code: CODE_EXAMPLES.InteractiveHover,
  },
];
