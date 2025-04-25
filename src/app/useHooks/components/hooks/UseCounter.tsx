"use client";

import React, { useState } from "react";
import { useCounter } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon, MinusIcon, RotateCcwIcon, StarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

// 基本计数器组件
function BasicCounter() {
  const { count, increment, decrement, reset, setCount } = useCounter(0);
  const [step, setStep] = React.useState(1);

  // 步长增减函数 - 使用 setCount 直接更新值
  const handleIncrement = () => {
    setCount((x) => x + step);
  };

  const handleDecrement = () => {
    setCount((x) => x - step);
  };

  const handleSetCount = (value: number) => setCount(value);
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

          <Button variant="default" size="icon" onClick={reset} title="重置">
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
  const { count: currentPage, setCount: setPage } = useCounter(1);

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
  const {
    count: quantity,
    increment,
    decrement,
    setCount: setQuantity,
  } = useCounter(1);
  const [price, setPrice] = useState(99.9);
  const maxQuantity = 10;

  const handleDecrement = () => {
    if (quantity > 1) {
      decrement();
    }
  };

  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      increment();
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= maxQuantity) {
      setQuantity(value);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="https://placehold.co/60x60/f3f4f6/6b7280"
              alt="商品图片"
              className="rounded-md"
            />
            <div>
              <h4 className="text-sm font-medium">智能手表 Pro</h4>
              <p className="text-xs text-muted-foreground">黑色 / 42mm</p>
            </div>
          </div>
          <div className="font-semibold">¥ {price.toFixed(2)}</div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm">数量：</div>
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={handleDecrement}
              disabled={quantity <= 1}
            >
              <MinusIcon className="h-3 w-3" />
            </Button>

            <Input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className="h-8 w-12 border-0 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              min={1}
              max={maxQuantity}
            />

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={handleIncrement}
              disabled={quantity >= maxQuantity}
            >
              <PlusIcon className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t">
          <div className="text-sm font-medium">总计：</div>
          <div className="font-bold text-lg">
            ¥ {(price * quantity).toFixed(2)}
          </div>
        </div>
      </div>

      <div className="bg-muted p-3 rounded-md mt-4">
        <p className="text-xs font-medium">
          数量：{quantity}，单价：¥{price.toFixed(2)}，总价：¥
          {(price * quantity).toFixed(2)}
        </p>
      </div>
    </>
  );
}

// 评分组件
function RatingComponent() {
  const { count: rating, setCount: setRating } = useCounter(0);
  const maxRating = 5;

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <Button
          key={i}
          variant="ghost"
          size="icon"
          className="h-10 w-10"
          onClick={() => handleRatingClick(i)}
        >
          <StarIcon
            className={`h-6 w-6 ${
              i <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground"
            }`}
          />
        </Button>
      );
    }

    return stars;
  };

  const ratingTexts = ["未评分", "很差", "较差", "一般", "不错", "很棒"];

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <h4 className="text-sm font-medium">请为我们的服务评分</h4>

        <div className="flex items-center">{renderStars()}</div>

        <div className="h-6">
          {rating > 0 && (
            <Badge variant={rating > 3 ? "default" : "secondary"}>
              {ratingTexts[rating]}
            </Badge>
          )}
        </div>

        {rating > 0 && (
          <div className="w-full">
            <Input placeholder="请输入您的评价（可选）" className="w-full" />
          </div>
        )}
      </div>

      <div className="bg-muted p-3 rounded-md mt-4">
        <p className="text-xs font-medium">
          当前评分：{rating} / {maxRating}，评价：{ratingTexts[rating]}
        </p>
      </div>
    </>
  );
}

export function BasicCounterDemo() {
  return <BasicCounter />;
}

export function PaginationDemo() {
  return <PaginationExample />;
}

export function QuantitySelectorDemo() {
  return <QuantitySelector />;
}

export function RatingComponentDemo() {
  return <RatingComponent />;
}

// 每个场景对应的代码示例
export const BASIC_COUNTER_CODE = `
import { useCounter } from 'usehooks-ts';

function BasicCounter() {
  const { count, increment, decrement, reset, setCount } = useCounter(0);
  
  // 自定义步长增减
  const incrementBy5 = () => setCount(x => x + 5);
  
  return (
    <div>
      <p>当前计数: {count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={incrementBy5}>+5</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>重置</button>
      <button onClick={() => setCount(100)}>设为 100</button>
    </div>
  );
}
`;

export const PAGINATION_CODE = `
function Pagination({ totalPages = 10 }) {
  const { count: page, setCount: setPage } = useCounter(1);
  
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
`;

export const QUANTITY_SELECTOR_CODE = `
function QuantitySelector({ maxQuantity = 10, price = 99.9 }) {
  const { count: quantity, increment, decrement } = useCounter(1);
  
  return (
    <div>
      <button onClick={decrement} disabled={quantity <= 1}>-</button>
      <span>{quantity}</span>
      <button onClick={increment} disabled={quantity >= maxQuantity}>+</button>
      <p>总价: ¥{quantity * price}</p>
    </div>
  );
}
`;

export const RATING_CODE = `
function Rating() {
  const { count: rating, setCount: setRating } = useCounter(0);
  const maxRating = 5;
  
  return (
    <div>
      {[1, 2, 3, 4, 5].map(value => (
        <button key={value} onClick={() => setRating(value)}>
          {value <= rating ? '★' : '☆'}
        </button>
      ))}
      <p>您的评分: {rating}/5</p>
    </div>
  );
}
`;

// Hook 的元数据
export const HOOK_META = {
  name: "useCounter",
  description:
    "用于管理计数器状态的 Hook，提供递增、递减、重置和直接设置值等功能",
  category: "状态",
  docsLink: "https://usehooks-ts.com/react-hook/use-counter",
  githubLink:
    "https://github.com/juliencrn/usehooks-ts/blob/master/packages/usehooks-ts/src/useCounter/useCounter.ts",
};

// 场景配置
export const HOOK_SCENARIOS = [
  {
    title: "基本计数器/步进器",
    demo: <BasicCounterDemo />,
    code: BASIC_COUNTER_CODE,
  },
  {
    title: "分页控件",
    demo: <PaginationDemo />,
    code: PAGINATION_CODE,
  },
  {
    title: "商品数量选择器",
    demo: <QuantitySelectorDemo />,
    code: QUANTITY_SELECTOR_CODE,
  },
  {
    title: "评分组件",
    demo: <RatingComponentDemo />,
    code: RATING_CODE,
  },
];

// 在文件底部添加一个默认导出
export default function UseCounterDemo() {
  return (
    <div className="space-y-8">
      <BasicCounter />
      <PaginationExample />
      <QuantitySelector />
      <RatingComponent />
    </div>
  );
}
