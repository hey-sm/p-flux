"use client";

import React from "react";

import { Examples } from "./Scenarios";
import { CODE_EXAMPLES } from "./NativeImplementation";
import {
  UseCase,
  TitleComparison,
  Header,
} from "@/app/useHooks/components/exports";

export default function useCounterDemo() {
  return (
    <div className="space-y-8">
      {/* 标题部分 */}
      <Header
        name={"useCounter"}
        description={
          "用于简化计数器状态管理的 Hook，提供 increment、decrement 等便捷方法"
        }
        Badges={[]}
      />

      {/* 原生实现部分 */}
      <TitleComparison
        beforeCode={CODE_EXAMPLES.MyHooks}
        afterCode={CODE_EXAMPLES.hooks}
      />
      {/* 场景示例部分 */}
      {Examples.map((scenario, index) => (
        <UseCase key={index} title={scenario.title} codeExample={scenario.code}>
          {scenario.example}
        </UseCase>
      ))}
    </div>
  );
}
