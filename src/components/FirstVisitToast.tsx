"use client";

import { useEffect } from "react";
import { toast } from "sonner";

const FirstVisitToast = () => {
  useEffect(() => {
    // 检查是否是首次访问
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      // 显示 toast 消息，设置持续时间为无限并添加确认按钮
      toast("鼠标移入顶部中间位置, 唤醒 Dock 菜单", {
        duration: Infinity,
        action: {
          label: "确定",
          onClick: () => {},
        },
      });

      // 设置标记，防止再次显示
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  return null;
};

export default FirstVisitToast;
