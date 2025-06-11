"use client";

import React, { useState, useEffect } from "react";
import { useDebounce } from "react-use";
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
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Search, Clock, Sparkles } from "lucide-react";

// 模拟数据
const MOCK_ITEMS = [
  "React",
  "Vue",
  "Angular",
  "Svelte",
  "NextJS",
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
  "TailwindCSS",
  "Redux",
  "Mobx",
  "Zustand",
  "GraphQL",
  "REST API",
];

// 搜索输入防抖示例
function SearchInputExample() {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [debounceTime, setDebounceTime] = useState(500);

  // 使用 useDebounce 钩子，输入停止后执行搜索
  useDebounce(
    () => {
      if (inputValue) {
        // 模拟API调用
        setIsSearching(true);

        // 模拟网络延迟
        setTimeout(() => {
          // 过滤结果
          const filteredResults = MOCK_ITEMS.filter((item) =>
            item.toLowerCase().includes(inputValue.toLowerCase())
          );
          setResults(filteredResults);
          setDebouncedValue(inputValue);
          setIsSearching(false);

          // 显示搜索完成提示
          toast.success(`查询完成: "${inputValue}"`, {
            icon: <Search size={16} />,
          });
        }, 800);
      } else {
        setResults([]);
        setDebouncedValue("");
      }
    },
    debounceTime, // 防抖延迟时间 (ms)
    [inputValue, debounceTime] // 依赖项
  );

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search size={18} />
            防抖搜索输入
          </CardTitle>
          <CardDescription>
            输入停止 {debounceTime}ms 后才执行搜索，减少不必要的API调用
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search-input">搜索技术</Label>
            <Input
              id="search-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="开始输入搜索内容..."
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="debounce-time">防抖延迟: {debounceTime}ms</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDebounceTime(500)}
              >
                重置
              </Button>
            </div>
            <Slider
              id="debounce-time"
              value={[debounceTime]}
              min={100}
              max={2000}
              step={100}
              onValueChange={(value) => setDebounceTime(value[0])}
            />
          </div>

          <div className="rounded-md border p-3">
            <div className="flex items-center text-sm font-medium mb-2">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>状态:</span>
              {isSearching ? (
                <Badge variant="outline" className="ml-2 bg-yellow-50">
                  搜索中...
                </Badge>
              ) : debouncedValue ? (
                <Badge variant="outline" className="ml-2 bg-green-50">
                  搜索完成: {debouncedValue}
                </Badge>
              ) : (
                <Badge variant="outline" className="ml-2">
                  等待输入
                </Badge>
              )}
            </div>

            <div className="pt-2">
              <p className="text-sm font-medium mb-2">
                结果 ({results.length}):
              </p>
              {results.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {results.map((item) => (
                    <Badge key={item} variant="secondary">
                      {item}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">无匹配结果</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const CODE_EXAMPLES = {
  SearchInputExample: `function SearchInputExample() {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [debounceTime, setDebounceTime] = useState(500);

  // 使用 useDebounce 钩子，输入停止后执行搜索
  useDebounce(
    () => {
      if (inputValue) {
        // 模拟API调用
        setIsSearching(true);
        
        // 模拟网络延迟
        setTimeout(() => {
          // 过滤结果
          const filteredResults = MOCK_ITEMS.filter(item =>
            item.toLowerCase().includes(inputValue.toLowerCase())
          );
          setResults(filteredResults);
          setDebouncedValue(inputValue);
          setIsSearching(false);
          
          toast.success(\`查询完成: "\${inputValue}"\`);
        }, 800);
      } else {
        setResults([]);
        setDebouncedValue("");
      }
    },
    debounceTime, // 防抖延迟时间 (ms)
    [inputValue, debounceTime] // 依赖项
  );

  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="搜索..."
      />
      
      <label>
        防抖延迟: {debounceTime}ms
        <input
          type="range"
          min={100}
          max={2000}
          step={100}
          value={debounceTime}
          onChange={(e) => setDebounceTime(Number(e.target.value))}
        />
      </label>
      
      <div>
        状态: {isSearching ? "搜索中..." : "就绪"}
        {debouncedValue && <div>搜索词: {debouncedValue}</div>}
      </div>
      
      <div>
        结果 ({results.length}):
        <ul>
          {results.map(item => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </div>
  );
}`,
};

// 导出示例组件
export const Examples = [
  {
    title: "搜索输入防抖",
    example: <SearchInputExample />,
    code: CODE_EXAMPLES.SearchInputExample,
  },
];
