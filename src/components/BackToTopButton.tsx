"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useEvent } from "react-use";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  // 处理滚动事件
  const handleScroll = useCallback(() => {
    const scrollContainer = mainRef.current;
    if (!scrollContainer) return;

    const scrollTop = scrollContainer.scrollTop;
    const viewportHeight = scrollContainer.clientHeight;
    const threshold = viewportHeight * 0.8;
    const shouldShow = scrollTop > threshold;

    setIsVisible(shouldShow);
  }, []);

  // 获取滚动容器
  useEffect(() => {
    // 寻找主内容区域（main元素）
    const mainElements = document.querySelectorAll("main");
    if (mainElements.length > 0) {
      mainRef.current = mainElements[0] as HTMLElement;
      // 初始检查滚动位置
      handleScroll();
    }
  }, [handleScroll]);

  // 使用useEvent监听滚动事件
  useEvent("scroll", handleScroll, mainRef.current);

  // 当路径变化时重置滚动位置
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({
        top: 0,
        behavior: "auto",
      });
    }
  }, [pathname]);

  const scrollToTop = () => {
    if (mainRef.current) {
      mainRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-[999] ${
        isVisible ? "block" : "hidden"
      }`}
      aria-label="回到顶部"
    >
      <span
        className="icon-[material-symbols--arrow-circle-up-rounded] "
        style={{ width: "3em", height: "3em", color: "#9aa4c6" }}
      ></span>
    </button>
  );
};

export default BackToTopButton;
