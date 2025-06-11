"use client";

import React, { useState, useRef } from "react";
import { useClickAway } from "react-use";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ChevronDown, X, Menu, Settings, Info } from "lucide-react";

// 下拉菜单场景
function CustomDropdownExample() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 使用 useClickAway 检测点击菜单外部
  useClickAway(ref, () => {
    setIsOpen(false);
  });

  return (
    <div className="w-full max-w-md flex justify-center">
      <Card className="w-full p-4">
        <CardHeader>
          <CardTitle>自定义下拉菜单</CardTitle>
          <CardDescription>点击按钮打开菜单，点击菜单外部关闭</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2"
            >
              <Menu size={16} />
              菜单选项
              <ChevronDown
                size={16}
                className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </Button>

            {isOpen && (
              <div
                ref={ref}
                className="absolute top-full left-0 mt-1 w-48 rounded-md bg-white shadow-lg border border-gray-200 z-10"
              >
                <div className="py-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    个人资料
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    设置
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    退出登录
                  </a>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-gray-500">
          {isOpen ? "点击菜单外部区域来关闭" : "下拉菜单已关闭，点击按钮打开"}
        </CardFooter>
      </Card>
    </div>
  );
}

// 自定义模态框场景
function CustomModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // 使用 useClickAway 检测点击模态框外部
  useClickAway(modalRef, () => {
    if (isOpen) setIsOpen(false);
  });

  return (
    <div className="w-full max-w-md flex justify-center">
      <Card className="w-full p-4">
        <CardHeader>
          <CardTitle>自定义模态框</CardTitle>
          <CardDescription>
            点击按钮打开模态框，点击模态框外部关闭
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Button onClick={() => setIsOpen(true)}>打开模态框</Button>

          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/20 bg-opacity-25 z-50">
              <div
                ref={modalRef}
                className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 mx-4"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">模态框标题</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="mb-4">
                  <p>这是一个使用 useClickAway 实现的自定义模态框。</p>
                  <p className="mt-2">
                    您可以点击模态框外部区域或右上角的关闭按钮来关闭它。
                  </p>
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    className="mr-2"
                    onClick={() => setIsOpen(false)}
                  >
                    取消
                  </Button>
                  <Button onClick={() => setIsOpen(false)}>确认</Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-gray-500">
          {isOpen ? "点击模态框外部区域关闭" : "模态框已关闭，点击按钮打开"}
        </CardFooter>
      </Card>
    </div>
  );
}

// 气泡提示场景
function PopoverExample() {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // 使用 useClickAway 检测点击气泡提示外部
  useClickAway(popoverRef, () => {
    if (isOpen) setIsOpen(false);
  });

  return (
    <div className="w-full max-w-md flex justify-center">
      <Card className="w-full p-4">
        <CardHeader>
          <CardTitle>自定义气泡提示</CardTitle>
          <CardDescription>
            点击按钮显示气泡提示，点击气泡外部关闭
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2"
            >
              <Info size={16} />
              显示详情
            </Button>

            {isOpen && (
              <div
                ref={popoverRef}
                className="absolute top-full left-0 mt-2 w-64 rounded-md bg-white shadow-lg border border-gray-200 z-10 p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">详细信息</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X size={16} />
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  这是一个使用useClickAway钩子实现的气泡提示组件。
                  当用户点击气泡外部区域时，气泡会自动关闭。
                </p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-gray-500">
          {isOpen ? "点击气泡外部区域关闭" : "气泡已关闭，点击按钮显示"}
        </CardFooter>
      </Card>
    </div>
  );
}

const CODE_EXAMPLES = {
  CustomDropdownExample: `function CustomDropdownExample() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  // 使用 useClickAway 检测点击菜单外部
  useClickAway(ref, () => {
    setIsOpen(false);
  });

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        菜单选项 {isOpen ? '▲' : '▼'}
      </button>

      {isOpen && (
        <div
          ref={ref}
          style={{
            position: 'absolute',
            width: '200px',
            marginTop: '8px',
            padding: '8px 0',
            backgroundColor: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '4px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          }}
        >
          <a
            href="#"
            style={{
              display: 'block',
              padding: '8px 16px',
              color: '#4a5568',
            }}
            onClick={() => setIsOpen(false)}
          >
            个人资料
          </a>
          <a
            href="#"
            style={{
              display: 'block',
              padding: '8px 16px',
              color: '#4a5568',
            }}
            onClick={() => setIsOpen(false)}
          >
            设置
          </a>
          <a
            href="#"
            style={{
              display: 'block',
              padding: '8px 16px',
              color: '#4a5568',
            }}
            onClick={() => setIsOpen(false)}
          >
            退出登录
          </a>
        </div>
      )}
    </div>
  );
}`,

  CustomModalExample: `function CustomModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  // 使用 useClickAway 检测点击模态框外部
  useClickAway(modalRef, () => {
    if (isOpen) setIsOpen(false);
  });

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        打开模态框
      </button>

      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <div
            ref={modalRef}
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '16px',
              width: '90%',
              maxWidth: '500px',
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginBottom: '16px' 
            }}>
              <h3>模态框标题</h3>
              <button onClick={() => setIsOpen(false)}>✕</button>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <p>这是一个使用 useClickAway 实现的自定义模态框。</p>
              <p>您可以点击模态框外部区域或右上角的关闭按钮来关闭它。</p>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end' 
            }}>
              <button 
                style={{ marginRight: '8px' }}
                onClick={() => setIsOpen(false)}
              >
                取消
              </button>
              <button onClick={() => setIsOpen(false)}>
                确认
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}`,

  PopoverExample: `function PopoverExample() {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  // 使用 useClickAway 检测点击气泡提示外部
  useClickAway(popoverRef, () => {
    if (isOpen) setIsOpen(false);
  });

  return (
    <div style={{ position: 'relative' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
      >
        显示详情
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: '8px',
            width: '240px',
            padding: '12px',
            backgroundColor: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '4px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          }}
        >
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            marginBottom: '8px'
          }}>
            <h3 style={{ margin: 0, fontSize: '14px' }}>详细信息</h3>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>
          <p style={{ margin: 0, fontSize: '14px' }}>
            这是一个使用useClickAway钩子实现的气泡提示组件。
            当用户点击气泡外部区域时，气泡会自动关闭。
          </p>
        </div>
      )}
    </div>
  );
}`,
};

// 导出示例组件
export const Examples = [
  {
    title: "下拉菜单",
    example: <CustomDropdownExample />,
    code: CODE_EXAMPLES.CustomDropdownExample,
  },
  {
    title: "模态框",
    example: <CustomModalExample />,
    code: CODE_EXAMPLES.CustomModalExample,
  },
  {
    title: "气泡提示",
    example: <PopoverExample />,
    code: CODE_EXAMPLES.PopoverExample,
  },
];
