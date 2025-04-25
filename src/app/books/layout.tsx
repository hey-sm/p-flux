"use client";

import { usePathname, useRouter } from "next/navigation";
import { BooksProvider, useBooks, Book } from "./BooksContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useRef, useEffect } from "react";

function BooksLayoutContent({ children }: { children: React.ReactNode }) {
  const { books, loading, error, preloadBook } = useBooks();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

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
    setSearchVisible(false);
  };

  // 鼠标悬停时预加载书籍
  const handleMouseEnter = (bookName: string) => {
    preloadBook(bookName);
  };

  // 切换侧边栏显示/隐藏
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // 切换搜索框显示/隐藏
  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    // 如果显示搜索框，则聚焦输入框
    if (!searchVisible) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  // 处理搜索输入
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    // 搜索匹配的书籍
    const results = books.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  // 点击外部关闭搜索框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchVisible(false);
      }
    };

    if (searchVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchVisible]);

  return (
    <div className="flex h-screen">
      {/* 左侧区域 - 包含书籍列表或触发区域 */}
      {sidebarVisible ? (
        <div className="w-64 p-4 border-r overflow-hidden transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Books</h2>
            <div className="flex items-center">
              <button
                onClick={toggleSearch}
                className="p-2 rounded-full hover:bg-slate-200 w-8 h-8 flex items-center justify-center mr-1"
                title="搜索书籍"
              >
                <i className="icon-[mdi--magnify] w-4 h-4"></i>
              </button>
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-full hover:bg-slate-200 w-8 h-8 flex items-center justify-center"
                title="隐藏侧边栏"
              >
                <i className="icon-[mdi--chevron-left] w-4 h-4"></i>
              </button>
            </div>
          </div>

          {/* 搜索框 */}
          {searchVisible && (
            <div ref={searchContainerRef} className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="icon-[mdi--magnify] w-4 h-4 text-gray-400"></i>
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={handleSearchInput}
                placeholder="搜索书籍..."
                className="w-full pl-10 pr-4 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300"
              />
              {searchResults.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                  {searchResults.map((book) => {
                    const cleanTitle = book.title
                      .split("-")[0]
                      .replace(".epub", "");
                    return (
                      <div
                        key={book.name}
                        className="p-2 hover:bg-slate-100 cursor-pointer"
                        onClick={() => handleBookSelect(book.name)}
                      >
                        <p className="text-sm">{cleanTitle}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

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
