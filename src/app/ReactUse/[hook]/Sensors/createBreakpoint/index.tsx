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
      <div className="text-sm text-slate-500">
        <b> useMedia：</b>
        <br />
        更通用。可以监听任意媒体条件,不仅仅是宽度变化。关注的是条件成立与否（true/false）。
        <br />
        它允许你在 JavaScript/React
        中直接监听媒体查询的变化，比如屏幕宽度、高度、颜色模式（亮/暗）、设备类型等，并根据匹配结果做出响应。
        <br />
        <br />
        <b> createBreakpoint：</b>
        <br />
        只根据屏幕宽度变化来决定「当前在哪个断点区间」。关注的是匹配到了哪个断点名字（比如
        &quot;md&quot;、&quot;lg&quot;）。
      </div>

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
