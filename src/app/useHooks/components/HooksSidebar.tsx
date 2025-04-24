"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// 定义 usehooks-ts 库的主要 hooks
const HOOKS = [
  {
    id: "useBoolean",
    name: "useBoolean",
    description: "布尔值状态管理",
    category: "状态",
  },
  {
    id: "useCounter",
    name: "useCounter",
    description: "数字计数器状态管理",
    category: "状态",
  },
  {
    id: "useEffectOnce",
    name: "useEffectOnce",
    description: "只执行一次的 Effect",
    category: "生命周期",
  },
  {
    id: "useLocalStorage",
    name: "useLocalStorage",
    description: "本地存储状态管理",
    category: "存储",
  },
  {
    id: "useSessionStorage",
    name: "useSessionStorage",
    description: "会话存储状态管理",
    category: "存储",
  },
  {
    id: "useDarkMode",
    name: "useDarkMode",
    description: "暗黑模式状态管理",
    category: "UI",
  },
  {
    id: "useDebounce",
    name: "useDebounce",
    description: "防抖值处理",
    category: "性能",
  },
  {
    id: "useThrottle",
    name: "useThrottle",
    description: "节流值处理",
    category: "性能",
  },
  {
    id: "useDocumentTitle",
    name: "useDocumentTitle",
    description: "文档标题管理",
    category: "浏览器",
  },
  {
    id: "useCopyToClipboard",
    name: "useCopyToClipboard",
    description: "剪贴板操作",
    category: "浏览器",
  },
  {
    id: "useInterval",
    name: "useInterval",
    description: "可控的 setInterval",
    category: "计时器",
  },
  {
    id: "useTimeout",
    name: "useTimeout",
    description: "可控的 setTimeout",
    category: "计时器",
  },
  {
    id: "useHover",
    name: "useHover",
    description: "悬停状态检测",
    category: "UI",
  },
  {
    id: "useMediaQuery",
    name: "useMediaQuery",
    description: "媒体查询检测",
    category: "浏览器",
  },
  {
    id: "useFetch",
    name: "useFetch",
    description: "数据获取处理",
    category: "数据",
  },
];

// 按类别对 hooks 进行分组
const CATEGORIES = Array.from(new Set(HOOKS.map((hook) => hook.category)));

export default function HooksSidebar() {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = React.useState("");

  // 过滤 hooks
  const filteredHooks = HOOKS.filter(
    (hook) =>
      hook.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hook.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 按类别分组
  const hooksByCategory = CATEGORIES.map((category) => {
    const hooksInCategory = filteredHooks.filter(
      (hook) => hook.category === category
    );
    return {
      category,
      hooks: hooksInCategory,
    };
  }).filter((group) => group.hooks.length > 0);

  return (
    <div className="flex h-full flex-col">
      {/* 侧边栏标题 */}
      <div className="flex items-center p-4 border-b">
        <h2 className="text-lg font-semibold">useHooks-ts</h2>
      </div>

      {/* 搜索框 */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索 Hooks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Hooks 列表 */}
      <ScrollArea className="flex-1">
        <div className="px-2 py-2">
          {hooksByCategory.map((group) => (
            <div key={group.category} className="mb-4">
              <h3 className="text-xs font-semibold text-muted-foreground px-2 mb-1">
                {group.category}
              </h3>
              <div className="space-y-1">
                {group.hooks.map((hook) => (
                  <Link
                    key={hook.id}
                    href={`/useHooks/${hook.id}`}
                    className={cn(
                      "block rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground",
                      pathname === `/useHooks/${hook.id}`
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-muted-foreground"
                    )}
                  >
                    <div>{hook.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {hook.description}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
