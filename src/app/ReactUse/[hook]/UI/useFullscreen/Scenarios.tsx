"use client";

import React, { useRef } from "react";
import { useFullscreen, useToggle } from "react-use";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Maximize,
  Minimize,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ImageIcon,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// 基础全屏场景示例
export function BasicFullscreenExample() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, toggle] = useToggle(false);
  const isFullscreen = useFullscreen(
    ref as React.RefObject<HTMLElement>,
    show,
    {
      onClose: () => toggle(false),
    }
  );

  return (
    <div className="space-y-4">
      <div
        ref={ref}
        className={`p-6 rounded-lg ${
          isFullscreen
            ? "bg-indigo-300 text-white"
            : "bg-slate-100 dark:bg-slate-800"
        }`}
      >
        <h3 className="text-lg font-medium mb-2">
          {isFullscreen ? "全屏模式" : "标准模式"}
        </h3>
        <p className="mb-4">
          此组件演示了 useFullscreen 钩子的基本用法。 当前状态:{" "}
          <strong>{isFullscreen ? "全屏" : "普通"}</strong>
        </p>
        <Button
          onClick={() => toggle()}
          variant={isFullscreen ? "secondary" : "default"}
          className="flex items-center gap-2"
        >
          {isFullscreen ? (
            <>
              <Minimize size={16} /> 退出全屏
            </>
          ) : (
            <>
              <Maximize size={16} /> 进入全屏
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

// 图片查看器全屏示例
export function ImageViewerExample() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, toggle] = useToggle(false);
  const isFullscreen = useFullscreen(
    ref as React.RefObject<HTMLElement>,
    show,
    {
      onClose: () => toggle(false),
    }
  );

  return (
    <div className="space-y-4">
      <div
        ref={ref}
        className={`p-4 rounded-lg ${
          isFullscreen ? "bg-black" : "bg-slate-100 dark:bg-slate-800"
        }`}
      >
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1517329782449-810562a4ec2f?q=80&w=1000"
            alt="风景照片"
            className="w-full h-auto rounded"
          />
          <Button
            onClick={() => toggle()}
            variant="outline"
            size="sm"
            className={`absolute top-4 right-4 flex items-center gap-1.5 ${
              isFullscreen ? "bg-opacity-50 backdrop-blur-sm" : ""
            }`}
          >
            {isFullscreen ? (
              <>
                <Minimize size={14} /> 退出
              </>
            ) : (
              <>
                <Maximize size={14} /> 全屏
              </>
            )}
          </Button>
        </div>
        {isFullscreen && (
          <div className="mt-4 text-white">
            <h3 className="text-xl font-semibold">山间湖泊</h3>
            <p className="text-gray-300 mt-1">拍摄于高山湖区，呈现自然之美。</p>
          </div>
        )}
      </div>
    </div>
  );
}

// 视频播放器全屏示例
export function VideoPlayerExample() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, toggle] = useToggle(false);
  const isFullscreen = useFullscreen(
    ref as React.RefObject<HTMLElement>,
    show,
    {
      onClose: () => toggle(false),
    }
  );
  return (
    <div className="space-y-4">
      <div
        ref={ref}
        className={`${
          isFullscreen ? "bg-black p-4" : "bg-slate-100 dark:bg-slate-800 p-3"
        } rounded-lg`}
      >
        <div className="relative">
          <video
            src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            controls
            className="w-full h-auto rounded"
          />

          <div className="absolute top-2 right-2 flex space-x-2">
            <Button
              onClick={() => toggle()}
              variant="outline"
              size="sm"
              className="bg-opacity-70 backdrop-blur-sm"
            >
              {isFullscreen ? (
                <>
                  <Minimize size={14} className="mr-1" /> 退出
                </>
              ) : (
                <>
                  <Maximize size={14} className="mr-1" /> 全屏
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const CODE_EXAMPLES = {
  BasicFullscreenExample: `function BasicFullscreenExample() {
  // 创建引用，指向要全屏显示的元素
  const ref = useRef(null);
  
  // 使用 useToggle 控制全屏状态
  const [show, toggle] = useToggle(false);
  
  // 使用 useFullscreen 钩子实现全屏功能
  const isFullscreen = useFullscreen(ref, show, {
    onClose: () => toggle(false),
  });

  return (
    <div>
      <div 
        ref={ref} 
        style={{
          backgroundColor: isFullscreen ? '#4e46e553' : '#f3f4f6',
          color: isFullscreen ? 'white' : 'black',
          padding: '20px',
          borderRadius: '8px',
          transition: 'background-color 0.3s'
        }}
      >
        <h3>这个容器可以切换全屏显示</h3>
        <p>当前状态: {isFullscreen ? '全屏' : '普通'}</p>
        <button onClick={() => toggle()}>
          {isFullscreen ? '退出全屏' : '进入全屏'}
        </button>
      </div>
    </div>
  );
}`,

  ImageViewerExample: `function ImageViewerExample() {
  const imageRef = useRef(null);
  
  // 使用 useToggle 控制全屏状态
  const [show, toggle] = useToggle(false);
  
  // 使用 useFullscreen 钩子实现全屏功能
  const isFullscreen = useFullscreen(imageRef, show, {
    onClose: () => toggle(false),
  });

  return (
    <div>
      <div ref={imageRef} style={{ position: 'relative' }}>
        {/* 图片容器 */}
        <img
          src="https://example.com/sample-image.jpg"
          alt="示例图片"
          style={{ maxWidth: '100%', display: 'block' }}
        />

        {/* 全屏按钮 */}
        <button 
          onClick={() => toggle()}
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            background: 'rgba(0,0,0,0.5)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '5px 10px',
            cursor: 'pointer'
          }}
        >
          {isFullscreen ? '退出全屏' : '全屏查看'}
        </button>
        
        {/* 全屏模式下显示的额外信息 */}
        {isFullscreen && (
          <div style={{
            padding: '10px',
            background: 'rgba(0,0,0,0.7)',
            color: 'white'
          }}>
            <h3>高清示例图片</h3>
            <p>来源：Unsplash</p>
          </div>
        )}
      </div>
    </div>
  );
}`,

  VideoPlayerExample: `function VideoPlayerExample() {
  const videoRef = useRef(null);
  
  // 使用 useToggle 控制全屏状态
  const [show, toggle] = useToggle(false);
  
  // 使用 useFullscreen 钩子实现全屏功能
  const isFullscreen = useFullscreen(videoRef, show, {
    onClose: () => toggle(false),
  });

  return (
    <div>
      <div 
        ref={videoRef} 
        style={{
          backgroundColor: '#000',
          borderRadius: isFullscreen ? '0' : '8px',
          overflow: 'hidden'
        }}
      >
        {/* 视频区域 (这里用背景色模拟) */}
        <div style={{
          width: '100%',
          height: isFullscreen ? '80vh' : '200px',
          backgroundColor: '#333',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255,255,255,0.3)'
        }}>
          {!isPlaying && <span>▶</span>}
        </div>

        {/* 视频控制栏 */}
        <div style={{
          padding: '10px',
          backgroundColor: '#222',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'white'
        }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={togglePlay}>
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            <button onClick={toggleMute}>
              {isMuted ? '🔇' : '🔊'}
            </button>
            <span>01:23 / 04:56</span>
          </div>
          
          <button onClick={() => toggle()}>
            {isFullscreen ? '↙' : '⤢'}
          </button>
        </div>
      </div>
    </div>
  );
}`,
};

// 导出示例组件
export const Examples = [
  {
    title: "基础全屏",
    example: <BasicFullscreenExample />,
    code: CODE_EXAMPLES.BasicFullscreenExample,
  },
  {
    title: "图片查看器",
    example: <ImageViewerExample />,
    code: CODE_EXAMPLES.ImageViewerExample,
  },
  {
    title: "视频播放器",
    example: <VideoPlayerExample />,
    code: CODE_EXAMPLES.VideoPlayerExample,
  },
];

export default function Scenarios() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>使用场景</CardTitle>
        <CardDescription>useFullscreen 钩子的不同应用场景</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic">
          <TabsList className="mb-4">
            <TabsTrigger value="basic">基础示例</TabsTrigger>
            <TabsTrigger value="image">图片查看器</TabsTrigger>
            <TabsTrigger value="video">视频播放器</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <BasicFullscreenExample />
          </TabsContent>

          <TabsContent value="image">
            <ImageViewerExample />
          </TabsContent>

          <TabsContent value="video">
            <VideoPlayerExample />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
