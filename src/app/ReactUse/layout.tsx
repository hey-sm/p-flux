import React from "react";
import { HooksSidebar } from "./components/exports";

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
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* 侧边菜单 */}
      <div className="w-full md:w-64 shrink-0 border-r bg-muted/40 md:h-screen md:overflow-y-auto sticky top-0 sidebar-thin-scrollbar">
        <HooksSidebar />
      </div>

      {/* 主内容区 */}
      <div className="flex-1 p-6 md:p-8 md:h-screen md:overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
