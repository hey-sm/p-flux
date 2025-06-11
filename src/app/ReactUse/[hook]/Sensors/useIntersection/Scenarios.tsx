"use client";

import React, { useState, useRef, useEffect } from "react";
import { useIntersection } from "react-use";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

// 基础元素可见性检测示例
function BasicVisibilityDetection() {
  const intersectionRef = useRef<HTMLDivElement>(null!);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  });

  return (
    <div className="space-y-3">
      <div
        className={`p-6 border rounded-lg transition-all duration-300 ${
          intersection && intersection.isIntersecting
            ? "bg-green-50 border-green-200 shadow-md"
            : "bg-slate-50 border-slate-200"
        }`}
        ref={intersectionRef}
      >
        <div className="text-center">
          <div
            className={`inline-block w-3 h-3 rounded-full mr-2 ${
              intersection && intersection.isIntersecting
                ? "bg-green-500"
                : "bg-slate-400"
            }`}
          ></div>
          <span className="font-medium">
            {intersection && intersection.isIntersecting
              ? "元素在视图中!"
              : "元素不在视图中"}
          </span>
          <p className="text-sm mt-2 text-slate-600">
            {intersection && intersection.isIntersecting
              ? `进入时可见度: ${Math.round(
                  intersection.intersectionRatio * 100
                )}%`
              : "滚动使元素进入视图"}
          </p>
        </div>
      </div>
    </div>
  );
}

// 无限滚动示例
function InfiniteScroll() {
  const [items, setItems] = useState(
    Array.from({ length: 5 }, (_, i) => i + 1)
  );
  const loadMoreRef = useRef<HTMLDivElement>(null!);
  const intersection = useIntersection(loadMoreRef, {
    root: null,
    rootMargin: "100px",
    threshold: 0.1,
  });

  // 当加载触发器进入视图时，添加更多项目
  useEffect(() => {
    if (intersection && intersection.isIntersecting) {
      // 模拟加载更多数据
      setTimeout(() => {
        setItems((prev) => [
          ...prev,
          ...Array.from({ length: 3 }, (_, i) => prev.length + i + 1),
        ]);
      }, 300);
    }
  }, [intersection]);

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="p-3 bg-slate-50 border-b">
        <h3 className="font-medium">无限滚动加载</h3>
        <p className="text-xs text-slate-500">向下滚动加载更多内容</p>
      </div>
      <div className="w-60 max-h-[250px] overflow-y-auto p-2">
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item}
              className="p-3 bg-white border rounded-md shadow-sm"
            >
              项目 #{item}
            </div>
          ))}
          <div
            ref={loadMoreRef}
            className="py-4 text-center text-sm text-slate-400"
          >
            {intersection && intersection.isIntersecting ? (
              <span>加载更多...</span>
            ) : (
              <span>向下滚动加载更多</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// 导出示例组件
export const Examples = [
  {
    title: "元素可见性检测",
    example: <BasicVisibilityDetection />,
    code: `import { useRef } from 'react';
import { useIntersection } from 'react-use';

const VisibilityDetection = () => {
  const intersectionRef = useRef<HTMLDivElement>(null!);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  });

  return (
    <div
      ref={intersectionRef}
      className={\`p-4 border rounded \${
        intersection && intersection.isIntersecting 
          ? "bg-green-50 border-green-200" 
          : "bg-slate-50"
      }\`}
    >
      <span>
        {intersection && intersection.isIntersecting 
          ? "元素在视图中!" 
          : "元素不在视图中"}
      </span>
    </div>
  );
};`,
  },
  {
    title: "无限滚动",
    example: <InfiniteScroll />,
    code: `import { useRef, useState, useEffect } from 'react';
import { useIntersection } from 'react-use';

const InfiniteScroll = () => {
  const [items, setItems] = useState(Array.from({ length: 5 }, (_, i) => i + 1));
  const loadMoreRef = useRef<HTMLDivElement>(null!);
  const intersection = useIntersection(loadMoreRef, {
    root: null,
    rootMargin: '100px',
    threshold: 0.1
  });

  // 当加载触发器进入视图时，添加更多项目
  useEffect(() => {
    if (intersection && intersection.isIntersecting) {
      // 模拟加载更多数据
      setTimeout(() => {
        setItems(prev => [
          ...prev, 
          ...Array.from({ length: 3 }, (_, i) => prev.length + i + 1)
        ]);
      }, 1000);
    }
  }, [intersection]);

  return (
    <div className="max-h-[250px] overflow-y-auto">
      <div>
        {items.map(item => (
          <div key={item}>项目 #{item}</div>
        ))}
        <div ref={loadMoreRef}>
          {intersection && intersection.isIntersecting 
            ? "加载更多..." 
            : "向下滚动加载更多"}
        </div>
      </div>
    </div>
  );
};`,
  },
];
