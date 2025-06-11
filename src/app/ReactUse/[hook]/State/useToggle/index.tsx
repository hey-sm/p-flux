"use client";

import React from "react";

import { Examples } from "./Scenarios";
import { CODE_EXAMPLES } from "./NativeImplementation";
import {
  UseCase,
  TitleComparison,
  Header,
} from "@/app/ReactUse/components/exports";

export default function useToggleDemo() {
  // 收集所有场景标题
  const titles = Examples.map((scenario) => scenario.title);

  return (
    <div className="space-y-8">
      {/* 标题部分 */}
      <Header
        name={"useToggle"}
        description={
          "react-use库提供的布尔状态管理Hook，以数组形式返回状态和控制方法"
        }
        Badges={titles}
      />
      {/* 原生实现部分 */}
      <TitleComparison
        beforeCode={CODE_EXAMPLES.customHooks}
        afterCode={CODE_EXAMPLES.hooks}
      />
      {/* 场景示例部分 - 确保 ID 仍然使用导入的 generateId 生成 */}
      {Examples.map((scenario) => (
        <div key={scenario.title} id={scenario.title}>
          <UseCase title={scenario.title} codeExample={scenario.code}>
            {scenario.example}
          </UseCase>
        </div>
      ))}
    </div>
  );
}
