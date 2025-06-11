"use client";

import React, { useState, useEffect } from "react";
import { useCounter } from "react-use";
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
import { PlusIcon, MinusIcon, RotateCcwIcon, StarIcon } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { CODE_EXAMPLES } from "./NativeImplementation";

// =====================================
// 场景演示组件
// =====================================

// 基本计数器组件
function BasicCounter() {
  const [count, { inc, dec, reset, set }] = useCounter(0);
  const [step, setStep] = React.useState(1);

  // 步长增减函数 - 使用 set 直接更新值
  const handleIncrement = () => {
    set(count + step);
  };

  const handleDecrement = () => {
    set(count - step);
  };

  const handleSetCount = (value: number) => set(value);
  const handleStepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setStep(isNaN(value) ? 1 : value);
  };

  return (
    <div>
      <div className="flex flex-col gap-6">
        {/* 显示当前计数 */}
        <div className="flex items-center justify-center">
          <div className="text-6xl font-semibold w-20 text-center">{count}</div>
        </div>

        {/* 控制按钮 */}
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleDecrement}
            title={`减少 ${step}`}
          >
            <MinusIcon className="h-4 w-4" />
          </Button>

          <Button
            variant="default"
            size="icon"
            onClick={() => reset()}
            title="重置"
          >
            <RotateCcwIcon className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleIncrement}
            title={`增加 ${step}`}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* 步长控制 */}
        <div className="space-y-2">
          <div className="text-sm font-medium">步长</div>
          <div className="flex items-center gap-2">
            <Slider
              value={[step]}
              min={1}
              max={10}
              step={1}
              onValueChange={(value) => setStep(value[0])}
            />
            <Input
              type="number"
              value={step}
              onChange={handleStepChange}
              className="w-20"
              min={1}
            />
          </div>
        </div>

        {/* 直接设置值 */}
        <div className="space-y-2">
          <div className="text-sm font-medium">直接设置值</div>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={count}
              onChange={(e) => handleSetCount(parseInt(e.target.value) || 0)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="bg-muted p-3 rounded-md mt-4">
        <p className="text-xs font-medium">
          当前状态：count: {count}, step: {step}
        </p>
      </div>
    </div>
  );
}

// 分页控件
function PaginationExample() {
  const totalPages = 10;
  const [currentPage, { set: setPage }] = useCounter(1);

  // 确保页码在有效范围内
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setPage(page);
    }
  };

  // 生成页码按钮
  const renderPageButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // 第一页
    buttons.push(
      <Button
        key="first"
        variant={currentPage === 1 ? "default" : "outline"}
        size="sm"
        onClick={() => goToPage(1)}
        disabled={currentPage === 1}
      >
        1
      </Button>
    );

    // 省略号
    if (startPage > 2) {
      buttons.push(
        <div key="dots1" className="px-2">
          ...
        </div>
      );
    }

    // 中间页码
    for (
      let i = Math.max(2, startPage);
      i <= Math.min(endPage, totalPages - 1);
      i++
    ) {
      buttons.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="sm"
          onClick={() => goToPage(i)}
        >
          {i}
        </Button>
      );
    }

    // 省略号
    if (endPage < totalPages - 1) {
      buttons.push(
        <div key="dots2" className="px-2">
          ...
        </div>
      );
    }

    // 最后一页
    if (totalPages > 1) {
      buttons.push(
        <Button
          key="last"
          variant={currentPage === totalPages ? "default" : "outline"}
          size="sm"
          onClick={() => goToPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          {totalPages}
        </Button>
      );
    }

    return buttons;
  };

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            上一页
          </Button>

          <div className="flex items-center gap-1">{renderPageButtons()}</div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            下一页
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">跳转到：</span>
          <Input
            type="number"
            min={1}
            max={totalPages}
            value={currentPage}
            onChange={(e) => {
              const page = parseInt(e.target.value);
              if (!isNaN(page)) {
                goToPage(page);
              }
            }}
            className="w-16 h-8"
          />
          <span className="text-sm text-muted-foreground">/ {totalPages}</span>
        </div>
      </div>

      <div className="bg-muted p-3 rounded-md mt-4">
        <p className="text-xs font-medium">
          当前页码：{currentPage} / {totalPages}
        </p>
      </div>
    </>
  );
}

// 商品数量选择器
function QuantitySelector() {
  const [quantity1, { inc: inc1, dec: dec1, set: setQuantity1 }] =
    useCounter(1);
  const [quantity2, { inc: inc2, dec: dec2, set: setQuantity2 }] =
    useCounter(1);
  const [price1] = useState(99.9);
  const [price2] = useState(199.5);
  const maxQuantity = 10;

  const handleDecrement1 = () => {
    if (quantity1 > 1) {
      dec1();
    }
  };

  const handleIncrement1 = () => {
    if (quantity1 < maxQuantity) {
      inc1();
    }
  };

  const handleQuantityChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= maxQuantity) {
      setQuantity1(value);
    }
  };

  const handleDecrement2 = () => {
    if (quantity2 > 1) {
      dec2();
    }
  };

  const handleIncrement2 = () => {
    if (quantity2 < maxQuantity) {
      inc2();
    }
  };

  const handleQuantityChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= maxQuantity) {
      setQuantity2(value);
    }
  };

  // 计算总价
  const totalPrice = price1 * quantity1 + price2 * quantity2;

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* 商品1 */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2">
            <div className="w-14 h-14 bg-slate-100 rounded-md flex items-center justify-center text-slate-400 text-xs">
              手表图
            </div>
            <div>
              <h4 className="text-sm font-medium">智能手表 Pro</h4>
              <p className="text-xs text-muted-foreground">黑色 / 42mm</p>
            </div>
          </div>
          <div className="font-semibold">¥ {price1.toFixed(2)}</div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm">数量：</div>
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={handleDecrement1}
              disabled={quantity1 <= 1}
            >
              <MinusIcon className="h-3 w-3" />
            </Button>

            <Input
              type="number"
              value={quantity1}
              onChange={handleQuantityChange1}
              className="h-8 w-12 border-0 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              min={1}
              max={maxQuantity}
            />

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={handleIncrement1}
              disabled={quantity1 >= maxQuantity}
            >
              <PlusIcon className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* 商品2 */}
        <div className="flex items-center justify-between border-b pb-4 pt-4">
          <div className="flex items-center gap-2">
            <div className="w-14 h-14 bg-slate-100 rounded-md flex items-center justify-center text-slate-400 text-xs">
              耳机图
            </div>
            <div>
              <h4 className="text-sm font-medium">无线耳机 Mini</h4>
              <p className="text-xs text-muted-foreground">白色 / 主动降噪</p>
            </div>
          </div>
          <div className="font-semibold">¥ {price2.toFixed(2)}</div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm">数量：</div>
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={handleDecrement2}
              disabled={quantity2 <= 1}
            >
              <MinusIcon className="h-3 w-3" />
            </Button>

            <Input
              type="number"
              value={quantity2}
              onChange={handleQuantityChange2}
              className="h-8 w-12 border-0 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              min={1}
              max={maxQuantity}
            />

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={handleIncrement2}
              disabled={quantity2 >= maxQuantity}
            >
              <PlusIcon className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t mt-2">
          <div className="text-sm font-medium">总计：</div>
          <div className="font-bold text-lg">¥ {totalPrice.toFixed(2)}</div>
        </div>
      </div>

      <div className="bg-muted p-3 rounded-md mt-4">
        <p className="text-xs font-medium">
          商品1：{quantity1} × ¥{price1.toFixed(2)} = ¥
          {(price1 * quantity1).toFixed(2)}
        </p>
        <p className="text-xs font-medium">
          商品2：{quantity2} × ¥{price2.toFixed(2)} = ¥
          {(price2 * quantity2).toFixed(2)}
        </p>
        <p className="text-xs font-medium mt-1 pt-1 border-t">
          总价：¥{totalPrice.toFixed(2)}
        </p>
      </div>
    </>
  );
}

// 各种使用场景示例代码
const SCENARIO_CODE = {
  BasicCounterCode: `
import { useCounter } from 'react-use';

function BasicCounter() {
  const [count, { inc, dec, reset, set }] = useCounter(0);
  
  // 自定义步长增减
  const incrementBy5 = () => set(count + 5);
  
  return (
    <div>
      <p>当前计数: {count}</p>
      <button onClick={inc}>+1</button>
      <button onClick={incrementBy5}>+5</button>
      <button onClick={dec}>-1</button>
      <button onClick={reset}>重置</button>
      <button onClick={() => set(100)}>设为 100</button>
    </div>
  );
}
`,
  PaginationCode: `
import { useCounter } from 'react-use';

function Pagination({ totalPages = 10 }) {
  const [page, { set: setPage }] = useCounter(1);
  
  // 确保页码在有效范围内
  const goToPage = (p) => {
    if (p >= 1 && p <= totalPages) {
      setPage(p);
    }
  };
  
  return (
    <div>
      <button onClick={() => goToPage(page - 1)} disabled={page === 1}>上一页</button>
      <span>第 {page} 页，共 {totalPages} 页</span>
      <button onClick={() => goToPage(page + 1)} disabled={page === totalPages}>下一页</button>
    </div>
  );
}
  `,
  QuantitySelectorCode: `
import { useCounter } from 'react-use';

function QuantitySelector({ maxQuantity = 10, price = 99.9 }) {
  const [quantity, { inc, dec }] = useCounter(1);
  
  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      inc();
    }
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      dec();
    }
  };
  
  return (
    <div>
      <button onClick={handleDecrement} disabled={quantity <= 1}>-</button>
      <span>{quantity}</span>
      <button onClick={handleIncrement} disabled={quantity >= maxQuantity}>+</button>
      <p>总价: ¥{quantity * price}</p>
    </div>
  );
}
`,
};

export const Examples = [
  {
    title: "基本计数器组件",
    example: <BasicCounter />,
    code: SCENARIO_CODE.BasicCounterCode,
  },
  {
    title: "分页控件",
    example: <PaginationExample />,
    code: SCENARIO_CODE.PaginationCode,
  },
  {
    title: "商品数量选择器",
    example: <QuantitySelector />,
    code: SCENARIO_CODE.QuantitySelectorCode,
  },
];
