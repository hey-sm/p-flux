"use client";

import React, { useState, useEffect } from "react";
import { useToggle } from "react-use";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  const [on, toggle] = useToggle(true);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-muted p-3 rounded-lg">
        <div className="flex items-center gap-2">
          {on ? (
            <Badge
              variant="outline"
              className="bg-green-100 text-green-800 border-green-200"
            >
              开启
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="bg-gray-100 text-gray-800 border-gray-200"
            >
              关闭
            </Badge>
          )}
          <div className="text-sm font-medium">
            {on ? "系统当前处于激活状态" : "系统当前处于休眠状态"}
          </div>
        </div>
        <Switch checked={on} onCheckedChange={toggle} />
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={toggle}
          className="flex items-center gap-1"
        >
          切换状态
        </Button>
        <Button
          variant="outline"
          onClick={() => toggle(true)}
          disabled={on}
          className="flex items-center gap-1"
        >
          <Sun className="h-4 w-4" />
          开启
        </Button>
        <Button
          variant="outline"
          onClick={() => toggle(false)}
          disabled={!on}
          className="flex items-center gap-1"
        >
          <Moon className="h-4 w-4" />
          关闭
        </Button>
      </div>
    </div>
  );
}

// 模态框控制组件
function ModalControl() {
  const [isOpen, toggle] = useToggle(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">模态框控制示例</h3>
        <Button variant="outline" size="sm" onClick={() => toggle(true)}>
          打开modal
        </Button>
      </div>

      {isOpen && (
        <Dialog open={isOpen} onOpenChange={toggle}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>模态框标题</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}

      <div className="bg-muted p-4 rounded-md">
        <p className="text-xs font-medium">
          模态框状态: {isOpen ? "打开" : "关闭"}
        </p>
      </div>
    </div>
  );
}

// 各种使用场景示例代码
const SCENARIO_CODE = {
  BasicToggleCode: `import {useToggle} from 'react-use';

const Demo = () => {
  const [on, toggle] = useToggle(true);

  return (
    <div>
      <div>{on ? 'ON' : 'OFF'}</div>
      <button onClick={toggle}>Toggle</button>
      <button onClick={() => toggle(true)}>set ON</button>
      <button onClick={() => toggle(false)}>set OFF</button>
    </div>
  );
};
`,
  ModalControlCode: `// 模态框控制组件
function ModalControl() {
  const [isOpen, toggle] = useToggle(false);

  return (
    <div>
      <Button variant="outline" size="sm" onClick={() => toggle(true)}>
        打开modal
      </Button>

      {isOpen && (
        <Dialog open={isOpen} onOpenChange={toggle}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>模态框标题</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
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
];
