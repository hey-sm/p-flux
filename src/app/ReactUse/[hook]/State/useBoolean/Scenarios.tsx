"use client";

import React, { useState, useEffect } from "react";
import { useBoolean } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Sun,
  Moon,
  X,
  ChevronDown,
  ChevronUp,
  LockIcon,
  UnlockIcon,
  AlertCircle,
} from "lucide-react";
import { CODE_EXAMPLES } from "./NativeImplementation";

// =====================================
// 场景演示组件
// =====================================

// 基本开关组件
function BasicToggle() {
  const { value, toggle, setTrue, setFalse } = useBoolean(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">usehooks-ts的useBoolean</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <Label htmlFor="toggle-switch">当前状态：</Label>
              <Switch
                id="toggle-switch"
                checked={value}
                onCheckedChange={toggle}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={toggle}>
                切换状态
              </Button>
              <Button variant="default" onClick={setTrue} disabled={value}>
                设为 True
              </Button>
              <Button variant="secondary" onClick={setFalse} disabled={!value}>
                设为 False
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-muted p-4 rounded-md">
        <p className="text-sm font-medium mb-2">当前状态值：</p>
        <code className="bg-primary/10 text-primary p-2 rounded-md">
          {String(value)}
        </code>
      </div>
    </div>
  );
}

// 模态框控制组件
function ModalControl() {
  const {
    value: isOpen,
    setTrue: openModal,
    setFalse: closeModal,
  } = useBoolean(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleSubmit = () => {
    // 模拟提交
    setTimeout(() => {
      closeModal();
      // 重置表单
      setFormData({ name: "", email: "" });
    }, 500);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">模态框控制示例</h3>
        <Button variant="outline" size="sm" onClick={openModal}>
          打开表单
        </Button>
      </div>

      {/* 模态框 */}
      {isOpen && (
        <div
          className="flex items-center justify-center"
          style={{ position: "relative", height: "300px" }}
        >
          <Card className="w-full max-w-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">用户信息</CardTitle>
              <Button variant="ghost" size="icon" onClick={closeModal}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">姓名</Label>
                  <input
                    id="name"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">邮箱</Label>
                  <input
                    id="email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleSubmit}>
                提交
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      <div className="bg-muted p-4 rounded-md">
        <p className="text-xs font-medium">
          模态框状态: {isOpen ? "打开" : "关闭"}
        </p>
      </div>
    </div>
  );
}

// 折叠面板组件
function CollapsiblePanel() {
  const panel1 = useBoolean(true);
  const panel2 = useBoolean(false);
  const panel3 = useBoolean(false);

  return (
    <div className="space-y-2">
      <div className="border rounded-lg overflow-hidden">
        <div
          className="p-3 flex justify-between items-center cursor-pointer bg-primary/5"
          onClick={panel1.toggle}
        >
          <h3 className="font-medium">基本用法说明</h3>
          {panel1.value ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        {panel1.value && (
          <div className="p-4 text-sm border-t">
            <p>useBoolean 提供了三个主要方法:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>toggle() - 切换布尔值</li>
              <li>setTrue() - 设置为 true</li>
              <li>setFalse() - 设置为 false</li>
            </ul>
          </div>
        )}
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div
          className="p-3 flex justify-between items-center cursor-pointer bg-primary/5"
          onClick={panel2.toggle}
        >
          <h3 className="font-medium">适用场景</h3>
          {panel2.value ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        {panel2.value && (
          <div className="p-4 text-sm border-t">
            <p>useBoolean 非常适合管理以下场景:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>模态框和抽屉的开关状态</li>
              <li>折叠面板的展开/收起</li>
              <li>表单提交状态的管理</li>
              <li>功能切换，如暗黑模式</li>
            </ul>
          </div>
        )}
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div
          className="p-3 flex justify-between items-center cursor-pointer bg-primary/5"
          onClick={panel3.toggle}
        >
          <h3 className="font-medium">与 useState 的比较</h3>
          {panel3.value ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        {panel3.value && (
          <div className="p-4 text-sm border-t">
            <p>相比于标准的 useState:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>无需编写 setState(prev =&gt; !prev) 这样的切换逻辑</li>
              <li>提供更语义化的方法 (setTrue/setFalse)</li>
              <li>代码更简洁、可读性更强</li>
            </ul>
          </div>
        )}
      </div>

      <div className="bg-muted p-4 rounded-md mt-4">
        <p className="text-xs font-medium">
          面板状态: 1:{String(panel1.value)}, 2:{String(panel2.value)}, 3:
          {String(panel3.value)}
        </p>
      </div>
    </div>
  );
}

// 主题切换组件
function ThemeToggle() {
  const {
    value: isDarkMode,
    toggle: toggleTheme,
    setValue: setDarkMode,
  } = useBoolean(false);
  const [preference, setPreference] = useState("system");

  // 检测系统主题偏好
  useEffect(() => {
    // 创建媒体查询匹配器
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    // 当偏好设置为"system"时，根据系统设置切换主题
    const updateThemeBasedOnSystem = () => {
      if (preference === "system") {
        setDarkMode(darkModeMediaQuery.matches);
      }
    };

    // 初始化时调用一次
    updateThemeBasedOnSystem();

    // 监听系统主题变化
    const changeHandler = (e: MediaQueryListEvent) => {
      if (preference === "system") {
        setDarkMode(e.matches);
      }
    };

    darkModeMediaQuery.addEventListener("change", changeHandler);

    return () => {
      darkModeMediaQuery.removeEventListener("change", changeHandler);
    };
  }, [preference, setDarkMode]);

  // 切换到特定主题设置
  const setThemePreference = (newPreference: string) => {
    setPreference(newPreference);

    if (newPreference === "light") {
      setDarkMode(false);
    } else if (newPreference === "dark") {
      setDarkMode(true);
    } else if (newPreference === "system") {
      // 立即应用系统设置
      const isDarkPreferred = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(isDarkPreferred);
    }
  };

  return (
    <div className="space-y-4">
      <Card className={isDarkMode ? "bg-slate-800 text-white" : "bg-white"}>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
                <span>当前主题: {isDarkMode ? "dark" : "light"}</span>
              </div>
              <Button
                variant={isDarkMode ? "secondary" : "default"}
                size="sm"
                onClick={toggleTheme}
              >
                切换到{isDarkMode ? "light" : "dark"}主题
              </Button>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">主题偏好</div>
              <div className="flex gap-2">
                <Button
                  variant={preference === "light" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setThemePreference("light")}
                  className={
                    isDarkMode
                      ? "bg-slate-600 hover:bg-slate-500 text-white"
                      : ""
                  }
                >
                  light
                </Button>
                <Button
                  variant={preference === "dark" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setThemePreference("dark")}
                  className={
                    isDarkMode
                      ? "bg-slate-600 hover:bg-slate-500 text-white"
                      : ""
                  }
                >
                  dark
                </Button>
                <Button
                  variant={preference === "system" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setThemePreference("system")}
                  className={
                    isDarkMode
                      ? "bg-slate-600 hover:bg-slate-500 text-white"
                      : ""
                  }
                >
                  system
                </Button>
              </div>
            </div>

            <div
              className={`p-4 rounded-md ${
                isDarkMode ? "bg-slate-700" : "bg-slate-100"
              }`}
            >
              <p className="text-sm">
                这是一个示例内容区域，可以看到主题切换的效果。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-muted p-4 rounded-md">
        <p className="text-xs font-medium">
          暗色模式: {String(isDarkMode)}, 偏好设置: {preference}, 系统偏好:{" "}
          {window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"}
        </p>
      </div>
    </div>
  );
}

// 权限控制组件
function PermissionToggle() {
  const { value: isAdmin, toggle: toggleAdmin } = useBoolean(false);
  const camera = useBoolean(true);
  const location = useBoolean(false);
  const notifications = useBoolean(true);
  const microphone = useBoolean(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {isAdmin ? <LockIcon size={16} /> : <UnlockIcon size={16} />}
          <h3 className="text-sm font-medium">
            当前模式：{isAdmin ? "管理员" : "普通用户"}
          </h3>
        </div>
        <Button variant="outline" size="sm" onClick={toggleAdmin}>
          切换到{isAdmin ? "普通用户" : "管理员"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">应用权限设置</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <Label htmlFor="camera-permission">摄像头</Label>
                <span className="text-xs text-muted-foreground">
                  允许应用使用您的摄像头
                </span>
              </div>
              <Switch
                id="camera-permission"
                checked={camera.value}
                onCheckedChange={camera.toggle}
                disabled={!isAdmin}
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <Label htmlFor="location-permission">位置信息</Label>
                <span className="text-xs text-muted-foreground">
                  允许应用获取您的位置
                </span>
              </div>
              <Switch
                id="location-permission"
                checked={location.value}
                onCheckedChange={location.toggle}
                disabled={!isAdmin}
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <Label htmlFor="notification-permission">通知</Label>
                <span className="text-xs text-muted-foreground">
                  允许应用发送通知
                </span>
              </div>
              <Switch
                id="notification-permission"
                checked={notifications.value}
                onCheckedChange={notifications.toggle}
                disabled={!isAdmin}
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <Label htmlFor="microphone-permission">麦克风</Label>
                <span className="text-xs text-muted-foreground">
                  允许应用使用您的麦克风
                </span>
              </div>
              <Switch
                id="microphone-permission"
                checked={microphone.value}
                onCheckedChange={microphone.toggle}
                disabled={!isAdmin}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          {!isAdmin && (
            <div className="flex items-center gap-2 text-sm text-amber-600">
              <AlertCircle size={16} />
              <span>您需要管理员权限才能更改这些设置</span>
            </div>
          )}
        </CardFooter>
      </Card>

      <div className="bg-muted p-4 rounded-md">
        <p className="text-xs font-medium">
          管理员模式: {String(isAdmin)}, 权限: 摄像头({String(camera.value)}),
          位置({String(location.value)}), 通知({String(notifications.value)}),
          麦克风({String(microphone.value)})
        </p>
      </div>
    </div>
  );
}

// 各种使用场景示例代码
const SCENARIO_CODE = {
  BasicToggleCode: `
import { useBoolean } from 'usehooks-ts';

function BasicToggle() {
  const { value, toggle, setTrue, setFalse } = useBoolean(false);

  return (
    <div>
      <p>当前状态: {String(value)}</p>
      <button onClick={toggle}>切换状态</button>
      <button onClick={setTrue} disabled={value}>设为 true</button>
      <button onClick={setFalse} disabled={!value}>设为 false</button>
    </div>
  );
}
`,
  ModalControlCode: `
function ModalExample() {
  const { value: isOpen, setTrue: openModal, setFalse: closeModal } = useBoolean(false);
  
  return (
    <div>
      <button onClick={openModal}>打开模态框</button>
      
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>模态框标题</h2>
            <p>这是模态框内容...</p>
            <button onClick={closeModal}>关闭</button>
          </div>
        </div>
      )}
    </div>
  );
}
`,
  CollapsiblePanelCode: `
function CollapsiblePanel() {
  const { value: isExpanded, toggle } = useBoolean(false);
  
  return (
    <div className="panel">
      <div className="panel-header" onClick={toggle}>
        <h3>面板标题</h3>
        <span>{isExpanded ? '▲' : '▼'}</span>
      </div>
      
      {isExpanded && (
        <div className="panel-content">
          <p>这是可折叠面板的内容...</p>
        </div>
      )}
    </div>
  );
}
`,
  ThemeToggleCode: `
function ThemeToggle() {
  const { value: isDarkMode, toggle: toggleTheme, setValue: setDarkMode } = useBoolean(false);
  
  // 在实际应用中，你可能需要使用 useEffect 来应用主题
  React.useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkMode);
  }, [isDarkMode]);
  
  return (
    <button onClick={toggleTheme}>
      {isDarkMode ? '切换到亮色主题' : '切换到暗色主题'}
    </button>
  );
}
`,
  PermissionToggleCode: `
function PermissionSettings() {
  const { value: isAdmin, toggle: toggleAdmin } = useBoolean(false);
  const { value: cameraEnabled, toggle: toggleCamera } = useBoolean(false);
  
  return (
    <div>
      <div>
        <p>管理员模式: {String(isAdmin)}</p>
        <button onClick={toggleAdmin}>切换管理员状态</button>
      </div>
      
      <div>
        <label>
          <input 
            type="checkbox" 
            checked={cameraEnabled} 
            onChange={toggleCamera}
            disabled={!isAdmin} 
          />
          启用摄像头
        </label>
        {!isAdmin && <p>需要管理员权限</p>}
      </div>
    </div>
  );
}
`,
};

export const Examples = [
  {
    title: "基本用法",
    example: <BasicToggle />,
    code: SCENARIO_CODE.BasicToggleCode,
  },
  {
    title: "模态框控制",
    example: <ModalControl />,
    code: SCENARIO_CODE.ModalControlCode,
  },
  {
    title: "折叠面板",
    example: <CollapsiblePanel />,
    code: SCENARIO_CODE.CollapsiblePanelCode,
  },
  {
    title: "主题切换",
    example: <ThemeToggle />,
    code: SCENARIO_CODE.ThemeToggleCode,
  },
  {
    title: "权限控制",
    example: <PermissionToggle />,
    code: SCENARIO_CODE.PermissionToggleCode,
  },
];
