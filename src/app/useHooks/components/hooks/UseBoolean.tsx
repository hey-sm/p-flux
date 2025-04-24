"use client";

import React from "react";
import { useBoolean } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function UseBooleanDemo() {
  const { value, toggle, setTrue, setFalse } = useBoolean(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
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

      {/* {value && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>状态已激活</AlertTitle>
          <AlertDescription>
            useBoolean 状态当前为 true。您可以使用 setFalse() 或 toggle()
            来改变它。
          </AlertDescription>
        </Alert>
      )} */}
    </div>
  );
}

// 代码示例，用于展示页面
export const CODE_EXAMPLE = `
import { useBoolean } from 'usehooks-ts';

function MyComponent() {
  // 默认值为 false
  const { value, toggle, setTrue, setFalse } = useBoolean(false);

  return (
    <div>
      <p>当前值: {value.toString()}</p>
      <button onClick={toggle}>切换</button>
      <button onClick={setTrue}>设为 true</button>
      <button onClick={setFalse}>设为 false</button>
    </div>
  );
}
`;

// Hook 的元数据
export const HOOK_META = {
  name: "useBoolean",
  description:
    "用于简化布尔状态管理的 Hook，提供 toggle、setTrue、setFalse 等便捷方法",
  category: "状态",
  docsLink: "https://usehooks-ts.com/react-hook/use-boolean",
  githubLink:
    "https://github.com/juliencrn/usehooks-ts/blob/master/packages/usehooks-ts/src/useBoolean/useBoolean.ts",
};
