import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
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

export default function UseHooksPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          React-use 示例集合
        </h1>
        <p className="text-lg text-muted-foreground">
          探索 React-use 库提供的实用 React Hooks，包含互动示例和代码片段。
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>状态管理类 Hooks</CardTitle>
            <CardDescription>管理组件状态的实用 Hooks</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Badge variant="outline" className="mr-2">
                  简单
                </Badge>
                <Link
                  href="/useHooks/useBoolean"
                  className="text-blue-600 hover:underline"
                >
                  useBoolean
                </Link>
              </li>
              <li className="flex items-center">
                <Badge variant="outline" className="mr-2">
                  简单
                </Badge>
                <Link
                  href="/useHooks/useCounter"
                  className="text-blue-600 hover:underline"
                >
                  useCounter
                </Link>
              </li>
              <li className="flex items-center">
                <Badge variant="outline" className="mr-2">
                  中级
                </Badge>
                <Link
                  href="/useHooks/useLocalStorage"
                  className="text-blue-600 hover:underline"
                >
                  useLocalStorage
                </Link>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" asChild>
              <Link href="/useHooks/useBoolean">
                查看详情 <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>性能优化类 Hooks</CardTitle>
            <CardDescription>优化渲染和事件处理的 Hooks</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Badge variant="outline" className="mr-2">
                  中级
                </Badge>
                <Link
                  href="/useHooks/useDebounce"
                  className="text-blue-600 hover:underline"
                >
                  useDebounce
                </Link>
              </li>
              <li className="flex items-center">
                <Badge variant="outline" className="mr-2">
                  中级
                </Badge>
                <Link
                  href="/useHooks/useThrottle"
                  className="text-blue-600 hover:underline"
                >
                  useThrottle
                </Link>
              </li>
              <li className="flex items-center">
                <Badge variant="outline" className="mr-2">
                  高级
                </Badge>
                <Link
                  href="/useHooks/useFetch"
                  className="text-blue-600 hover:underline"
                >
                  useFetch
                </Link>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" asChild>
              <Link href="/useHooks/useDebounce">
                查看详情 <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>关于 React-use</CardTitle>
          <CardDescription>高质量的 TypeScript React Hooks 库</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            React-use 是一个开源的 TypeScript React Hooks
            库，提供了大量开箱即用的 Hooks，
            帮助开发者解决常见问题，提高开发效率。所有 Hooks
            都经过类型检查和测试， 可以在生产环境中安全使用。
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <a
              href="https://github.com/streamich/react-use"
              target="_blank"
              rel="noopener noreferrer"
            >
              访问官方网站 <ArrowRightIcon className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
