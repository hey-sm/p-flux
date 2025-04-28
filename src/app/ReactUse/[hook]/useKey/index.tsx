"use client";

import React, { useEffect, useLayoutEffect } from "react";

import { Examples } from "./Scenarios";
import { CODE_EXAMPLES } from "@/app/ReactUse/[hook]/useKey/NativeImplementation";
import {
  UseCase,
  TitleComparison,
  Header,
} from "@/app/ReactUse/components/exports";

export default function Page() {
  // 收集所有场景标题
  const titles = Examples.map((example) => example.title);

  // 使用useLayoutEffect确保在DOM渲染前强制滚动到顶部
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // 找到main元素并滚动到顶部
    const mainElement = document.querySelector("main");
    if (mainElement) {
      mainElement.scrollTop = 0;
    }
  }, []);

  return (
    <div className="space-y-8">
      {/* 标题部分 */}
      <Header
        name="useKey"
        description="React-Use 提供的 useKey 钩子是一个用于监听键盘按键的工具，可以监听指定按键或按键组合，可以限定在组件范围内生效。"
        Badges={titles}
      />

      {/* 原生实现部分 */}
      <TitleComparison
        beforeCode={CODE_EXAMPLES.MyHooks}
        afterCode={CODE_EXAMPLES.hooks}
      />

      {/* 场景示例部分 - 确保 ID 仍然使用导入的 generateId 生成 */}
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
