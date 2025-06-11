"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { useScroll } from "react-use";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

// 使用useScroll实现的滚动进度指示器组件
function ScrollProgressIndicator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { y } = useScroll(containerRef as React.RefObject<HTMLElement>);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 计算滚动进度百分比
    if (containerRef.current) {
      const { scrollHeight, clientHeight } = containerRef.current;
      const maxScroll = scrollHeight - clientHeight;
      const currentProgress = Math.min(100, Math.round((y / maxScroll) * 100));
      setProgress(currentProgress || 0);
    }
  }, [y]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg flex justify-between items-center">
          <span>滚动进度指示器</span>
          <span className="text-sm font-normal">{progress}%</span>
        </CardTitle>
        {/* 进度条 */}
        <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
          <div
            className="bg-blue-500 h-1 transition-all duration-100"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </CardHeader>
      <CardContent>
        <div
          ref={containerRef}
          className="h-80 overflow-auto border rounded p-4 scrollbar-thin scrollbar-thumb-gray-300"
        >
          <h3 className="text-xl font-bold mb-4">可滚动内容</h3>
          <p className="mb-4">
            这是一个使用useScroll钩子实现的滚动进度指示器示例。向下滚动以查看进度条的变化。
          </p>
          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i} className="mb-4">
              段落 {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras
              porttitor metus quis tincidunt lobortis.
            </p>
          ))}
        </div>
      </CardContent>
      <CardFooter className="text-xs text-slate-500">
        滚动内容查看进度条变化
      </CardFooter>
    </Card>
  );
}

// 使用useScroll实现的吸顶式导航栏
function StickyNavigation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const { y } = useScroll(containerRef as React.RefObject<HTMLElement>);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    if (headerRef.current) {
      // 当滚动超过100px时，导航栏变为粘性导航
      setIsSticky(y > 100);
    }
  }, [y]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">吸顶式导航栏</CardTitle>
      </CardHeader>
      <CardContent className="p-0 relative">
        <div
          ref={containerRef}
          className="h-80 overflow-auto relative scrollbar-thin scrollbar-thumb-gray-300"
        >
          {/* 主要内容区域 */}
          <div className="p-4">
            <div className="h-32 bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center rounded-lg mb-4">
              <h3 className="text-xl font-bold text-gray-700">页面头图区域</h3>
            </div>

            {/* 导航栏 */}
            <div
              ref={headerRef}
              className={`py-3 px-4 mb-4 bg-white border-b transition-all duration-200 ${
                isSticky ? "sticky top-0 z-10 shadow-md" : ""
              }`}
            >
              <div className="flex space-x-4">
                <button className="px-3 py-1 rounded-md bg-blue-100 text-blue-700 text-sm font-medium">
                  首页
                </button>
                <button className="px-3 py-1 rounded-md hover:bg-gray-100 text-sm">
                  产品
                </button>
                <button className="px-3 py-1 rounded-md hover:bg-gray-100 text-sm">
                  服务
                </button>
                <button className="px-3 py-1 rounded-md hover:bg-gray-100 text-sm">
                  关于我们
                </button>
              </div>
            </div>

            {/* 内容部分 */}
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="mb-6">
                <h4 className="text-lg font-semibold mb-2">内容部分 {i + 1}</h4>
                <p className="text-gray-600">
                  这是内容区域，滚动页面可以看到导航栏的吸顶效果。当页面向下滚动超过头图区域后，
                  导航栏会固定在页面顶部。Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit.
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-slate-500">
        向下滚动超过头图区域，导航栏将固定在顶部
      </CardFooter>
    </Card>
  );
}

// 使用useScroll实现的无限滚动列表
function InfiniteScrollList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { y } = useScroll(containerRef as React.RefObject<HTMLElement>);
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(1);
  const hasInitialLoadRun = useRef(false);

  // 模拟数据加载
  const loadMoreData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    // 模拟API请求延迟
    await new Promise((resolve) => setTimeout(resolve, 400));

    // 计算本次加载的数据起始索引
    const startIndex = (pageRef.current - 1) * 10 + 1;

    // 生成本次加载的数据
    const newItems = Array.from(
      { length: 10 },
      (_, i) => `列表项 ${startIndex + i}`
    );

    // 添加到现有数据
    setItems((prev) => [...prev, ...newItems]);

    // 更新页码和状态
    pageRef.current += 1;

    // 最多加载10页（100条）
    if (pageRef.current > 10) {
      setHasMore(false);
    }

    setLoading(false);
  }, [loading, hasMore]);

  // 初始加载 - 仅执行一次
  useEffect(() => {
    if (!hasInitialLoadRun.current) {
      hasInitialLoadRun.current = true;
      loadMoreData();
    }
  }, []); // 故意移除loadMoreData依赖，确保只执行一次

  // 监听滚动
  useEffect(() => {
    // 如果组件未挂载，则不处理滚动事件
    if (!containerRef.current) return;

    const { scrollHeight, clientHeight } = containerRef.current;

    // 当距离底部小于50px时，触发加载更多
    if (
      y > 0 &&
      scrollHeight > clientHeight &&
      scrollHeight - clientHeight - y < 50
    ) {
      if (!loading && hasMore) {
        loadMoreData();
      }
    }
  }, [y, loading, hasMore, loadMoreData]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">无限滚动列表</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          ref={containerRef}
          className="h-80 overflow-auto border rounded p-4 scrollbar-thin scrollbar-thumb-gray-300"
        >
          <div className="space-y-2">
            {items.map((item, index) => (
              <div
                key={`scroll-item-${index}`}
                className="p-4 border rounded-md bg-gray-50 hover:shadow-md transition-shadow"
              >
                {item}
              </div>
            ))}

            {loading && (
              <div className="flex justify-center items-center py-4 text-gray-500">
                加载中...
              </div>
            )}

            {!hasMore && (
              <div className="text-center py-4 text-gray-500 border-t">
                已加载全部数据
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-slate-500">
        滚动到底部自动加载更多内容 (已加载{items.length}条)
      </CardFooter>
    </Card>
  );
}

// 导出示例组件
export const Examples = [
  {
    title: "滚动进度指示器",
    example: <ScrollProgressIndicator />,
    code: `import { useRef, useState, useEffect } from 'react';
import { useScroll } from 'react-use';

const ScrollProgressIndicator = () => {
  const containerRef = useRef(null);
  const { y } = useScroll(containerRef);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 计算滚动进度百分比
    if (containerRef.current) {
      const { scrollHeight, clientHeight } = containerRef.current;
      const maxScroll = scrollHeight - clientHeight;
      const currentProgress = Math.min(100, Math.round((y / maxScroll) * 100));
      setProgress(currentProgress || 0);
    }
  }, [y]);

  return (
    <div className="relative">
      {/* 进度条 */}
      <div className="sticky top-0 z-10 w-full bg-gray-200 h-1">
        <div
          className="bg-blue-500 h-1 transition-all duration-100"
          style={{ width: \`\${progress}%\` }}
        ></div>
      </div>
      
      {/* 可滚动内容 */}
      <div
        ref={containerRef}
        className="h-80 overflow-auto p-4"
      >
        <h3 className="text-xl font-bold mb-4">可滚动内容</h3>
        <p className="mb-4">这是一个使用useScroll钩子实现的滚动进度指示器示例。向下滚动以查看进度条的变化。</p>
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i} className="mb-4">
            段落 {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        ))}
      </div>
      
      {/* 进度显示 */}
      <div className="absolute top-2 right-2 bg-white shadow rounded px-2 py-1 text-sm">
        {progress}%
      </div>
    </div>
  );
};`,
  },
  {
    title: "吸顶式导航栏",
    example: <StickyNavigation />,
    code: `import { useRef, useState, useEffect } from 'react';
import { useScroll } from 'react-use';

const StickyNavigation = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const { y } = useScroll(containerRef);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    if (headerRef.current) {
      // 当滚动超过100px时，导航栏变为粘性导航
      setIsSticky(y > 100);
    }
  }, [y]);

  return (
    <div
      ref={containerRef}
      className="h-80 overflow-auto relative"
    >
      {/* 主要内容区域 */}
      <div className="p-4">
        <div className="h-32 bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center rounded-lg mb-4">
          <h3 className="text-xl font-bold text-gray-700">页面头图区域</h3>
        </div>
        
        {/* 导航栏 */}
        <div
          ref={headerRef}
          className={\`py-3 px-4 mb-4 bg-white border-b transition-all duration-200 \${
            isSticky
              ? "sticky top-0 z-10 shadow-md"
              : ""
          }\`}
        >
          <div className="flex space-x-4">
            <button className="px-3 py-1 rounded-md bg-blue-100 text-blue-700 text-sm font-medium">首页</button>
            <button className="px-3 py-1 rounded-md hover:bg-gray-100 text-sm">产品</button>
            <button className="px-3 py-1 rounded-md hover:bg-gray-100 text-sm">服务</button>
            <button className="px-3 py-1 rounded-md hover:bg-gray-100 text-sm">关于我们</button>
          </div>
        </div>
        
        {/* 内容部分 */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="mb-6">
            <h4 className="text-lg font-semibold mb-2">内容部分 {i + 1}</h4>
            <p className="text-gray-600">
              这是内容区域，滚动页面可以看到导航栏的吸顶效果。
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};`,
  },
  {
    title: "无限滚动列表",
    example: <InfiniteScrollList />,
    code: `import { useRef, useState, useEffect, useCallback } from 'react';
import { useScroll } from 'react-use';

const InfiniteScrollList = () => {
  const containerRef = useRef(null);
  const { y } = useScroll(containerRef);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  // 完全重置组件状态
  useEffect(() => {
    // 清空所有数据并设置为初始状态
    setItems([]);
    setPage(1);
    setLoading(false);
    setHasMore(true);
    
    // 组件清理函数
    return () => {
      setItems([]);
      setPage(1);
    };
  }, []);

  // 模拟API请求数据的函数，接收页码作为参数
  const fetchData = useCallback((pageNum) => {
    return new Promise((resolve) => {
      // 模拟网络延迟
      setTimeout(() => {
        // 计算起始编号：第一页从1开始，后续页从(page-1)*10+1开始
        const startItem = (pageNum - 1) * 10 + 1;
        
        // 生成10条新数据
        const newItems = Array.from(
          { length: 10 },
          (_, i) => \`列表项 \${startItem + i}\`
        );
        
        resolve(newItems);
      }, 800);
    });
  }, []);

  // 加载更多数据
  const loadMoreItems = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    
    try {
      // 调用fetchData函数并传入当前页码
      const newItems = await fetchData(page);
      
      setItems(prev => [...prev, ...newItems]);
      setPage(p => p + 1);
      
      // 如果到达第10页，停止加载
      if (page >= 10) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("加载数据失败:", error);
    } finally {
      setLoading(false);
      if (!initialLoadDone) {
        setInitialLoadDone(true);
      }
    }
  }, [loading, hasMore, page, fetchData, initialLoadDone]);

  // 初始加载 - 只执行一次，使用全局变量标记
  useEffect(() => {
    if (!hasFetchedFirstPage) {
      hasFetchedFirstPage = true;
      loadMoreItems();
    }
  }, [loadMoreItems]);

  // 监听滚动到底部
  useEffect(() => {
    if (!containerRef.current) return;
    
    // 未滚动时不触发加载
    if (y <= 0) return;
    // 当内容高度未超过容器高度时，不触发加载
    const { scrollHeight, clientHeight } = containerRef.current;
    if (scrollHeight <= clientHeight) return;

    // 简化判断逻辑 - 当滚动到底部50px范围内时加载更多
    const isNearBottom = scrollHeight - clientHeight - y < 50;

    if (isNearBottom && !loading && hasMore) {
      loadMoreItems();
    }
  }, [y, loading, hasMore, loadMoreItems, initialLoadDone]);

  return (
    <div
      ref={containerRef}
      className="h-80 overflow-auto p-4 border rounded"
    >
      <div className="space-y-2">
        {items.map((item, index) => (
          <div 
            key={\`scroll-item-\${index}\`}
            className="p-4 border rounded-md bg-gray-50 hover:shadow-md transition-shadow"
          >
            {item}
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-center items-center py-4 text-gray-500">
            加载中...
          </div>
        )}
        
        {!hasMore && (
          <div className="text-center py-4 text-gray-500 border-t">
            已加载全部数据
          </div>
        )}
      </div>
    </div>
  );
};`,
  },
];
