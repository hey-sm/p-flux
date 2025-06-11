"use client";

import React from "react";

import { Examples } from "./Scenarios";
import { CODE_EXAMPLES } from "./NativeImplementation";
import {
  UseCase,
  TitleComparison,
  Header,
} from "@/app/ReactUse/components/exports";

// 场景类型定义
interface Scenario {
  title: string;
  example: React.ReactNode;
  code: string;
}

export default function useListDemo() {
  // 收集所有场景标题
  const titles = Examples.map((scenario: Scenario) => scenario.title);

  return (
    <div className="space-y-8">
      {/* 标题部分 */}
      <Header
        name={"useList"}
        description={
          "react-use库提供的列表状态管理Hook，简化列表操作并提供丰富的API"
        }
        Badges={titles}
      />
      {/* 原生实现部分 */}
      <TitleComparison
        beforeCode={CODE_EXAMPLES.customHooks}
        afterCode={CODE_EXAMPLES.hooks}
      />
      {/* 场景示例部分 */}
      {Examples.map((scenario: Scenario) => (
        <div key={scenario.title} id={scenario.title}>
          <UseCase title={scenario.title} codeExample={scenario.code}>
            {scenario.example}
          </UseCase>
        </div>
      ))}
    </div>
  );
}
