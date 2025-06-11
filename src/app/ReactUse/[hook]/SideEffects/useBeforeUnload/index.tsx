"use client";

import React from "react";

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
        name="useBeforeUnload"
        description="React-Use 提供的 useBeforeUnload 钩子用于在用户尝试关闭页面或刷新时显示确认对话框，防止用户意外丢失未保存的数据。它是浏览器 beforeunload 事件的 React 封装。"
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
                {example.example}
              </div>
            </UseCase>
          </div>
        ))}
      </div>
    </div>
  );
}
