/** @format */
"use client";

import Link from "next/link";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { Dock, DockIcon } from "@/components/magicui/dock";

const menuItems = [
  {
    title: "首页",
    url: "/",
    icon: "icon-[lucide--home]",
  },
  {
    title: "博客笔记",
    url: "/blog",
    icon: "icon-[lucide--inbox]",
  },
  {
    title: "组件特效",
    url: "/ui-showcase",
    icon: "icon-[lucide--calendar]",
  },
  {
    title: "网站导航",
    url: "/navigation",
    icon: "icon-[lucide--search]",
  },
  {
    title: "flux",
    url: "/about",
    icon: "icon-[lucide--user]",
  },
];

// 主菜单组件
function DockMenuContent() {
  return (
    <div className="flex flex-col items-center justify-center cursor-pointer">
      <Dock direction="middle">
        {menuItems.map((item) => (
          <DockIcon key={item.title}>
            <Link
              href={item.url}
              aria-label={item.title}
              className={cn(
                buttonVariants({ variant: "link", size: "icon" }),
                "size-12 group relative"
              )}
            >
              <span className={`size-5 ${item.icon}`}></span>
              <span
                className={cn(
                  "absolute -bottom-2.5 left-1/2 -translate-x-1/2",
                  "text-xs",
                  " text-slate-900 dark:text-slate-900",
                  "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100",
                  "transition-all duration-200",
                  "whitespace-nowrap pointer-events-none z-50"
                )}
              >
                {item.title}
              </span>
            </Link>
          </DockIcon>
        ))}
      </Dock>
    </div>
  );
}
// 浮动容器组件
function FloatingContainer({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const throttleRef = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // 检测设备类型
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsMobile(isTouchDevice || window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 定义触发区域尺寸 (仅桌面端使用)
  const triggerWidth = 400;
  const triggerHeight = 100;

  // 处理桌面端鼠标移动
  const handleMouseMovement = useCallback(
    (e: MouseEvent) => {
      if (isMobile || throttleRef.current !== null) return;

      throttleRef.current = window.requestAnimationFrame(() => {
        const windowCenterX = window.innerWidth / 2;
        const isInTriggerZone =
          e.clientX >= windowCenterX - triggerWidth / 2 &&
          e.clientX <= windowCenterX + triggerWidth / 2 &&
          e.clientY <= triggerHeight;

        setIsVisible(isInTriggerZone);
        throttleRef.current = null;
      });
    },
    [isMobile]
  );

  // 处理移动端指示条点击
  function handleIndicatorClick() {
    setIsVisible(true);
  }

  // 监听点击事件，检测是否点击菜单外部
  useEffect(() => {
    if (!isMobile || !isVisible) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (!menuRef.current) return;

      // 检查点击是否在菜单区域外
      if (!menuRef.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };

    // 延迟添加事件监听，避免点击指示条立即触发关闭
    const timer = setTimeout(() => {
      document.addEventListener("click", handleOutsideClick, true);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, [isVisible, isMobile]);

  // 注册鼠标移动事件监听
  useEffect(() => {
    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMovement, {
        passive: true,
      });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMovement);
      if (throttleRef.current !== null) {
        cancelAnimationFrame(throttleRef.current);
      }
    };
  }, [handleMouseMovement, isMobile]);

  return (
    <div className="relative w-full" ref={containerRef}>
      <motion.div
        ref={menuRef}
        initial={false}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
          mass: 0.5,
        }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          "flex justify-center items-center",
          "py-2 bg-background/80 backdrop-blur-sm",
          "transition-[backdrop-filter]",
          isVisible ? "pointer-events-auto" : "pointer-events-none"
        )}
        style={{
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        {children}
      </motion.div>

      {/* 移动端指示条 - 点击展开 */}
      {isMobile && (
        <div
          onClick={handleIndicatorClick}
          className={cn(
            "fixed top-0 left-0 right-0 z-40",
            "flex justify-center items-center",
            "h-8 cursor-pointer active:bg-slate-100/10",
            isVisible ? "pointer-events-none" : "pointer-events-auto"
          )}
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          <div className="w-16 h-1.5 bg-slate-400/50 rounded-full mt-3" />
        </div>
      )}
    </div>
  );
}
// 导出的主组件
export function DockMenu() {
  return (
    <FloatingContainer>
      <DockMenuContent />
    </FloatingContainer>
  );
}
