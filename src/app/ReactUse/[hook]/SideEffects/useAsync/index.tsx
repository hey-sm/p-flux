"use client";

import React from "react";

import { Examples } from "./Scenarios";
import { CODE_EXAMPLES } from "./NativeImplementation";
import {
  UseCase,
  TitleComparison,
  Header,
} from "@/app/ReactUse/components/exports";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// 钩子对比表格组件
function HooksComparisonTable() {
  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-4">异步钩子对比</h2>
      <Table>
        <TableHeader className="bg-slate-200">
          <TableRow>
            <TableHead className="w-[180px]">特性/Hook</TableHead>
            <TableHead>useAsync</TableHead>
            <TableHead>useAsyncRetry</TableHead>
            <TableHead>useAsyncFn</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">执行时机</TableCell>
            <TableCell>自动执行 (挂载时或依赖项变化时)</TableCell>
            <TableCell>自动执行 (挂载时或依赖项变化时)</TableCell>
            <TableCell>手动控制 (调用返回的函数时)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">失败时重试</TableCell>
            <TableCell>不会</TableCell>
            <TableCell>会 (自动或手动通过 retry 函数)</TableCell>
            <TableCell>不会</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">返回状态</TableCell>
            <TableCell className="font-mono text-sm">
              {`{ loading, error, value }`}
            </TableCell>
            <TableCell className="font-mono text-sm">
              {`{ loading, error, value, retry }`}
            </TableCell>
            <TableCell className="font-mono text-sm">
              {`[state, callback]`} <br />
              state: {`{ loading, error, value }`} <br />
              callback: 触发执行的稳定函数
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">返回的函数引用</TableCell>
            <TableCell>无需返回触发函数，因为是自动执行</TableCell>
            <TableCell>返回 retry 函数 (用于手动重试)</TableCell>
            <TableCell>返回一个稳定的执行函数 callback</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">主要应用场景</TableCell>
            <TableCell>
              组件加载时获取数据
              <br />
              依赖变化时重新获取数据
            </TableCell>
            <TableCell>数据加载可能临时失败，需要自动或手动重试</TableCell>
            <TableCell>
              用户交互触发的异步操作 (点击、提交等)
              <br />
              需要手动控制执行的时机
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">依赖项作用</TableCell>
            <TableCell>决定异步函数何时重新执行</TableCell>
            <TableCell>决定异步函数何时重新执行 (并应用重试)</TableCell>
            <TableCell>决定返回的 callback 函数引用何时变化</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default function Page() {
  // 收集所有场景标题
  const titles = Examples.map((example) => example.title);

  return (
    <div className="space-y-8">
      {/* 标题部分 */}
      <Header
        name="useAsync"
        description="React-Use 提供的 useAsync 钩子用于处理异步操作，它可以跟踪异步操作的状态（加载中、完成、错误），并提供相应的状态管理，简化异步请求处理。"
        Badges={titles}
      />

      {/* 钩子对比表格 */}
      <HooksComparisonTable />

      {/* 原生实现部分 */}
      <TitleComparison
        beforeCode={CODE_EXAMPLES.customHook}
        afterCode={CODE_EXAMPLES.hook}
      />

      {/* 场景示例部分 */}
      <div className="space-y-8 mt-8">
        <h2 className="text-xl font-semibold">使用场景 & 示例</h2>
        {Examples.map((example) => (
          <div key={example.title} id={example.title}>
            <UseCase title={example.title} codeExample={example.code}>
              <div className="p-4 border rounded-md min-h-[120px] flex items-center justify-center relative">
                {example.example}
              </div>
            </UseCase>
          </div>
        ))}
      </div>
    </div>
  );
}
