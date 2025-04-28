"use client";

import React, { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search, Menu, X } from "lucide-react";
import { SIDEBAR_MENU } from "@/config/ReactUseMenu";
import { createBreakpoint } from "react-use";

// 使用createBreakpoint创建响应式断点hook
const useBreakpoint = createBreakpoint({
  mobile: 0,
  tablet: 768,
  desktop: 1024,
});

export default function HooksSidebar() {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // 获取当前断点
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";

  // 路由变化时关闭移动端菜单
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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

  // 切换移动端菜单显示/隐藏
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
    if (isMobile) {
      setMenuOpen(false);
    }
  };

  // 当移动端菜单打开时，禁止背景内容滚动
  useEffect(() => {
    if (isMobile && menuOpen) {
      // 禁止背景内容滚动
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      // 记住当前滚动位置
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      // 恢复背景内容滚动
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      // 恢复滚动位置
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      // 清理函数，确保组件卸载时恢复滚动
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [isMobile, menuOpen]);

  // 渲染侧边栏内容
  const renderSidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* 侧边栏标题 */}
      <div className="flex items-center p-4 border-b justify-between">
        <Link href="/ReactUse">
          <h2 className="text-lg font-semibold">React-use</h2>
        </Link>
        <div className="flex items-center">
          <button
            onClick={toggleSearch}
            className="p-2 rounded-full hover:bg-slate-200 w-8 h-8 flex items-center justify-center"
            title="搜索Hooks"
          >
            <i className="icon-[mdi--magnify] w-4 h-4"></i>
          </button>
          {isMobile && (
            <button
              onClick={toggleMenu}
              className="ml-2 p-2 rounded-full hover:bg-slate-200 w-8 h-8 flex items-center justify-center md:hidden"
              title="关闭菜单"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
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
      <ScrollArea className="flex-1 overflow-hidden">
        <div className="px-2 py-2">
          {SIDEBAR_MENU.map((group) => (
            <div key={group.category} className="mb-4">
              <h3 className="text-xs font-semibold text-muted-foreground px-2 mb-1">
                {group.categoryCn || group.category}
              </h3>
              <div className="space-y-1">
                {group.hooks.map((hook) => (
                  <Link
                    key={hook.name}
                    href={`/ReactUse/${hook.name}`}
                    className={cn(
                      "block rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground",
                      pathname === `/ReactUse/${hook.name}`
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

  // 如果是移动端
  if (isMobile) {
    return (
      <>
        {/* 移动端的汉堡菜单按钮 */}
        <div className="block md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-slate-200 w-10 h-10 flex items-center justify-center"
            title="菜单"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* 移动端侧边栏（滑出式） */}
        {menuOpen && (
          <>
            {/* 半透明背景 */}
            <div
              className="fixed inset-0 bg-black/30 z-40 animate-in fade-in duration-200"
              onClick={() => setMenuOpen(false)}
            ></div>

            {/* 侧边栏内容 */}
            <div className="fixed inset-y-0 left-0 w-64 bg-background z-50 shadow-lg flex flex-col h-full animate-in slide-in-from-left duration-300">
              {renderSidebarContent()}
            </div>
          </>
        )}
      </>
    );
  }

  // 桌面端默认显示
  return renderSidebarContent();
}
