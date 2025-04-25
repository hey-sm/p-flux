"use client";

import React, { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { HOOKS } from "@/config/useHooksMenu";

// 按类别对 hooks 进行分组
const CATEGORIES = Array.from(new Set(HOOKS.map((hook) => hook.category)));

export default function HooksSidebar() {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchVisible, setSearchVisible] = React.useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

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

  // 切换搜索框显示/隐藏
  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    // 如果显示搜索框，则聚焦输入框
    if (!searchVisible) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  // 点击外部关闭搜索框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchVisible(false);
      }
    };

    if (searchVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchVisible]);

  // 点击搜索结果后隐藏搜索框
  const handleHookSelect = () => {
    setSearchVisible(false);
  };

  return (
    <div className="flex h-full flex-col">
      {/* 侧边栏标题 */}
      <div className="flex items-center p-4 border-b justify-between">
        <Link href="/useHooks">
          <h2 className="text-lg font-semibold">useHooks-ts</h2>
        </Link>
        <button
          onClick={toggleSearch}
          className="p-2 rounded-full hover:bg-slate-200 w-8 h-8 flex items-center justify-center"
          title="搜索Hooks"
        >
          <i className="icon-[mdi--magnify] w-4 h-4"></i>
        </button>
      </div>

      {/* 搜索框 */}
      {searchVisible && (
        <div className="p-4" ref={searchContainerRef}>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              ref={searchInputRef}
              placeholder="搜索 Hooks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      )}

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
                    onClick={handleHookSelect}
                  >
                    <div>{hook.name}</div>
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
