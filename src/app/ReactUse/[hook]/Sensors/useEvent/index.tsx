"use client";

import React, { useEffect } from "react";

import {
  EXAMPLES,
  MouseTracker,
  KeyboardListener,
  ElementResizer,
} from "./Scenarios";
import { CODE_EXAMPLES } from "./NativeImplementation";
import {
  UseCase,
  TitleComparison,
  Header,
} from "@/app/ReactUse/components/exports";

export default function Page() {
  // 收集所有场景标题
  const titles = Object.keys(EXAMPLES);

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

        {/* 鼠标跟踪示例 */}
        <div id="鼠标跟踪">
          <UseCase title="鼠标跟踪" codeExample={EXAMPLES.mouseTracker}>
            <div className="p-4 border rounded-md min-h-[120px] flex items-center justify-center relative">
              <div className="absolute top-2 left-2 text-xs text-muted-foreground">
                鼠标在组件内移动
              </div>
              <MouseTracker />
            </div>
          </UseCase>
        </div>

        {/* 键盘事件监听示例 */}
        <div id="键盘事件监听">
          <UseCase title="键盘事件监听" codeExample={EXAMPLES.keyboardListener}>
            <div className="p-4 border rounded-md min-h-[120px] flex items-center justify-center relative">
              <div className="absolute top-2 left-2 text-xs text-muted-foreground">
                按下键盘任意键
              </div>
              <KeyboardListener />
            </div>
          </UseCase>
        </div>

        {/* 元素大小监听示例 */}
        <div id="窗口大小监听">
          <UseCase title="窗口大小监听" codeExample={EXAMPLES.elementResizer}>
            <div className="p-4 border rounded-md min-h-[120px] flex items-center justify-center relative">
              <div className="absolute top-2 left-2 text-xs text-muted-foreground">
                调整浏览器窗口大小
              </div>
              <ElementResizer />
            </div>
          </UseCase>
        </div>
      </div>
    </div>
  );
}
