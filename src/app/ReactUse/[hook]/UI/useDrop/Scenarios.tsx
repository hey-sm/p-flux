"use client";

import React, { useState } from "react";
import { useDropArea } from "react-use";
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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileIcon, Image, Upload, X, File, RefreshCw } from "lucide-react";

// 文件拖放上传场景示例
function FileDropExample() {
  const [files, setFiles] = useState<File[]>([]);

  // 使用 useDropArea 钩子实现拖放功能
  const [bond, state] = useDropArea({
    onFiles: (filesDropped) => {
      // 获取拖放的文件并转换为数组
      setFiles(Array.from(filesDropped));
    },
  });

  // 文件大小格式化
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // 清除文件列表
  const clearFiles = () => {
    setFiles([]);
  };

  return (
    <div className="w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>文件拖放上传</CardTitle>
          <CardDescription>
            拖拽文件到下方区域或点击选择文件上传
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 拖放区域 */}
          <div
            {...bond}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              state.over
                ? "border-primary bg-primary/5"
                : "border-gray-300 hover:border-primary/50"
            }`}
          >
            <div className="flex flex-col items-center justify-center gap-3">
              <Upload
                className={`h-10 w-10 ${
                  state.over ? "text-primary" : "text-gray-400"
                }`}
              />
              <h3 className="text-lg font-medium">
                {state.over ? "松开鼠标放置文件" : "拖拽文件到此处"}
              </h3>
              <p className="text-sm text-gray-500">
                支持各种类型的文件，最大支持10MB
              </p>
              <Button variant="outline" className="mt-2">
                或点击选择文件
              </Button>
            </div>
          </div>

          {/* 文件列表 */}
          {files.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium">已上传文件</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFiles}
                  className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
                >
                  <X size={16} />
                  清除全部
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>文件名</TableHead>
                    <TableHead>类型</TableHead>
                    <TableHead>大小</TableHead>
                    <TableHead className="text-right">状态</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {files.map((file, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium flex items-center gap-2">
                        <FileIcon size={16} className="text-gray-500" />
                        <span className="truncate max-w-[200px]">
                          {file.name}
                        </span>
                      </TableCell>
                      <TableCell>{file.type || "未知类型"}</TableCell>
                      <TableCell>{formatFileSize(file.size)}</TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 hover:bg-green-50"
                        >
                          已上传
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            {files.length > 0
              ? `已上传 ${files.length} 个文件`
              : "拖拽文件到上方区域或点击选择文件"}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

// 图片预览拖放场景示例
function ImagePreviewDropExample() {
  const [images, setImages] = useState<
    Array<{ file: File; preview: string; loading: boolean }>
  >([]);

  // 使用 useDropArea 钩子实现图片拖放功能
  const [bond, state] = useDropArea({
    onFiles: (filesDropped) => {
      // 过滤只接受图片类型
      const imageFiles = Array.from(filesDropped).filter((file) =>
        file.type.startsWith("image/")
      );

      // 创建图片预览
      const newImages = imageFiles.map((file) => ({
        file,
        preview: "",
        loading: true,
      }));

      // 添加到当前图片列表
      setImages((prev) => [...prev, ...newImages]);

      // 为每个图片生成预览URL
      imageFiles.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImages((prevImages) => {
            const newImages = [...prevImages];
            const currentIndex = prevImages.findIndex(
              (img) => img.file === file && img.loading
            );
            if (currentIndex !== -1) {
              newImages[currentIndex] = {
                ...newImages[currentIndex],
                preview: e.target?.result as string,
                loading: false,
              };
            }
            return newImages;
          });
        };
        reader.readAsDataURL(file);
      });
    },
  });

  // 移除图片
  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // 清除所有图片
  const clearAllImages = () => {
    setImages([]);
  };

  return (
    <div className="w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>图片拖放预览</CardTitle>
          <CardDescription>拖拽图片到下方区域可实时预览</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 拖放区域 */}
          <div
            {...bond}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              state.over
                ? "border-primary bg-primary/5"
                : "border-gray-300 hover:border-primary/50"
            }`}
          >
            <div className="flex flex-col items-center justify-center gap-3">
              <Image
                className={`h-10 w-10 ${
                  state.over ? "text-primary" : "text-gray-400"
                }`}
              />
              <h3 className="text-lg font-medium">
                {state.over ? "松开鼠标放置图片" : "拖拽图片到此处"}
              </h3>
              <p className="text-sm text-gray-500">
                支持JPG、PNG、GIF和SVG格式的图片
              </p>
              <Button variant="outline" className="mt-2">
                或点击选择图片
              </Button>
            </div>
          </div>

          {/* 图片预览网格 */}
          {images.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium">图片预览</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllImages}
                  className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
                >
                  <X size={16} />
                  清除全部
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square border rounded-md overflow-hidden group"
                  >
                    {image.loading ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <RefreshCw className="h-6 w-6 text-gray-400 animate-spin" />
                      </div>
                    ) : (
                      <img
                        src={image.preview}
                        alt={`预览 ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
                      {image.file.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            {images.length > 0
              ? `已上传 ${images.length} 张图片`
              : "拖拽图片到上方区域预览"}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

// 复合文件处理场景
function AdvancedDropExample() {
  const [data, setData] = useState<{
    files: File[];
    text: string | null;
    uri: string | null;
  }>({
    files: [],
    text: null,
    uri: null,
  });

  // 使用 useDropArea 处理多种类型的拖放
  const [bond, state] = useDropArea({
    onFiles: (files) => {
      setData((prev) => ({ ...prev, files: Array.from(files) }));
    },
    onText: (text) => {
      setData((prev) => ({ ...prev, text }));
    },
    onUri: (uri) => {
      setData((prev) => ({ ...prev, uri }));
    },
  });

  // 重置所有数据
  const resetData = () => {
    setData({ files: [], text: null, uri: null });
  };

  return (
    <div className="w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>高级拖放处理</CardTitle>
          <CardDescription>同时处理文件、文本和链接的拖放操作</CardDescription>
        </CardHeader>
        <CardContent>
          {/* 拖放区域 */}
          <div
            {...bond}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              state.over
                ? "border-primary bg-primary/5"
                : "border-gray-300 hover:border-primary/50"
            }`}
          >
            <div className="flex flex-col items-center justify-center gap-3">
              <Upload
                className={`h-10 w-10 ${
                  state.over ? "text-primary" : "text-gray-400"
                }`}
              />
              <h3 className="text-lg font-medium">
                {state.over ? "松开鼠标放置内容" : "拖拽任何内容到此处"}
              </h3>
              <p className="text-sm text-gray-500">
                支持拖放文件、文本内容和网页链接
              </p>
            </div>
          </div>

          {/* 拖放结果展示 */}
          {(data.files.length > 0 || data.text || data.uri) && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium">拖放结果</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetData}
                  className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
                >
                  <X size={16} />
                  重置
                </Button>
              </div>

              <Tabs defaultValue="files" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="files" disabled={data.files.length === 0}>
                    文件 {data.files.length > 0 && `(${data.files.length})`}
                  </TabsTrigger>
                  <TabsTrigger value="text" disabled={!data.text}>
                    文本
                  </TabsTrigger>
                  <TabsTrigger value="uri" disabled={!data.uri}>
                    链接
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="files"
                  className="border rounded-md p-4 mt-4"
                >
                  {data.files.length > 0 ? (
                    <ul className="space-y-2">
                      {data.files.map((file, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <File size={16} className="text-gray-500" />
                          <span className="flex-1 truncate">{file.name}</span>
                          <span className="text-xs text-gray-500">
                            {file.type || "未知类型"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-gray-500">未拖放任何文件</p>
                  )}
                </TabsContent>
                <TabsContent
                  value="text"
                  className="border rounded-md p-4 mt-4"
                >
                  {data.text ? (
                    <div className="whitespace-pre-wrap break-words bg-gray-50 p-3 rounded border">
                      {data.text}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500">未拖放任何文本</p>
                  )}
                </TabsContent>
                <TabsContent value="uri" className="border rounded-md p-4 mt-4">
                  {data.uri ? (
                    <div className="bg-gray-50 p-3 rounded border">
                      <a
                        href={data.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-all"
                      >
                        {data.uri}
                      </a>
                    </div>
                  ) : (
                    <p className="text-center text-gray-500">未拖放任何链接</p>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <div className="text-sm text-gray-500">
            提示：您可以从文件管理器拖拽文件，从浏览器拖拽链接，或从文本编辑器拖拽文本
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

const CODE_EXAMPLES = {
  FileDropExample: `function FileDropExample() {
  const [files, setFiles] = useState([]);
  
  // 使用 useDropArea 钩子实现拖放功能
  const [bond, state] = useDropArea({
    onFiles: (filesDropped) => {
      // 获取拖放的文件并转换为数组
      setFiles(Array.from(filesDropped));
    },
  });

  // 文件大小格式化
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div>
      {/* 拖放区域 */}
      <div
        {...bond}
        style={{
          border: \`2px dashed \${state.over ? '#3b82f6' : '#ccc'}\`,
          borderRadius: '8px',
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: state.over ? '#f0f9ff' : 'white',
          transition: 'all 0.2s ease'
        }}
      >
        <h3>{state.over ? '松开鼠标放置文件' : '拖拽文件到此处'}</h3>
        <p>支持各种类型的文件</p>
      </div>

      {/* 文件列表 */}
      {files.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h4>已上传文件:</h4>
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                {file.name} - {formatFileSize(file.size)} 
                ({file.type || '未知类型'})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}`,

  ImagePreviewDropExample: `function ImagePreviewDropExample() {
  const [images, setImages] = useState([]);

  // 使用 useDropArea 钩子实现图片拖放功能
  const [bond, state] = useDropArea({
    onFiles: (filesDropped) => {
      // 过滤只接受图片类型
      const imageFiles = Array.from(filesDropped).filter(file => 
        file.type.startsWith('image/')
      );

      // 为每个图片生成预览URL
      imageFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImages(prev => [...prev, {
            file,
            preview: e.target.result
          }]);
        };
        reader.readAsDataURL(file);
      });
    },
  });

  // 移除图片
  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* 拖放区域 */}
      <div
        {...bond}
        style={{
          border: \`2px dashed \${state.over ? '#3b82f6' : '#ccc'}\`,
          borderRadius: '8px',
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: state.over ? '#f0f9ff' : 'white',
          transition: 'all 0.2s ease'
        }}
      >
        <h3>{state.over ? '松开鼠标放置图片' : '拖拽图片到此处'}</h3>
        <p>支持JPG、PNG、GIF和SVG格式的图片</p>
      </div>

      {/* 图片预览网格 */}
      {images.length > 0 && (
        <div style={{
          marginTop: '1rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem'
        }}>
          {images.map((image, index) => (
            <div key={index} style={{ position: 'relative' }}>
              <img 
                src={image.preview}
                alt={\`预览 \${index + 1}\`}
                style={{
                  width: '100%',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: '4px'
                }}
              />
              <button
                onClick={() => removeImage(index)}
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  background: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}`,

  AdvancedDropExample: `function AdvancedDropExample() {
  const [data, setData] = useState({
    files: [],
    text: null,
    uri: null
  });

  // 使用 useDropArea 处理多种类型的拖放
  const [bond, state] = useDropArea({
    onFiles: (files) => {
      setData(prev => ({ ...prev, files: Array.from(files) }));
    },
    onText: (text) => {
      setData(prev => ({ ...prev, text }));
    },
    onUri: (uri) => {
      setData(prev => ({ ...prev, uri }));
    }
  });

  return (
    <div>
      {/* 拖放区域 */}
      <div
        {...bond}
        style={{
          border: \`2px dashed \${state.over ? '#3b82f6' : '#ccc'}\`,
          borderRadius: '8px',
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: state.over ? '#f0f9ff' : 'white',
          transition: 'all 0.2s ease'
        }}
      >
        <h3>{state.over ? '松开鼠标放置内容' : '拖拽任何内容到此处'}</h3>
        <p>支持拖放文件、文本内容和网页链接</p>
      </div>

      {/* 拖放结果展示 */}
      <div style={{ marginTop: '1rem' }}>
        {data.files.length > 0 && (
          <div>
            <h4>文件:</h4>
            <ul>
              {data.files.map((file, index) => (
                <li key={index}>
                  {file.name} ({file.type || '未知类型'})
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.text && (
          <div>
            <h4>文本:</h4>
            <div
              style={{
                padding: '0.5rem',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
                marginTop: '0.5rem',
                whiteSpace: 'pre-wrap'
              }}
            >
              {data.text}
            </div>
          </div>
        )}

        {data.uri && (
          <div>
            <h4>链接:</h4>
            <a 
              href={data.uri}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#3b82f6' }}
            >
              {data.uri}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}`,
};

// 导出示例组件
export const Examples = [
  {
    title: "文件拖放上传",
    example: <FileDropExample />,
    code: CODE_EXAMPLES.FileDropExample,
  },
  {
    title: "图片预览",
    example: <ImagePreviewDropExample />,
    code: CODE_EXAMPLES.ImagePreviewDropExample,
  },
  {
    title: "高级拖放处理",
    example: <AdvancedDropExample />,
    code: CODE_EXAMPLES.AdvancedDropExample,
  },
];
