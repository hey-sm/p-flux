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

  // 确保页面加载时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
    // 找到main元素并滚动到顶部
    const mainElement = document.querySelector("main");
    if (mainElement) {
      mainElement.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="space-y-8">
      {/* 标题部分 */}
      <Header
        name="createBreakpoint"
        description="React-Use 提供的 createBreakpoint 钩子是一个用于响应式设计的工具，可以根据窗口大小自动切换不同的断点值，支持自定义断点。"
        Badges={titles}
      />

      {/* 原生实现部分 */}
      <TitleComparison
        beforeCode={CODE_EXAMPLES.MyHooks}
        afterCode={CODE_EXAMPLES.hooks}
      />

      {/* 场景示例部分 */}
      <div className="space-y-8 mt-8">
        <h2 className="text-xl font-semibold">使用场景 & 示例</h2>
        {Examples.map((example) => (
          <div key={example.title} id={example.title}>
            <UseCase title={example.title} codeExample={example.code}>
              {example.example}
            </UseCase>
          </div>
        ))}
      </div>
    </div>
  );
}
