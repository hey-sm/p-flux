import React from "react";
import { HooksSidebar } from "./components/exports";
import BackToTopButton from "@/components/BackToTopButton";

export const metadata = {
  title: "React-use 示例集合",
  description: "React-use 库的各种 Hooks 使用示例展示",
};

export default function UseHooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row relative">
      {/* 移动端顶部菜单栏 */}
      <div className="md:hidden flex items-center justify-between p-3 border-b bg-muted/40">
        <span className="text-lg font-semibold">React-use</span>
        <HooksSidebar />
      </div>

      {/* 侧边菜单 - 仅在桌面端显示 */}
      <div className="hidden md:block w-64 shrink-0 border-r bg-muted/40 md:h-screen md:overflow-y-auto sticky top-0 sidebar-thin-scrollbar">
        <HooksSidebar />
      </div>

      {/* 主内容区 */}
      <main className="flex-1 p-6 md:p-8 md:h-screen md:overflow-y-auto">
        {children}
      </main>

      {/* 回到顶部按钮 */}
      <BackToTopButton />
    </div>
  );
}
