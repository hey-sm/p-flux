"use client";

import React, { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { HOOKS } from "@/config/useHooksMenu";

// 预定义支持的钩子映射
const HOOK_MODULES = {
  useBoolean: () => import("./useBoolean/index"),
  useCounter: () => import("./UseCounter/index"),
} as const;

// 类型保护函数，检查hookId是否是支持的钩子
function isSupportedHook(hookId: string): hookId is keyof typeof HOOK_MODULES {
  return hookId in HOOK_MODULES;
}

// 用于展示加载状态的组件
function LoadingHook() {
  return (
    <div className="flex items-center justify-center h-[300px]">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>
  );
}

export default function HookPage() {
  const params = useParams();
  const hookId = params?.hook as string;

  // 状态管理
  const [isLoading, setIsLoading] = useState(true);
  const [hookExists, setHookExists] = useState(true);
  const [HookComponent, setHookComponent] =
    useState<React.ComponentType | null>(null);

  // 动态加载钩子组件
  useEffect(() => {
    const loadHookComponent = async () => {
      setIsLoading(true);

      // 检查 Hook 是否存在
      const hook = HOOKS.find((h) => h.id === hookId);
      if (!hook) {
        setHookExists(false);
        return;
      }

      try {
        // 使用预定义映射加载模块
        if (isSupportedHook(hookId)) {
          const hookModule = await HOOK_MODULES[hookId]();
          // 获取默认导出的组件
          setHookComponent(() => hookModule.default);
        } else {
          setHookExists(false);
        }
      } catch (error) {
        console.error("加载Hook组件失败", error);
        setHookExists(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (hookId) {
      loadHookComponent();
    }
  }, [hookId]);

  // 如果 Hook 不存在，触发 404
  useEffect(() => {
    if (!hookExists) {
      notFound();
    }
  }, [hookExists]);

  if (isLoading) {
    return <LoadingHook />;
  }

  // 渲染动态加载的Hook组件
  return HookComponent ? <HookComponent /> : null;
}
