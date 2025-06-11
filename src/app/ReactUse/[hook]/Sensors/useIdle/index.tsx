"use client";

import React, { useEffect } from "react";

import { Examples } from "./Scenarios";
import { CODE_EXAMPLES } from "./NativeImplementation";
import {
  UseCase,
  TitleComparison,
  Header,
} from "@/app/ReactUse/components/exports";

export default function Page() {
  // 收集所有场景标题
  const titles = Examples.map((example) => example.title);
  return (
    <div className="space-y-8">
      {/* 标题部分 */}
      <Header
        name="useIdle"
        description="React-Use 提供的 useIdle 钩子用于检测用户是否处于空闲状态，当用户在指定时间内没有交互行为时，会将状态标记为空闲。"
        Badges={titles}
      />

      {/* 原生实现部分 */}
      <TitleComparison
        beforeCode={CODE_EXAMPLES.customHook}
        afterCode={CODE_EXAMPLES.hook}
      />

      {/* 场景示例部分 */}
      <div className="space-y-8 mt-8">
        <h2 className="text-xl font-semibold">使用场景 & 示例</h2>
        {Examples.map((example) => (
          <div key={example.title} id={example.title}>
            <UseCase title={example.title} codeExample={example.code}>
              <div className="p-4 border rounded-md min-h-[120px] flex items-center justify-center relative">
                <div className="absolute top-2 left-2 text-xs text-muted-foreground">
                  保持不动几秒钟查看空闲状态变化
                </div>
                {example.example}
              </div>
            </UseCase>
          </div>
        ))}
      </div>
    </div>
  );
}
