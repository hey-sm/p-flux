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
        name="useIntersection"
        description="React-Use 提供的 useIntersection 钩子基于 Intersection Observer API，用于检测元素是否进入视口，常用于图片懒加载、无限滚动等场景。"
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
                  {example.title === "元素可见性检测" &&
                    "滚动页面观察元素状态变化"}
                  {example.title === "图片懒加载" && "滚动页面使图片进入视图"}
                  {example.title === "无限滚动" && "向下滚动加载更多内容"}
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
