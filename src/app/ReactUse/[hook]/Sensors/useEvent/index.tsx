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
        name="useEvent"
        description="React-Use 提供的 useEvent 钩子是一个用于管理DOM事件的工具，能简化事件监听器的添加和移除，避免内存泄漏和重复代码。"
        Badges={titles}
      />

      {/* 原生实现部分 */}
      <TitleComparison
        beforeCode={CODE_EXAMPLES.traditional}
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
                  {example.title === "鼠标跟踪" && "鼠标在组件内移动"}
                  {example.title === "键盘事件监听" && "按下键盘任意键"}
                  {example.title === "窗口大小监听" &&
                    "调整浏览器窗口大小查看变化"}
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
