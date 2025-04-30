"use client";

import React, { useState, useEffect } from "react";
import { useCookie } from "react-use";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Check, Cookie, Trash2, RefreshCw } from "lucide-react";

// 主题偏好示例
function ThemePreferenceExample() {
  const [themeCookie, updateThemeCookie, deleteThemeCookie] =
    useCookie("theme-preference");

  // 应用主题
  useEffect(() => {
    if (themeCookie) {
      document.documentElement.classList.remove("light", "dark", "system");
      document.documentElement.classList.add(themeCookie);
    }
  }, [themeCookie]);

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cookie size={18} />
            主题偏好设置
          </CardTitle>
          <CardDescription>选择并保存您偏好的主题模式</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="theme-select">选择主题</Label>
            <Select
              value={themeCookie || "system"}
              onValueChange={(value) => updateThemeCookie(value)}
            >
              <SelectTrigger id="theme-select">
                <SelectValue placeholder="选择主题模式" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">浅色模式</SelectItem>
                <SelectItem value="dark">深色模式</SelectItem>
                <SelectItem value="system">跟随系统</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between border p-3 rounded-md bg-slate-50">
            <div className="text-sm">
              <p className="font-medium">当前保存的主题:</p>
              <p>
                {themeCookie ? (
                  <Badge variant="outline">{themeCookie}</Badge>
                ) : (
                  <span className="text-slate-500">未设置</span>
                )}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={deleteThemeCookie}
              disabled={!themeCookie}
            >
              <Trash2 size={16} className="mr-1" />
              重置
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-xs text-slate-500">
          主题偏好将保存在 Cookie 中，下次访问时自动应用
        </CardFooter>
      </Card>
    </div>
  );
}

// 语言选择示例
function LanguagePreferenceExample() {
  const [langCookie, updateLangCookie, deleteLangCookie] =
    useCookie("language");
  const languages = [
    { code: "zh-CN", name: "简体中文" },
    { code: "en-US", name: "English" },
    { code: "ja-JP", name: "日本語" },
    { code: "ko-KR", name: "한국어" },
  ];

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>语言偏好设置</CardTitle>
          <CardDescription>选择您偏好的网站语言</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={langCookie === lang.code ? "default" : "outline"}
                className="justify-start"
                onClick={() => updateLangCookie(lang.code)}
              >
                {langCookie === lang.code && (
                  <Check size={16} className="mr-2 text-green-500" />
                )}
                {lang.name}
              </Button>
            ))}
          </div>

          <div className="text-sm flex items-center justify-between">
            <span>
              当前语言:{" "}
              <strong>
                {languages.find((l) => l.code === langCookie)?.name || "未设置"}
              </strong>
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={deleteLangCookie}
              disabled={!langCookie}
            >
              重置语言
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const CODE_EXAMPLES = {
  ThemePreferenceExample: `function ThemePreferenceExample() {
  const [themeCookie, updateThemeCookie, deleteThemeCookie] = useCookie("theme-preference");
  
  // 应用主题
  useEffect(() => {
    if (themeCookie) {
      document.documentElement.classList.remove("light", "dark", "system");
      document.documentElement.classList.add(themeCookie);
    }
  }, [themeCookie]);
  
  return (
    <div>
      <h3>主题偏好设置</h3>
      <select
        value={themeCookie || "system"}
        onChange={(e) => updateThemeCookie(e.target.value)}
      >
        <option value="light">浅色模式</option>
        <option value="dark">深色模式</option>
        <option value="system">跟随系统</option>
      </select>
      
      <div>
        <p>当前保存的主题: {themeCookie || "未设置"}</p>
        <button onClick={deleteThemeCookie} disabled={!themeCookie}>
          重置
        </button>
      </div>
    </div>
  );
}`,

  LanguagePreferenceExample: `function LanguagePreferenceExample() {
  const [langCookie, updateLangCookie, deleteLangCookie] = useCookie("language");
  const languages = [
    { code: "zh-CN", name: "简体中文" },
    { code: "en-US", name: "English" },
    { code: "ja-JP", name: "日本語" },
    { code: "ko-KR", name: "한국어" },
  ];
  
  return (
    <div>
      <h3>语言偏好设置</h3>
      <div>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => updateLangCookie(lang.code)}
            style={{ 
              fontWeight: langCookie === lang.code ? 'bold' : 'normal' 
            }}
          >
            {lang.name}
          </button>
        ))}
      </div>
      
      <div>
        <p>当前语言: {languages.find(l => l.code === langCookie)?.name || "未设置"}</p>
        <button onClick={deleteLangCookie} disabled={!langCookie}>
          重置语言
        </button>
      </div>
    </div>
  );
}`,
};

// 导出示例组件
export const Examples = [
  {
    title: "主题偏好存储",
    example: <ThemePreferenceExample />,
    code: CODE_EXAMPLES.ThemePreferenceExample,
  },
  {
    title: "语言偏好设置",
    example: <LanguagePreferenceExample />,
    code: CODE_EXAMPLES.LanguagePreferenceExample,
  },
];
