"use client";

import React, { useState } from "react";
import { useBeforeUnload } from "react-use";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Save, ThumbsUp } from "lucide-react";

// 基础表单场景
function BasicFormExample() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isDirty, setIsDirty] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // 如果表单被修改后未保存，应用 useBeforeUnload
  useBeforeUnload(isDirty && !isSaved, "您有未保存的表单数据，确定要离开吗？");

  // 处理输入变化
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setIsDirty(true);
    setIsSaved(false);
  };

  // 表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 模拟保存操作
    setTimeout(() => {
      setIsDirty(false);
      setIsSaved(true);
    }, 500);
  };

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>联系表单</CardTitle>
          <CardDescription>尝试填写表单后刷新页面，会看到提示</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">姓名</Label>
              <Input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="请输入姓名"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="your@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">留言内容</Label>
              <Textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder="请输入您的留言..."
                rows={3}
              />
            </div>
            <Button type="submit" className="w-full flex items-center gap-2">
              <Save size={16} /> 保存表单
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {isDirty && !isSaved && (
            <div className="flex items-center text-amber-500 gap-2 text-sm">
              <AlertTriangle size={16} />
              <span>您有未保存的更改</span>
            </div>
          )}
          {isSaved && (
            <div className="flex items-center text-green-500 gap-2 text-sm">
              <ThumbsUp size={16} />
              <span>表单已保存</span>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

const CODE_EXAMPLES = {
  BasicFormExample: `function BasicFormExample() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isDirty, setIsDirty] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // 如果表单被修改后未保存，应用 useBeforeUnload
  useBeforeUnload(
    isDirty && !isSaved, 
    "您有未保存的表单数据，确定要离开吗？"
  );

  const handleChange = (e) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setIsDirty(true);
    setIsSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 模拟保存操作
    setTimeout(() => {
      setIsDirty(false);
      setIsSaved(true);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formState.name}
        onChange={handleChange}
        placeholder="姓名"
      />
      {/* 其他表单字段... */}
      <button type="submit">保存表单</button>
      {isDirty && !isSaved && <div>您有未保存的更改</div>}
    </form>
  );
}`,
};

// 导出示例组件
export const Examples = [
  {
    title: "表单离开保护",
    example: <BasicFormExample />,
    code: CODE_EXAMPLES.BasicFormExample,
  },
];
