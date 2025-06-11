"use client";

import React, { useState, useRef, useEffect } from "react";
import { useScratch } from "react-use";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

// 定义ScratchSensorState接口，因为react-use没有导出这个类型
interface ScratchSensorState {
  isScratching: boolean;
  start?: number;
  end?: number;
  x?: number;
  y?: number;
  dx?: number;
  dy?: number;
  docX?: number;
  docY?: number;
  elX?: number;
  elY?: number;
  elH?: number;
  elW?: number;
}

// 使用useScratch实现的签名板示例
function SignatureBoard() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 初始化Canvas上下文
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      // 设置canvas的尺寸为其容器的尺寸
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      }

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "#000000";
        setContext(ctx);
      }
    }
  }, []);

  // 计算canvas内部坐标
  const getCanvasCoordinates = (pageX: number, pageY: number) => {
    if (!canvasRef.current) return { x: 0, y: 0 };

    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: pageX - rect.left - window.scrollX,
      y: pageY - rect.top - window.scrollY,
    };
  };

  // 直接处理鼠标/触摸事件，不使用useScratch
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    if (!context) return;

    const { clientX, clientY } = "touches" in e ? e.touches[0] : e;

    const { x, y } = getCanvasCoordinates(clientX, clientY);

    context.beginPath();
    context.moveTo(x, y);
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !context) return;

    const { clientX, clientY } = "touches" in e ? e.touches[0] : e;

    const { x, y } = getCanvasCoordinates(clientX, clientY);

    context.lineTo(x, y);
    context.stroke();
  };

  const handleMouseUp = () => {
    if (isDrawing && context) {
      context.closePath();
    }
    setIsDrawing(false);
  };

  const clearSignature = () => {
    if (context && canvasRef.current) {
      context.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }
  };

  // 完成签名
  const [isComplete, setIsComplete] = useState(false);

  const completeSignature = () => {
    if (isDrawing) {
      handleMouseUp();
    }
    setIsComplete(true);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">签名板</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md p-1 bg-white">
          <div
            ref={containerRef}
            style={{
              width: "100%",
              height: "200px",
              position: "relative",
              touchAction: "none",
              cursor: "crosshair",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
          >
            <canvas
              ref={canvasRef}
              className="w-full h-full border border-dashed border-gray-300 rounded absolute top-0 left-0"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <button
          onClick={clearSignature}
          className="px-3 py-1 bg-red-50 text-red-600 border border-red-200 rounded-md text-sm hover:bg-red-100"
        >
          清除
        </button>
        <button
          onClick={completeSignature}
          disabled={isComplete}
          className="px-3 py-1 bg-green-50 text-green-600 border border-green-200 rounded-md text-sm hover:bg-green-100 disabled:opacity-50"
        >
          完成签名
        </button>
        <div className="text-xs text-slate-500">
          {isComplete ? "签名已完成" : "请在上方区域签名"}
        </div>
      </CardFooter>
    </Card>
  );
}

// 使用useScratch实现的刮刮卡示例
function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [revealed, setRevealed] = useState(0);
  const [isScratching, setIsScratching] = useState(false);
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [prizeText] = useState(() => {
    const prizes = ["你发了", "一等奖！", "二等奖！"];
    return prizes[Math.floor(Math.random() * prizes.length)];
  });

  // 初始化Canvas上下文并创建刮刮卡效果
  useEffect(() => {
    if (canvasRef.current && containerRef.current) {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();

      // 设置canvas尺寸为容器尺寸
      canvas.width = rect.width;
      canvas.height = rect.height;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        // 设置覆盖层颜色
        ctx.fillStyle = "#888888";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 添加"刮开查看"的文字提示
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 24px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("刮开查看奖品", canvas.width / 2, canvas.height / 2);

        setContext(ctx);
      }
    }
  }, []);

  // 计算已刮开的面积百分比
  const calculateRevealedPercentage = () => {
    if (!canvasRef.current || !context) return;

    const canvas = canvasRef.current;
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    // 每4个值表示一个像素的RGBA
    for (let i = 3; i < pixels.length; i += 4) {
      // Alpha值小于128认为是透明的
      if (pixels[i] < 128) {
        transparentPixels++;
      }
    }

    const totalPixels = canvas.width * canvas.height;
    const percentage = Math.floor((transparentPixels / totalPixels) * 100);

    setRevealed(percentage);

    // 如果刮开面积超过70%，自动全部显示
    if (percentage > 70 && percentage < 100) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      setRevealed(100);
    }
  };

  // 计算canvas内部坐标
  const getCanvasCoordinates = (pageX: number, pageY: number) => {
    if (!canvasRef.current) return { x: 0, y: 0 };

    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: pageX - rect.left - window.scrollX,
      y: pageY - rect.top - window.scrollY,
    };
  };

  // 直接处理鼠标/触摸事件，不使用useScratch
  const handleScratchStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!context) return;
    setIsScratching(true);

    // 设置擦除效果
    context.globalCompositeOperation = "destination-out";
    context.lineWidth = 40;
    context.lineCap = "round";
    context.lineJoin = "round";

    const { clientX, clientY } = "touches" in e ? e.touches[0] : e;

    const { x, y } = getCanvasCoordinates(clientX, clientY);
    setLastPoint({ x, y });

    context.beginPath();
    context.arc(x, y, 20, 0, Math.PI * 2);
    context.fill();
  };

  const handleScratchMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isScratching || !context || !lastPoint) return;

    const { clientX, clientY } = "touches" in e ? e.touches[0] : e;

    const { x, y } = getCanvasCoordinates(clientX, clientY);

    context.beginPath();
    context.moveTo(lastPoint.x, lastPoint.y);
    context.lineTo(x, y);
    context.stroke();

    // 在鼠标位置绘制一个小圆，使刮擦更加圆润
    context.beginPath();
    context.arc(x, y, 20, 0, Math.PI * 2);
    context.fill();

    setLastPoint({ x, y });

    // 节流计算刮开面积(10帧一次)
    if (Math.random() < 0.1) {
      calculateRevealedPercentage();
    }
  };

  const handleScratchEnd = () => {
    if (isScratching && context) {
      context.closePath();
      calculateRevealedPercentage();
    }
    setIsScratching(false);
    setLastPoint(null);
  };

  // 重置刮刮卡
  const resetScratchCard = () => {
    if (!canvasRef.current || !context) return;

    const canvas = canvasRef.current;
    // 重置上下文设置
    context.globalCompositeOperation = "source-over";
    // 重新填充灰色背景
    context.fillStyle = "#888888";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // 添加"刮开查看"的文字提示
    context.fillStyle = "#ffffff";
    context.font = "bold 24px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("刮开查看奖品", canvas.width / 2, canvas.height / 2);

    setRevealed(0);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">刮刮卡</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md p-1 bg-white">
          <div
            ref={containerRef}
            style={{
              width: "100%",
              height: "200px",
              position: "relative",
              touchAction: "none",
            }}
            onMouseDown={handleScratchStart}
            onMouseMove={handleScratchMove}
            onMouseUp={handleScratchEnd}
            onMouseLeave={handleScratchEnd}
            onTouchStart={handleScratchStart}
            onTouchMove={handleScratchMove}
            onTouchEnd={handleScratchEnd}
          >
            {/* 下方的中奖信息层 */}
            <div
              className="w-full h-full flex items-center justify-center text-2xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 text-white absolute top-0 left-0"
              style={{ zIndex: 1 }}
            >
              {prizeText}
            </div>

            {/* 上方的刮刮层 */}
            <canvas
              ref={canvasRef}
              className="w-full h-full absolute top-0 left-0"
              style={{ zIndex: 2 }}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <button
          onClick={resetScratchCard}
          className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-200 rounded-md text-sm hover:bg-blue-100"
        >
          重置
        </button>
        <div className="text-xs text-slate-500">已刮开: {revealed}%</div>
      </CardFooter>
    </Card>
  );
}

// 导出示例组件
export const Examples = [
  {
    title: "签名板",
    example: <SignatureBoard />,
    code: `import { useRef, useState, useEffect } from 'react';

const SignatureBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (canvasRef.current && containerRef.current) {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "#000000";
        setContext(ctx);
      }
    }
  }, []);

  const getCanvasCoordinates = (pageX, pageY) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: pageX - rect.left - window.scrollX,
      y: pageY - rect.top - window.scrollY
    };
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    if (!context) return;
    
    const { clientX, clientY } = 
      'touches' in e ? e.touches[0] : e;
    
    const { x, y } = getCanvasCoordinates(clientX, clientY);
    
    context.beginPath();
    context.moveTo(x, y);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !context) return;
    
    const { clientX, clientY } = 
      'touches' in e ? e.touches[0] : e;
    
    const { x, y } = getCanvasCoordinates(clientX, clientY);
    
    context.lineTo(x, y);
    context.stroke();
  };

  const handleMouseUp = () => {
    if (isDrawing && context) {
      context.closePath();
    }
    setIsDrawing(false);
  };

  return (
    <div 
      ref={containerRef}
      style={{ 
        width: '400px', 
        height: '200px',
        position: 'relative',
        touchAction: 'none',
        cursor: 'crosshair'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          border: '1px dashed #ccc',
          borderRadius: '4px'
        }}
      />
    </div>
  );
};`,
  },
  {
    title: "刮刮卡",
    example: <ScratchCard />,
    code: `import { useRef, useState, useEffect } from 'react';

const ScratchCard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [lastPoint, setLastPoint] = useState(null);
  const [revealed, setRevealed] = useState(0);
  const [prizeText] = useState("恭喜中奖！");

  // 初始化Canvas上下文并创建刮刮卡效果
  useEffect(() => {
    if (canvasRef.current && containerRef.current) {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#888888";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 24px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("刮开查看奖品", canvas.width / 2, canvas.height / 2);
        
        setContext(ctx);
      }
    }
  }, []);

  const getCanvasCoordinates = (pageX, pageY) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: pageX - rect.left - window.scrollX,
      y: pageY - rect.top - window.scrollY
    };
  };

  const handleScratchStart = (e) => {
    if (!context) return;
    setIsScratching(true);
    
    context.globalCompositeOperation = "destination-out";
    context.lineWidth = 40;
    context.lineCap = "round";
    
    const { clientX, clientY } = 
      'touches' in e ? e.touches[0] : e;
    
    const { x, y } = getCanvasCoordinates(clientX, clientY);
    setLastPoint({ x, y });
    
    context.beginPath();
    context.arc(x, y, 20, 0, Math.PI * 2);
    context.fill();
  };

  const handleScratchMove = (e) => {
    if (!isScratching || !context || !lastPoint) return;
    
    const { clientX, clientY } = 
      'touches' in e ? e.touches[0] : e;
    
    const { x, y } = getCanvasCoordinates(clientX, clientY);
    
    context.beginPath();
    context.moveTo(lastPoint.x, lastPoint.y);
    context.lineTo(x, y);
    context.stroke();
    
    context.beginPath();
    context.arc(x, y, 20, 0, Math.PI * 2);
    context.fill();
    
    setLastPoint({ x, y });
  };

  const handleScratchEnd = () => {
    setIsScratching(false);
  };

  return (
    <div style={{ position: 'relative', width: '400px', height: '200px' }}>
      {/* 下方的中奖信息层 */}
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #ffd700, #ffcc00)',
          color: 'white',
          position: 'absolute',
          zIndex: 1
        }}
      >
        {prizeText}
      </div>
      
      {/* 上方的刮刮层 */}
      <div 
        ref={containerRef}
        style={{ 
          touchAction: 'none', 
          zIndex: 2, 
          position: 'absolute',
          width: '100%',
          height: '100%' 
        }}
        onMouseDown={handleScratchStart}
        onMouseMove={handleScratchMove}
        onMouseUp={handleScratchEnd}
        onMouseLeave={handleScratchEnd}
        onTouchStart={handleScratchStart}
        onTouchMove={handleScratchMove}
        onTouchEnd={handleScratchEnd}
      >
        <canvas
          ref={canvasRef}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};`,
  },
];
