"use client";

import React, { useState } from "react";
import { useCopyToClipboard } from "react-use";
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
import { Label } from "@/components/ui/label";
import {
  Copy,
  CheckCircle2,
  XCircle,
  FileText,
  Link as LinkIcon,
  Code,
  AlertCircle,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

// 基础复制示例
function BasicCopyExample() {
  const [text, setText] = useState("这是要复制的文本示例");
  const [state, copyToClipboard] = useCopyToClipboard();

  const handleCopy = () => {
    copyToClipboard(text);

    if (state.error) {
      toast.error("复制失败", {
        description: state.error.message || "无法复制到剪贴板",
        icon: <XCircle className="h-4 w-4" />,
      });
    } else if (state.value) {
      toast.success("复制成功", {
        icon: <CheckCircle2 className="h-4 w-4" />,
      });
    }
  };

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>基础文本复制</CardTitle>
          <CardDescription>复制输入框中的文本到剪贴板</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="copy-text">复制文本</Label>
            <div className="flex space-x-2">
              <Input
                id="copy-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1"
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={handleCopy}>
                      {state.value && text === state.value ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {state.value && text === state.value
                        ? "已复制!"
                        : "复制到剪贴板"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {state.value && (
            <div className="text-sm text-muted-foreground">
              上次复制的内容:{" "}
              <span className="font-mono bg-slate-100 px-1 rounded">
                {state.value}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// 链接分享示例
function ShareLinkExample() {
  const [state, copyToClipboard] = useCopyToClipboard();

  // 模拟不同类型的链接
  const links = [
    {
      id: 1,
      name: "文档链接",
      url: "https://example.com/docs/123",
      icon: <FileText size={16} />,
    },
    {
      id: 2,
      name: "分享链接",
      url: "https://example.com/share?id=abc123",
      icon: <LinkIcon size={16} />,
    },
    {
      id: 3,
      name: "API密钥",
      url: "api_key_123456789",
      icon: <Code size={16} />,
    },
  ];

  // 跟踪最后复制的链接ID
  const [lastCopied, setLastCopied] = useState<number | null>(null);

  // 处理复制操作
  const handleCopy = (id: number, url: string) => {
    copyToClipboard(url);
    setLastCopied(id);

    // 显示 toast 提示
    if (state.error) {
      toast.error("复制失败", {
        description: state.error.message || "无法复制到剪贴板",
      });
    } else {
      const link = links.find((l) => l.id === id);
      toast.success("复制成功", {
        icon: <CheckCircle2 className="h-4 w-4" />,
      });
    }

    // 1.5秒后重置复制状态
    setTimeout(() => {
      setLastCopied(null);
    }, 1500);
  };

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>分享链接</CardTitle>
          <CardDescription>快速复制各种类型的链接和引用</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {links.map((link) => (
              <div
                key={link.id}
                className="flex items-center justify-between p-3 border rounded-md"
              >
                <div className="flex items-center space-x-2">
                  {link.icon}
                  <span className="font-medium">{link.name}</span>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(link.id, link.url)}
                  className={lastCopied === link.id ? "text-green-600" : ""}
                >
                  {lastCopied === link.id ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      已复制
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      复制
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="text-xs text-slate-500">
          链接将复制到您的剪贴板供分享使用
        </CardFooter>
      </Card>
    </div>
  );
}

const CODE_EXAMPLES = {
  BasicCopyExample: `function BasicCopyExample() {
  const [text, setText] = useState('这是要复制的文本示例');
  const [state, copyToClipboard] = useCopyToClipboard();

  const handleCopy = () => {
    copyToClipboard(text);
    
    if (state.error) {
      toast.error("复制失败", {
        description: state.error.message
      });
    } else {
      toast.success("复制成功", {
        description: \`已复制: \${text}\`
      });
    }
  };

  return (
    <div>
      <h3>基础文本复制</h3>
      <div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="输入要复制的文本"
        />
        <button onClick={handleCopy}>
          复制到剪贴板
        </button>
      </div>
    </div>
  );
}`,

  ShareLinkExample: `function ShareLinkExample() {
  const [state, copyToClipboard] = useCopyToClipboard();
  
  // 模拟不同类型的链接
  const links = [
    { id: 1, name: '文档链接', url: 'https://example.com/docs/123' },
    { id: 2, name: '分享链接', url: 'https://example.com/share?id=abc123' },
    { id: 3, name: 'API密钥', url: 'api_key_123456789' },
  ];
  
  // 跟踪最后复制的链接ID
  const [lastCopied, setLastCopied] = useState(null);
  
  // 处理复制操作
  const handleCopy = (id, url) => {
    copyToClipboard(url);
    setLastCopied(id);
    
    if (state.error) {
      toast.error("复制失败");
    } else {
      const link = links.find(l => l.id === id);
      toast.success(\`已复制\${link?.name || "链接"}\`);
    }
    
    // 1.5秒后重置复制状态
    setTimeout(() => {
      setLastCopied(null);
    }, 1500);
  };
  
  return (
    <div>
      <h3>分享链接</h3>
      <div>
        {links.map((link) => (
          <div key={link.id}>
            <span>{link.name}</span>
            <button
              onClick={() => handleCopy(link.id, link.url)}
            >
              {lastCopied === link.id ? '已复制' : '复制'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}`,
};

// 导出示例组件
export const Examples = [
  {
    title: "基础文本复制",
    example: <BasicCopyExample />,
    code: CODE_EXAMPLES.BasicCopyExample,
  },
  {
    title: "分享链接复制",
    example: <ShareLinkExample />,
    code: CODE_EXAMPLES.ShareLinkExample,
  },
];
