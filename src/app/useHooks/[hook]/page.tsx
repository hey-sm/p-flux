"use client";

import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import HookDemo from "../components/HookDemo";
import { HOOKS } from "../data/hooks";

// 懒加载各个 Hook 组件
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

export default function HookPage({ params }: { params: { hook: string } }) {
  // 获取当前要展示的 Hook
  const hookId = params.hook;
  const hook = HOOKS.find((h) => h.id === hookId);

  // 如果没有找到匹配的 Hook，返回 404
  if (!hook) {
    return notFound();
  }

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

  // 获取代码示例和元数据
  const getMetaAndCode = () => {
    switch (hookId) {
      case "useBoolean":
        return {
          codeExample: UseBooleanDemo.CODE_EXAMPLE,
          meta: UseBooleanDemo.HOOK_META,
        };
      case "useCounter":
        return {
          codeExample: UseCounterDemo.CODE_EXAMPLE,
          meta: UseCounterDemo.HOOK_META,
        };
      case "useDebounce":
        return {
          codeExample: UseDebounceDemo.CODE_EXAMPLE,
          meta: UseDebounceDemo.HOOK_META,
        };
      case "useLocalStorage":
        return {
          codeExample: UseLocalStorageDemo.CODE_EXAMPLE,
          meta: UseLocalStorageDemo.HOOK_META,
        };
      case "useDarkMode":
        return {
          codeExample: UseDarkModeDemo.CODE_EXAMPLE,
          meta: UseDarkModeDemo.HOOK_META,
        };
      default:
        return {
          codeExample: `// ${hook.name} 示例代码\nimport { ${hook.name} } from 'usehooks-ts';\n\nfunction MyComponent() {\n  // Hook 使用示例\n  // ...\n}`,
          meta: {
            name: hook.name,
            description: hook.description,
            category: hook.category,
            docsLink: `https://usehooks-ts.com/react-hook/${hookId}`,
          },
        };
    }
  };

  const { codeExample, meta } = getMetaAndCode();

  return (
    <HookDemo
      id={hookId}
      name={meta.name}
      description={meta.description}
      category={meta.category}
      codeExample={codeExample}
      docsLink={meta.docsLink}
      githubLink={meta.githubLink}
    >
      {renderDemo()}
    </HookDemo>
  );
}
