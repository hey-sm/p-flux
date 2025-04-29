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
        name="useScratch"
        description="React-Use 提供的 useScratch 钩子用于检测拖拽和刮擦手势，可用于签名板、拖拽排序等交互场景。"
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
                  {example.title === "签名板" && "在区域内拖动进行签名"}
                  {example.title === "拖拽排序列表" && "拖拽列表项进行重排序"}
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
