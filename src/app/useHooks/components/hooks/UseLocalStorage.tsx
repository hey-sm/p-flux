"use client";

import React, { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Delete, RefreshCw, Save } from "lucide-react";

// 用户首选项类型
interface UserPreferences {
  theme: "light" | "dark" | "system";
  fontSize: number;
  notifications: boolean;
  bio: string;
}

// 默认首选项
const defaultPreferences: UserPreferences = {
  theme: "system",
  fontSize: 16,
  notifications: true,
  bio: "",
};

export default function UseLocalStorageDemo() {
  // 使用 localStorage 存储用户首选项
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>(
    "user-preferences", // localStorage 的键名
    defaultPreferences // 默认值
  );

  // 存储最近的更改记录
  const [changeLog, setChangeLog] = useState<string[]>([]);

  // 添加更改日志
  const addToChangeLog = (message: string) => {
    setChangeLog((prev) => [message, ...prev.slice(0, 4)]);
  };

  // 更新主题
  const updateTheme = (theme: "light" | "dark" | "system") => {
    setPreferences({ ...preferences, theme });
    addToChangeLog(`主题更改为: ${theme}`);
  };

  // 更新字体大小
  const updateFontSize = (fontSize: number) => {
    setPreferences({ ...preferences, fontSize });
    addToChangeLog(`字体大小更改为: ${fontSize}px`);
  };

  // 切换通知
  const toggleNotifications = () => {
    setPreferences({
      ...preferences,
      notifications: !preferences.notifications,
    });
    addToChangeLog(`通知已${!preferences.notifications ? "开启" : "关闭"}`);
  };

  // 更新简介
  const updateBio = (bio: string) => {
    setPreferences({ ...preferences, bio });
    addToChangeLog("个人简介已更新");
  };

  // 重置为默认值
  const resetToDefault = () => {
    setPreferences(defaultPreferences);
    addToChangeLog("所有设置已重置为默认值");
  };

  // 清除存储
  const clearStorage = () => {
    localStorage.removeItem("user-preferences");
    window.location.reload(); // 刷新页面以重新初始化
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>用户首选项设置</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* 主题选择 */}
            <div className="space-y-2">
              <Label htmlFor="theme">主题</Label>
              <Select
                value={preferences.theme}
                onValueChange={(value) =>
                  updateTheme(value as "light" | "dark" | "system")
                }
              >
                <SelectTrigger id="theme">
                  <SelectValue placeholder="选择主题" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">浅色</SelectItem>
                  <SelectItem value="dark">深色</SelectItem>
                  <SelectItem value="system">跟随系统</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 字体大小 */}
            <div className="space-y-2">
              <Label htmlFor="fontSize">
                字体大小: {preferences.fontSize}px
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="fontSize"
                  type="range"
                  min="12"
                  max="24"
                  value={preferences.fontSize}
                  onChange={(e) => updateFontSize(Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm font-medium w-8">
                  {preferences.fontSize}
                </span>
              </div>
            </div>

            {/* 通知开关 */}
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">启用通知</Label>
              <Switch
                id="notifications"
                checked={preferences.notifications}
                onCheckedChange={toggleNotifications}
              />
            </div>

            {/* 个人简介 */}
            <div className="space-y-2">
              <Label htmlFor="bio">个人简介</Label>
              <Textarea
                id="bio"
                placeholder="请输入您的个人简介..."
                value={preferences.bio}
                onChange={(e) => updateBio(e.target.value)}
                rows={3}
              />
            </div>

            {/* 操作按钮 */}
            <div className="flex flex-wrap gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={resetToDefault}
                className="flex items-center gap-1"
              >
                <RefreshCw className="h-4 w-4" />
                重置为默认
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={clearStorage}
                className="flex items-center gap-1"
              >
                <Delete className="h-4 w-4" />
                清除存储
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 变更日志和存储值 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 最近的更改 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">最近的更改</CardTitle>
          </CardHeader>
          <CardContent>
            {changeLog.length > 0 ? (
              <ul className="space-y-1">
                {changeLog.map((log, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    • {log}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                暂无更改记录
              </p>
            )}
          </CardContent>
        </Card>

        {/* 存储在 localStorage 中的内容 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">localStorage 存储内容</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-muted p-2 rounded-md overflow-auto max-h-[130px]">
              {JSON.stringify(preferences, null, 2)}
            </pre>
            <p className="text-xs text-muted-foreground mt-2">
              键名: "user-preferences"
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// 代码示例，用于展示页面
export const CODE_EXAMPLE = `
import { useLocalStorage } from 'usehooks-ts';

// 为了更好的类型支持，定义接口
interface User {
  name: string;
  age: number;
  isActive: boolean;
}

function ProfileSettings() {
  // 类型为 User 的 localStorage 状态
  const [user, setUser] = useLocalStorage<User>(
    'user', // localStorage 键名
    {       // 默认值
      name: '张三',
      age: 25,
      isActive: true,
    }
  );

  // 更新用户信息
  const updateUser = () => {
    setUser({
      ...user,
      age: user.age + 1,
    });
  };

  // 清除用户信息
  const clearUser = () => {
    // 将用户信息设置为 null 会从 localStorage 中移除该项
    setUser(null);
  };

  return (
    <div>
      <p>姓名: {user.name}</p>
      <p>年龄: {user.age}</p>
      <p>状态: {user.isActive ? '活跃' : '不活跃'}</p>
      <button onClick={updateUser}>增加年龄</button>
      <button onClick={clearUser}>清除用户信息</button>
    </div>
  );
}
`;

// Hook 的元数据
export const HOOK_META = {
  name: "useLocalStorage",
  description: "在 localStorage 中持久化状态的 Hook，在页面刷新后保留状态",
  category: "存储",
  docsLink: "https://usehooks-ts.com/react-hook/use-local-storage",
  githubLink:
    "https://github.com/juliencrn/usehooks-ts/blob/master/packages/usehooks-ts/src/useLocalStorage/useLocalStorage.ts",
};
