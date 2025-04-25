"use client";

import { usePathname, useRouter } from "next/navigation";
import { BooksProvider, useBooks } from "./BooksContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

function BooksLayoutContent({ children }: { children: React.ReactNode }) {
  const { books, loading, error, preloadBook } = useBooks();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // 从路径中提取当前选中的书籍ID
  const currentBookId = pathname.startsWith("/books/")
    ? decodeURIComponent(pathname.split("/")[2])
    : null;

  // 获取当前选中书籍的索引
  const currentBookIndex = books.findIndex(
    (book) => book.name === currentBookId
  );

  // 处理书籍选择
  const handleBookSelect = (bookName: string) => {
    router.push(`/books/${encodeURIComponent(bookName)}`);
  };

  // 鼠标悬停时预加载书籍
  const handleMouseEnter = (bookName: string) => {
    preloadBook(bookName);
  };

  // 切换侧边栏显示/隐藏
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="flex h-screen">
      {/* 左侧区域 - 包含书籍列表或触发区域 */}
      {sidebarVisible ? (
        <div className="w-64 p-4 border-r overflow-hidden transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Books</h2>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-slate-200 w-8 h-8 flex items-center justify-center"
              title="隐藏侧边栏"
            >
              <i className="icon-[mdi--chevron-left] w-4 h-4"></i>
            </button>
          </div>

          <ScrollArea className="h-[calc(100vh-130px)]">
            {loading ? (
              <div className="p-4">
                <Skeleton className="h-4 w-3/4 mb-4" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-4 w-2/3 mb-4" />
              </div>
            ) : (
              <div className="space-y-1">
                {books.map((book, index) => {
                  // 处理书名，去除随机后缀
                  const cleanTitle = book.title
                    .split("-")[0]
                    .replace(".epub", "");
                  const isSelected = index === currentBookIndex;
                  return (
                    <div
                      key={book.name}
                      className={`p-2 rounded-md cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-slate-500 hover:bg-slate-300 text-white"
                          : "hover:bg-slate-200 dark:hover:bg-slate-400"
                      }`}
                      onClick={() => handleBookSelect(book.name)}
                      onMouseEnter={() => handleMouseEnter(book.name)}
                    >
                      <p className="text-sm">{cleanTitle}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </div>
      ) : (
        <div
          className="w-2 h-full cursor-pointer hover:bg-slate-100 transition-colors"
          onMouseEnter={toggleSidebar}
          title="显示侧边栏"
        />
      )}

      {/* 右侧内容区域 */}
      <div className="flex-1 h-full">
        <div className="h-full">{children}</div>
      </div>
    </div>
  );
}

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 包装整个布局，提供Context
  return (
    <BooksProvider>
      <BooksLayoutContent>{children}</BooksLayoutContent>
    </BooksProvider>
  );
}
