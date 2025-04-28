"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // 寻找主内容区域（main元素）
    const findMainElement = () => {
      const mainElements = document.querySelectorAll("main");
      if (mainElements.length > 0) {
        return mainElements[0] as HTMLElement;
      }
      return null;
    };

    // 获取滚动容器
    const scrollContainer = findMainElement();
    mainRef.current = scrollContainer;

    if (!scrollContainer) {
      return;
    }

    const handleScroll = () => {
      if (!scrollContainer) return;

      const scrollTop = scrollContainer.scrollTop;
      const viewportHeight = scrollContainer.clientHeight;
      const threshold = viewportHeight * 0.8;
      const shouldShow = scrollTop > threshold;

      setIsVisible(shouldShow);
    };

    // 监听内容区域的滚动事件
    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });

    // 初始检查
    handleScroll();

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

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
