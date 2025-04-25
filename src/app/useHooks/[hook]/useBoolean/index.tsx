"use client";

import React, { useRef } from "react";

import { Examples } from "./Scenarios";
import { CODE_EXAMPLES } from "./NativeImplementation";
import {
  UseCase,
  TitleComparison,
  Header,
} from "@/app/useHooks/components/exports";

export default function UseBooleanDemo() {
  // 收集所有场景标题
  const titles = Examples.map((scenario) => scenario.title);

  // 为每个场景创建引用
  const scenarioRefs = useRef<Array<HTMLDivElement | null>>([]);

  // 处理标题点击
  const handleTitleClick = (index: number) => {
    if (scenarioRefs.current[index]) {
      scenarioRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* 标题部分 */}
      <Header
        name={"useBoolean"}
        description={
          "用于简化布尔状态管理的 Hook，提供 toggle、setTrue、setFalse 等便捷方法"
        }
        Badges={titles}
        onBadgeClick={handleTitleClick}
      />
      {/* 原生实现部分 */}
      <TitleComparison
        beforeCode={CODE_EXAMPLES.MyHooks}
        afterCode={CODE_EXAMPLES.hooks}
      />
      {/* 场景示例部分 */}
      {Examples.map((scenario, index) => (
        <div
          key={index}
          ref={(el) => {
            scenarioRefs.current[index] = el;
          }}
        >
          <UseCase title={scenario.title} codeExample={scenario.code}>
            {scenario.example}
          </UseCase>
        </div>
      ))}
    </div>
  );
}
