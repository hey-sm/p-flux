"use client";

import React, { useState, useEffect } from "react";
import { useObservable } from "react-use";
import {
  interval,
  of,
  from,
  BehaviorSubject,
  Observable,
  combineLatest,
} from "rxjs";
import {
  map,
  switchMap,
  debounceTime,
  distinctUntilChanged,
  scan,
  startWith,
  delay,
  mergeMap,
  filter,
} from "rxjs/operators";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react";

// =====================================
// 场景演示组件
// =====================================

// 股票价格模拟器
function StockPriceExample() {
  interface StockData {
    symbol: string;
    price: number;
    change: number;
    volume: number;
  }

  // 初始股票数据
  const initialStocks: StockData[] = [
    { symbol: "AAPL", price: 150.0, change: 0, volume: 1000 },
    { symbol: "GOOGL", price: 2800.0, change: 0, volume: 500 },
    { symbol: "MSFT", price: 300.0, change: 0, volume: 800 },
    { symbol: "AMZN", price: 3400.0, change: 0, volume: 600 },
  ];

  // 创建模拟股票数据流
  const stockUpdates$ = React.useMemo(() => {
    return interval(2000).pipe(
      scan((stocks: StockData[]) => {
        return stocks.map((stock) => {
          // 随机价格变动 (-2% to +2%)
          const changePercent = (Math.random() * 4 - 2) / 100;
          const newPrice = Number(
            (stock.price * (1 + changePercent)).toFixed(2)
          );
          const priceChange = Number((newPrice - stock.price).toFixed(2));

          // 随机成交量变化
          const volumeChange = Math.floor(Math.random() * 200) - 100;

          return {
            ...stock,
            price: newPrice,
            change: priceChange,
            volume: Math.max(0, stock.volume + volumeChange),
          };
        });
      }, initialStocks),
      startWith(initialStocks)
    );
  }, []);

  // 使用useObservable订阅股票数据
  const stocks = useObservable(stockUpdates$, initialStocks);

  // 计算市场整体趋势
  const marketTrend =
    stocks.reduce((sum, stock) => sum + stock.change, 0) > 0 ? "up" : "down";

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>实时股票行情</CardTitle>
          <Badge
            variant={marketTrend === "up" ? "default" : "destructive"}
            className="flex items-center"
          >
            {marketTrend === "up" ? (
              <>
                <ChevronUpIcon className="h-3 w-3 mr-1" />
                上涨
              </>
            ) : (
              <>
                <ChevronDownIcon className="h-3 w-3 mr-1" />
                下跌
              </>
            )}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">代码</th>
                <th className="text-right py-3 px-4">价格</th>
                <th className="text-right py-3 px-4">涨跌</th>
                <th className="text-right py-3 px-4">成交量</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr key={stock.symbol} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium">{stock.symbol}</td>
                  <td className="text-right py-3 px-4">
                    ${stock.price.toFixed(2)}
                  </td>
                  <td
                    className={`text-right py-3 px-4 ${
                      stock.change > 0
                        ? "text-green-600"
                        : stock.change < 0
                        ? "text-red-600"
                        : ""
                    }`}
                  >
                    {stock.change > 0 ? "+" : ""}
                    {stock.change.toFixed(2)}
                  </td>
                  <td className="text-right py-3 px-4">{stock.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        数据每2秒自动更新，模拟真实股票市场波动
      </CardFooter>
    </Card>
  );
}

// 鼠标跟踪器组件
function MouseTrackerExample() {
  interface MousePosition {
    x: number;
    y: number;
  }

  // 创建鼠标位置的Subject
  const mouseMove$ = React.useMemo(
    () => new BehaviorSubject<MousePosition>({ x: 0, y: 0 }),
    []
  );

  // 设置鼠标移动事件监听
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseMove$.next({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseMove$]);

  // 处理鼠标位置数据流
  const smoothMousePosition$ = React.useMemo(() => {
    return mouseMove$.pipe(
      // 移除debounceTime，直接使用distinctUntilChanged提高响应速度
      distinctUntilChanged(
        (prev, curr) => prev.x === curr.x && prev.y === curr.y
      )
    );
  }, [mouseMove$]);

  // 使用useObservable订阅鼠标位置
  const mousePosition = useObservable(smoothMousePosition$, { x: 0, y: 0 });

  // 计算位置百分比（用于样式）
  const xPercent =
    (mousePosition.x /
      (typeof window !== "undefined" ? window.innerWidth : 100)) *
    100;
  const yPercent =
    (mousePosition.y /
      (typeof window !== "undefined" ? window.innerHeight : 100)) *
    100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>响应式鼠标跟踪器</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className="relative h-80 border rounded-md bg-gradient-to-br from-blue-50 to-indigo-50"
          style={{ overflow: "hidden" }}
        >
          {/* 跟踪点 */}
          <div
            className="absolute w-8 h-8 rounded-full bg-blue-500/20 border-2 border-blue-500 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center"
            style={{
              left: `${xPercent}%`,
              top: `${yPercent}%`,
              // 移除transition延迟，提高跟踪响应速度
              transition: "none",
            }}
          >
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          </div>

          {/* 坐标显示 */}
          <div className="absolute bottom-2 right-2 bg-white/80 rounded-md px-3 py-1 text-xs font-mono">
            x: {mousePosition.x.toFixed(0)}, y: {mousePosition.y.toFixed(0)}
          </div>

          <div className="absolute inset-0 flex items-center justify-center text-blue-500/30 pointer-events-none">
            在此区域内移动鼠标
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        实时响应鼠标移动，使用debounceTime平滑光标跟踪
      </CardFooter>
    </Card>
  );
}

// 各种使用场景示例代码
const SCENARIO_CODE = {
  MouseTrackerCode: `import { useObservable } from 'react-use';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { useState, useEffect, useMemo } from 'react';

function MouseTracker() {
  // 创建鼠标位置Subject
  const mouseMove$ = useMemo(() => 
    new BehaviorSubject({ x: 0, y: 0 }), 
  []);
  
  // 设置鼠标移动事件监听
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseMove$.next({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseMove$]);
  
  // 平滑鼠标移动
  const smoothMousePosition$ = useMemo(() => {
    return mouseMove$.pipe(
      debounceTime(10),
      distinctUntilChanged((prev, curr) => 
        prev.x === curr.x && prev.y === curr.y
      )
    );
  }, [mouseMove$]);
  
  // 使用useObservable订阅鼠标位置
  const position = useObservable(smoothMousePosition$, { x: 0, y: 0 });
  
  return (
    <div>
      <div style={{ 
        position: 'absolute',
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: 'blue'
      }} />
      <p>坐标: x={position.x}, y={position.y}</p>
    </div>
  );
}
`,
  StockPriceCode: `import { useObservable } from 'react-use';
import { interval } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';
import { useMemo } from 'react';

function StockTracker() {
  // 初始股票数据
  const initialStocks = [
    { symbol: 'AAPL', price: 150 },
    { symbol: 'GOOGL', price: 2800 },
    { symbol: 'MSFT', price: 300 }
  ];
  
  // 创建模拟股票更新流
  const stockUpdates$ = useMemo(() => {
    return interval(1000).pipe(
      scan(stocks => {
        return stocks.map(stock => ({
          ...stock,
          price: stock.price * (1 + (Math.random() * 0.06 - 0.03))
        }));
      }, initialStocks),
      startWith(initialStocks)
    );
  }, []);
  
  // 使用useObservable订阅股票数据
  const stocks = useObservable(stockUpdates$, initialStocks);
  
  return (
    <div>
      <h2>股票行情</h2>
      <table>
        <thead>
          <tr>
            <th>代码</th>
            <th>价格</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.symbol}>
              <td>{stock.symbol}</td>
              <td>\${stock.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
`,
};

export const Examples = [
  {
    title: "鼠标跟踪器",
    example: <MouseTrackerExample />,
    code: SCENARIO_CODE.MouseTrackerCode,
  },
  {
    title: "股票价格模拟器",
    example: <StockPriceExample />,
    code: SCENARIO_CODE.StockPriceCode,
  },
];
