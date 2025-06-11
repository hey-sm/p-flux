/** @format */
"use client";

import Link from "next/link";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { menuItems } from "@/config/dockMenu";

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
// 浮动容器组件 - 简化版
function FloatingContainer({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const throttleRef = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
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

  // 桌面端：鼠标悬停区域处理
  const handleMouseMovement = useCallback(
    (e: MouseEvent) => {
      if (isMobile || throttleRef.current !== null) return;

      throttleRef.current = window.requestAnimationFrame(() => {
        const windowCenterX = window.innerWidth / 2;
        const isInTriggerZone =
          e.clientX >= windowCenterX - 200 &&
          e.clientX <= windowCenterX + 200 &&
          e.clientY <= 100;

        setIsVisible(isInTriggerZone);
        throttleRef.current = null;
      });
    },
    [isMobile]
  );

  // 移动端：点击指示条显示，点击外部关闭
  const toggleMenu = () => setIsVisible(true);

  // 处理点击外部关闭
  useEffect(() => {
    if (!isMobile || !isVisible) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener("click", handleOutsideClick, true);
    return () =>
      document.removeEventListener("click", handleOutsideClick, true);
  }, [isMobile, isVisible]);

  // 仅桌面端添加鼠标移动事件
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
    <>
      {/* Dock菜单 */}
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
          isVisible ? "pointer-events-auto" : "pointer-events-none"
        )}
        style={{
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
        }}
      >
        {children}
      </motion.div>

      {/* 移动端指示条 - 仅小横条部分点击展开 */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 z-40 flex justify-center items-center h-8 pointer-events-none">
          <div
            onClick={toggleMenu}
            className="w-16 h-1.5 bg-slate-400/50 rounded-full mt-3 cursor-pointer pointer-events-auto"
            style={{ WebkitTapHighlightColor: "transparent" }}
          ></div>
        </div>
      )}
    </>
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
