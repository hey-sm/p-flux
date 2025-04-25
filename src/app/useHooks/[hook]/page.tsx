"use client";

import React, { Suspense, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import HookDemo from "../components/HookDemo";
import { HOOKS } from "../data/hooks";
import { use } from "react";

// 定义元数据类型
interface HookMeta {
  name: string;
  description: string;
  category: string;
  docsLink?: string;
  githubLink?: string;
}

// 定义参数类型
interface PageParams {
  hook: string;
}

// 在现有的import语句下面添加
interface HookModuleData {
  CODE_EXAMPLE?: string;
  HOOK_META: HookMeta;
  HOOK_SCENARIOS?: Array<{
    title?: string;
    demo: React.ReactNode;
    code: string;
  }>;
}

// 动态导入组件（UI展示部分）
const UseBooleanDemo = React.lazy(
  () => import("../components/hooks/UseBoolean")
);
const UseCounterDemo = React.lazy(
  () => import("../components/hooks/UseCounter")
);
const UseDebounceDemo = React.lazy(
  () => import("../components/hooks/UseDebounce")
);
const UseLocalStorageDemo = React.lazy(
  () => import("../components/hooks/UseLocalStorage")
);
const UseDarkModeDemo = React.lazy(
  () => import("../components/hooks/UseDarkMode")
);

// 用于展示加载状态的组件
function LoadingHook() {
  return (
    <div className="flex items-center justify-center h-[300px]">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>
  );
}

export default function HookPage({ params }: { params: Promise<PageParams> }) {
  // 解包整个params对象 - 这是 Next.js 15 推荐的做法
  const resolvedParams = use(params);
  const hookId = resolvedParams.hook;

  // 状态管理
  const [isLoading, setIsLoading] = useState(true);
  const [hookExists, setHookExists] = useState(true);
  const [meta, setMeta] = useState<HookMeta>({
    name: "",
    description: "",
    category: "",
  });
  const [codeExample, setCodeExample] = useState("");
  const [scenarios, setScenarios] = useState<
    Array<{
      title?: string;
      demo: React.ReactNode;
      code: string;
    }>
  >([]);

  // 动态加载元数据和代码示例
  useEffect(() => {
    const loadMetaAndCode = async () => {
      setIsLoading(true);

      // 检查 Hook 是否存在
      const hook = HOOKS.find((h) => h.id === hookId);
      if (!hook) {
        setHookExists(false);
        return;
      }

      try {
        let moduleData: HookModuleData;

        switch (hookId) {
          case "useBoolean":
            moduleData = await import("../components/hooks/UseBoolean");
            break;
          case "useCounter":
            moduleData = await import("../components/hooks/UseCounter");
            break;
          case "useDebounce":
            moduleData = await import("../components/hooks/UseDebounce");
            break;
          case "useLocalStorage":
            moduleData = await import("../components/hooks/UseLocalStorage");
            break;
          case "useDarkMode":
            moduleData = await import("../components/hooks/UseDarkMode");
            break;
          default:
            moduleData = {
              CODE_EXAMPLE: `// ${hook.name} 示例代码\nimport { ${hook.name} } from 'usehooks-ts';\n\nfunction MyComponent() {\n  // Hook 使用示例\n  // ...\n}`,
              HOOK_META: {
                name: hook.name,
                description: hook.description,
                category: hook.category,
                docsLink: `https://usehooks-ts.com/react-hook/${hookId}`,
              },
            };
        }

        // 处理场景
        let scenarios = moduleData.HOOK_SCENARIOS;
        if (!scenarios) {
          // 如果没有配置场景，则使用默认场景
          scenarios = [
            {
              title: "基本用法",
              demo: renderDemo(),
              code: moduleData.CODE_EXAMPLE || "",
            },
          ];
        }

        setCodeExample(moduleData.CODE_EXAMPLE || "");
        setMeta(moduleData.HOOK_META);
        setScenarios(scenarios);
      } catch (error) {
        console.error("加载Hook数据失败", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMetaAndCode();
  }, [hookId]);

  // 如果 Hook 不存在，触发 404
  useEffect(() => {
    if (!hookExists) {
      notFound();
    }
  }, [hookExists]);

  // 根据不同的 Hook 渲染不同的演示组件
  const renderDemo = () => {
    switch (hookId) {
      case "useBoolean":
        return (
          <Suspense fallback={<LoadingHook />}>
            <UseBooleanDemo />
          </Suspense>
        );
      case "useCounter":
        return (
          <Suspense fallback={<LoadingHook />}>
            <UseCounterDemo />
          </Suspense>
        );
      case "useDebounce":
        return (
          <Suspense fallback={<LoadingHook />}>
            <UseDebounceDemo />
          </Suspense>
        );
      case "useLocalStorage":
        return (
          <Suspense fallback={<LoadingHook />}>
            <UseLocalStorageDemo />
          </Suspense>
        );
      case "useDarkMode":
        return (
          <Suspense fallback={<LoadingHook />}>
            <UseDarkModeDemo />
          </Suspense>
        );
      default:
        return (
          <div className="p-6 bg-muted rounded-lg text-center">
            <p>此 Hook 的演示正在开发中...</p>
          </div>
        );
    }
  };

  if (isLoading) {
    return <LoadingHook />;
  }

  return (
    <HookDemo
      id={hookId}
      name={meta.name}
      description={meta.description}
      category={meta.category}
      scenarios={scenarios}
      docsLink={meta.docsLink}
      githubLink={meta.githubLink}
    />
  );
}
