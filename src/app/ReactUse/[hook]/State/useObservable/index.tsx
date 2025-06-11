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

export default function useObservableDemo() {
  // 收集所有场景标题
  const titles = Examples.map((scenario: Scenario) => scenario.title);

  return (
    <div className="space-y-8">
      {/* 标题部分 */}
      <Header
        name={"useObservable"}
        description={
          "react-use库提供的Observable状态管理Hook，用于响应式编程，连接RxJS与React组件"
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
