"use client";

import React from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ExternalLink, Github } from "lucide-react";

interface HookDemoProps {
  id: string;
  name: string;
  description: string;
  category: string;
  children: React.ReactNode;
  codeExample: string;
  docsLink?: string;
  githubLink?: string;
}

export default function HookDemo({
  id,
  name,
  description,
  category,
  children,
  codeExample,
  docsLink,
  githubLink,
}: HookDemoProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-2">
            <Link href="/useHooks">
              <ChevronLeft className="mr-2 h-4 w-4" />
              返回首页
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Badge>{category}</Badge>
            {docsLink && (
              <a
                href={docsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline inline-flex items-center"
              >
                文档 <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            )}
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline inline-flex items-center"
              >
                源码 <Github className="ml-1 h-3 w-3" />
              </a>
            )}
          </div>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl">
            {description}
          </p>
        </div>
      </div>

      <Tabs defaultValue="demo" className="w-full">
        <TabsList>
          <TabsTrigger value="demo">示例</TabsTrigger>
          <TabsTrigger value="code">代码</TabsTrigger>
        </TabsList>
        <TabsContent value="demo" className="p-4 border rounded-md mt-2">
          <div className="max-w-3xl mx-auto">{children}</div>
        </TabsContent>
        <TabsContent value="code" className="p-4 border rounded-md mt-2">
          <pre className="p-4 bg-muted rounded-md overflow-auto max-h-[500px]">
            <code className="text-sm">{codeExample}</code>
          </pre>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>使用场景</CardTitle>
          <CardDescription>何时使用 {name} Hook</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {id === "useBoolean" && (
              <>
                <li>管理表单中的复选框、开关或可切换状态</li>
                <li>控制模态框、抽屉、折叠面板等组件的显示和隐藏</li>
                <li>简化复杂布尔值逻辑，提供更具语义的操作方法</li>
              </>
            )}
            {id === "useCounter" && (
              <>
                <li>实现计数器、步进器等需要递增/递减数值的组件</li>
                <li>管理分页控件的页码状态</li>
                <li>实现数量选择器、评分组件等</li>
              </>
            )}
            {id === "useDebounce" && (
              <>
                <li>处理搜索输入框，减少不必要的API请求</li>
                <li>窗口大小调整事件处理</li>
                <li>表单输入验证，避免频繁验证</li>
              </>
            )}
            {id === "useLocalStorage" && (
              <>
                <li>持久化用户首选项和设置</li>
                <li>保存表单状态，防止页面刷新丢失</li>
                <li>存储认证令牌和用户会话信息</li>
              </>
            )}
            {id === "useDarkMode" && (
              <>
                <li>实现应用的暗色/亮色主题切换</li>
                <li>根据用户系统偏好自动应用主题</li>
                <li>在本地存储中保存用户的主题偏好</li>
              </>
            )}
            {![
              "useBoolean",
              "useCounter",
              "useDebounce",
              "useLocalStorage",
              "useDarkMode",
            ].includes(id) && (
              <li>这个Hook适合在需要{description}的场景使用</li>
            )}
          </ul>
        </CardContent>
        <CardFooter>
          <Button variant="outline" asChild>
            <a
              href={docsLink || `https://usehooks-ts.com/react-hook/${id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              了解更多 <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
