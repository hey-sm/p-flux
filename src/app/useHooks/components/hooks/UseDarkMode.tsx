"use client";

import React from "react";
import { useDarkMode } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SunIcon, MoonIcon, MonitorIcon } from "lucide-react";

export default function UseDarkModeDemo() {
  const { isDarkMode, toggle, enable, disable } = useDarkMode();

  return (
    <div className="space-y-6">
      {/* 主题预览 */}
      <div className="grid grid-cols-2 gap-4">
        <Card className={isDarkMode ? "bg-gray-900 text-white" : "bg-white"}>
          <CardContent className="p-6 flex flex-col items-center justify-center gap-2">
            <div className="rounded-full bg-primary/20 p-3">
              <MoonIcon className="h-6 w-6 text-primary" />
            </div>
            <p className="font-medium text-lg">暗色模式</p>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-300" : "text-gray-500"
              }`}
            >
              {isDarkMode ? "当前激活" : "未激活"}
            </p>
          </CardContent>
        </Card>

        <Card className={!isDarkMode ? "bg-white" : "bg-gray-900 text-white"}>
          <CardContent className="p-6 flex flex-col items-center justify-center gap-2">
            <div className="rounded-full bg-primary/20 p-3">
              <SunIcon className="h-6 w-6 text-primary" />
            </div>
            <p className="font-medium text-lg">亮色模式</p>
            <p
              className={`text-sm ${
                !isDarkMode ? "text-gray-500" : "text-gray-300"
              }`}
            >
              {!isDarkMode ? "当前激活" : "未激活"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 控制选项 */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label
                htmlFor="dark-mode-toggle"
                className="flex items-center gap-2"
              >
                <span>暗色模式</span>
                <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                  {isDarkMode ? "开启" : "关闭"}
                </span>
              </Label>
              <Switch
                id="dark-mode-toggle"
                checked={isDarkMode}
                onCheckedChange={toggle}
              />
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Button
                variant={isDarkMode ? "default" : "outline"}
                size="sm"
                onClick={enable}
                disabled={isDarkMode}
                className="flex items-center gap-1.5"
              >
                <MoonIcon className="h-4 w-4" />
                开启暗色模式
              </Button>

              <Button
                variant={!isDarkMode ? "default" : "outline"}
                size="sm"
                onClick={disable}
                disabled={!isDarkMode}
                className="flex items-center gap-1.5"
              >
                <SunIcon className="h-4 w-4" />
                开启亮色模式
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={toggle}
                className="flex items-center gap-1.5"
              >
                <MonitorIcon className="h-4 w-4" />
                切换模式
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 信息区域 */}
      <div className="bg-muted p-4 rounded-md">
        <h3 className="text-sm font-medium mb-2">工作原理</h3>
        <p className="text-sm text-muted-foreground">
          useDarkMode 使用 localStorage 存储用户的主题偏好，并会自动对 HTML
          文档应用
          <code className="px-1 rounded bg-muted-foreground/20">dark</code> 类。
          它也会监听系统主题变化，并尝试检测用户的颜色模式偏好。
        </p>
      </div>
    </div>
  );
}

// 代码示例，用于展示页面
export const CODE_EXAMPLE = `
import { useDarkMode } from 'usehooks-ts';

function ThemeToggler() {
  // 提供 isDarkMode 状态和控制函数
  const { isDarkMode, toggle, enable, disable } = useDarkMode();

  return (
    <div>
      <p>当前主题: {isDarkMode ? '暗色' : '亮色'}</p>
      
      <button onClick={toggle}>
        切换主题
      </button>
      
      <button onClick={enable} disabled={isDarkMode}>
        启用暗色模式
      </button>
      
      <button onClick={disable} disabled={!isDarkMode}>
        启用亮色模式
      </button>
    </div>
  );
}
`;

// Hook 的元数据
export const HOOK_META = {
  name: "useDarkMode",
  description: "管理暗色模式状态的 Hook，与系统主题偏好集成",
  category: "UI",
  docsLink: "https://usehooks-ts.com/react-hook/use-dark-mode",
  githubLink:
    "https://github.com/juliencrn/usehooks-ts/blob/master/packages/usehooks-ts/src/useDarkMode/useDarkMode.ts",
};
