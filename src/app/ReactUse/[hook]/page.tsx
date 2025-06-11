"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SIDEBAR_MENU } from "@/config/ReactUseMenu";

// 显示开发中信息的组件
function DevelopingHook({ hookId }: { hookId: string }) {
  return (
    <div className="p-8 bg-blue-50 border border-blue-200 rounded-lg">
      <p className="text-blue-700 mb-6">
        <code className="bg-blue-100 px-2 rounded">{hookId}</code>{" "}
        正在开发中，敬请期待！
      </p>
    </div>
  );
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
  const [isSupported, setIsSupported] = useState(true);
  const [HookComponent, setHookComponent] =
    useState<React.ComponentType | null>(null);

  // 动态加载钩子组件
  useEffect(() => {
    const loadHookComponent = async () => {
      if (!hookId) {
        setIsLoading(false);
        setHookExists(false);
        return;
      }

      setIsLoading(true);

      // 在SIDEBAR_MENU中查找hook及其分类
      let hookCategory = "";
      const foundHook = SIDEBAR_MENU.some((category) => {
        const found = category.hooks.some((hook) => hook.name === hookId);
        if (found) {
          hookCategory = category.category;
        }
        return found;
      });

      if (!foundHook) {
        setHookExists(false);
        setIsLoading(false);
        return;
      }

      try {
        // 尝试根据分类和hook名称动态导入组件
        let hookModule;
        try {
          // 优先尝试从具体分类目录导入
          hookModule = await import(`./${hookCategory}/${hookId}/index`);
        } catch (e) {
          // 如果失败，尝试从根目录导入
          try {
            hookModule = await import(`./${hookId}/index`);
          } catch (e2) {
            // 两种路径都失败，标记为不支持
            setIsSupported(false);
            setIsLoading(false);
            return;
          }
        }

        // 获取默认导出的组件
        setHookComponent(() => hookModule.default);
      } catch (error) {
        console.error("加载Hook组件失败", error);
        setIsSupported(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadHookComponent();
  }, [hookId]);

  if (isLoading) {
    return <LoadingHook />;
  }

  // 如果Hook存在于配置但未实现，或者加载失败，显示开发中信息
  if (!hookExists || !isSupported) {
    return <DevelopingHook hookId={hookId} />;
  }

  // 渲染动态加载的Hook组件
  return HookComponent ? <HookComponent /> : null;
}
