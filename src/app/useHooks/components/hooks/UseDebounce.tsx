"use client";

import React, { useState, useEffect } from "react";
import { useDebounce } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export default function UseDebounceDemo() {
  // 输入值
  const [inputValue, setInputValue] = useState("");
  // 防抖延迟时间（毫秒）
  const [delay, setDelay] = useState(500);
  // 应用防抖的值
  const debouncedValue = useDebounce<string>(inputValue, delay);
  // 模拟 API 调用记录
  const [apiCalls, setApiCalls] = useState<
    Array<{ time: string; value: string }>
  >([]);

  // 模拟 API 调用
  useEffect(() => {
    // 只有当防抖值变化时才"调用 API"
    const timestamp = new Date().toLocaleTimeString();
    setApiCalls((prev) =>
      [{ time: timestamp, value: debouncedValue }, ...prev].slice(0, 5)
    ); // 只保留最近 5 次调用
  }, [debouncedValue]);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-6">
            {/* 输入框 */}
            <div className="space-y-2">
              <Label htmlFor="search-input">搜索输入框（模拟实时搜索）：</Label>
              <Input
                id="search-input"
                placeholder="输入搜索关键词..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                输入时不会立即触发 API 调用，而是等待 {delay}ms 后调用一次
              </p>
            </div>

            {/* 防抖延迟控制 */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>防抖延迟时间：</Label>
                <span className="text-sm font-medium">{delay}ms</span>
              </div>
              <Slider
                value={[delay]}
                min={0}
                max={2000}
                step={100}
                onValueChange={(value) => setDelay(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0ms（无防抖）</span>
                <span>2000ms（2秒）</span>
              </div>
            </div>

            {/* 当前状态显示 */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <Label className="text-xs">原始输入值：</Label>
                <div className="p-2 bg-muted rounded-md text-sm">
                  {inputValue || (
                    <span className="text-muted-foreground italic">无输入</span>
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">防抖后的值：</Label>
                <div className="p-2 bg-muted rounded-md text-sm">
                  {debouncedValue || (
                    <span className="text-muted-foreground italic">无输入</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API 调用记录 */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <Label>模拟 API 调用记录（只在防抖值变化时触发）：</Label>
            {apiCalls.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">
                暂无调用记录
              </p>
            ) : (
              <ul className="space-y-2">
                {apiCalls.map((call, index) => (
                  <li
                    key={index}
                    className="text-sm bg-muted/50 p-2 rounded-md"
                  >
                    <span className="font-mono text-xs">{call.time}</span>:
                    <span className="ml-2 font-medium">
                      {call.value || (
                        <span className="italic text-muted-foreground">
                          空字符串
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 代码示例，用于展示页面
export const CODE_EXAMPLE = `
import { useState } from 'react';
import { useDebounce } from 'usehooks-ts';

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  // 值将在 500ms 后更新
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
  
  // 仅当 debouncedSearchTerm 变化时触发 API 调用
  useEffect(() => {
    // 这里调用 API
    console.log('搜索 API 调用:', debouncedSearchTerm);
    // fetchSearchResults(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="搜索..."
    />
  );
}
`;

// Hook 的元数据
export const HOOK_META = {
  name: "useDebounce",
  description: "延迟更新值的 Hook，用于处理频繁变化的输入（如搜索框）",
  category: "性能",
  docsLink: "https://usehooks-ts.com/react-hook/use-debounce",
  githubLink:
    "https://github.com/juliencrn/usehooks-ts/blob/master/packages/usehooks-ts/src/useDebounce/useDebounce.ts",
};
