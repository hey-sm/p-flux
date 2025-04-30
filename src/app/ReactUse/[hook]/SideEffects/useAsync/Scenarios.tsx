"use client";

import React, { useState } from "react";
import { useAsync } from "react-use";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// 基础数据加载示例
function BasicAsync() {
  const state = useAsync(async () => {
    // 模拟 API 请求
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return { data: "这是从API获取的数据" };
  }, []);

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>基础数据加载</CardTitle>
        </CardHeader>
        <CardContent>
          {state.loading && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <span>数据加载中...</span>
            </div>
          )}
          {state.error && (
            <div className="text-red-500 p-4">
              错误: {state.error.message || "未知错误"}
            </div>
          )}
          {state.value && (
            <div className="p-4 bg-slate-50 rounded-md">
              <p className="font-medium">API 返回结果:</p>
              <p className="mt-2 text-slate-700">{state.value.data}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// 手动触发异步请求示例
function ManualAsync() {
  const [id, setId] = useState(1);

  const state = useAsync(async () => {
    // 模拟 API 请求
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // 根据不同ID返回不同数据
    if (id === 1) return { name: "产品A", price: 199 };
    if (id === 2) return { name: "产品B", price: 299 };
    return { name: "产品C", price: 399 };
  }, [id]); // 依赖于id变化

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>手动触发异步请求</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Button
              onClick={() => setId(1)}
              variant={id === 1 ? "default" : "outline"}
            >
              产品 1
            </Button>
            <Button
              onClick={() => setId(2)}
              variant={id === 2 ? "default" : "outline"}
            >
              产品 2
            </Button>
            <Button
              onClick={() => setId(3)}
              variant={id === 3 ? "default" : "outline"}
            >
              产品 3
            </Button>
          </div>

          {state.loading && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              <span>加载中...</span>
            </div>
          )}
          {state.value && (
            <div className="p-4 bg-slate-50 rounded-md">
              <p className="font-medium text-lg">{state.value.name}</p>
              <p className="mt-1 text-green-600">¥{state.value.price}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// 错误处理示例
function ErrorHandlingAsync() {
  const [shouldFail, setShouldFail] = useState(false);

  const state = useAsync(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (shouldFail) {
      throw new Error("请求失败，服务器返回错误");
    }

    return { status: "success", message: "请求成功完成" };
  }, [shouldFail]);

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>错误处理演示</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Button
              onClick={() => setShouldFail(!shouldFail)}
              variant={shouldFail ? "destructive" : "default"}
            >
              {shouldFail ? "请求设置为失败" : "请求设置为成功"}
            </Button>
          </div>

          {state.loading && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              <span>正在处理请求...</span>
            </div>
          )}
          {state.error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
              <p className="font-medium">请求失败</p>
              <p className="mt-1 text-sm">{state.error.message}</p>
            </div>
          )}
          {state.value && !state.loading && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-md text-green-600">
              <p className="font-medium">{state.value.status}</p>
              <p className="mt-1">{state.value.message}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

const CODE_EXAMPLES = {
  BasicAsync: `const BasicAsync = () => {
  const state = useAsync(async () => {
    // 模拟 API 请求
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { data: "这是从API获取的数据" };
  }, []);

  return (
    <div>
      {state.loading && <div>数据加载中...</div>}
      {state.error && <div>错误: {state.error.message}</div>}
      {state.value && (
        <div>
          <p>API 返回结果:</p>
          <p>{state.value.data}</p>
        </div>
      )}
    </div>
  );
};`,

  ManualAsync: `const ManualAsync = () => {
  const [id, setId] = useState(1);

  const state = useAsync(async () => {
    // 模拟 API 请求
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 根据不同ID返回不同数据
    if (id === 1) return { name: "产品A", price: 199 };
    if (id === 2) return { name: "产品B", price: 299 };
    return { name: "产品C", price: 399 };
  }, [id]); // 依赖于id变化

  return (
    <div>
      <div>
        <button onClick={() => setId(1)}>产品 1</button>
        <button onClick={() => setId(2)}>产品 2</button>
        <button onClick={() => setId(3)}>产品 3</button>
      </div>

      {state.loading && <div>加载中...</div>}
      {state.value && (
        <div>
          <p>{state.value.name}</p>
          <p>¥{state.value.price}</p>
        </div>
      )}
    </div>
  );
};`,

  ErrorHandlingAsync: `const ErrorHandlingAsync = () => {
  const [shouldFail, setShouldFail] = useState(false);

  const state = useAsync(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (shouldFail) {
      throw new Error("请求失败，服务器返回错误");
    }
    
    return { status: "success", message: "请求成功完成" };
  }, [shouldFail]);

  return (
    <div>
      <button onClick={() => setShouldFail(!shouldFail)}>
        {shouldFail ? "请求设置为失败" : "请求设置为成功"}
      </button>

      {state.loading && <div>正在处理请求...</div>}
      {state.error && (
        <div>
          <p>请求失败</p>
          <p>{state.error.message}</p>
        </div>
      )}
      {state.value && !state.loading && (
        <div>
          <p>{state.value.status}</p>
          <p>{state.value.message}</p>
        </div>
      )}
    </div>
  );
};`,
};

// 导出示例组件
export const Examples = [
  {
    title: "基础数据加载",
    example: <BasicAsync />,
    code: CODE_EXAMPLES.BasicAsync,
  },
  {
    title: "手动触发异步请求",
    example: <ManualAsync />,
    code: CODE_EXAMPLES.ManualAsync,
  },
  {
    title: "错误处理演示",
    example: <ErrorHandlingAsync />,
    code: CODE_EXAMPLES.ErrorHandlingAsync,
  },
];
