"use client";

import { usePathname, useRouter } from "next/navigation";
import { BooksProvider, useBooks } from "./BooksContext";
import AnimatedList from "@/components/21-st/AnimatedList";

// 格式化文件大小的函数
const formatFileSize = (bytes?: number): string => {
  if (!bytes) return "";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
};

function BooksLayoutContent({ children }: { children: React.ReactNode }) {
  const { books, loading, error, preloadBook } = useBooks();
  const pathname = usePathname();
  const router = useRouter();

  // 从路径中提取当前选中的书籍ID
  const currentBookId = pathname.startsWith("/books/")
    ? decodeURIComponent(pathname.split("/")[2])
    : null;

  // 获取当前选中书籍的索引
  const currentBookIndex = books.findIndex(
    (book) => book.name === currentBookId
  );

  // 处理书籍选择
  const handleBookSelect = (_: string, index: number) => {
    const selectedBook = books[index];
    if (selectedBook) {
      router.push(`/books/${encodeURIComponent(selectedBook.name)}`);
    }
  };

  // 鼠标悬停时预加载书籍
  const handleMouseEnter = (index: number) => {
    if (books[index]) {
      preloadBook(books[index].name);
    }
  };

  // 格式化书籍信息为列表项
  const bookItems = books.map((book) => {
    const title = book.title || book.name.replace(".epub", "");
    return title;
  });

  // 为当前选中项添加特殊样式
  const getSelectedClass = (index: number) => {
    return index === currentBookIndex ? "bg-slate-700 hover:bg-slate-600" : "";
  };

  // 修改每个列表项的自定义组件或JSX
  const customItems = [
    ...bookItems,
    "这个实现保留了所有原有功能，同时通过使用AnimatedList组件大大提升了用户体验和视觉效果",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
    "Item 11",
    "Item 12",
    "Item 13",
    "Item 14",
    "Item 15",
  ].map((item, index) => {
    const isSelected = index === currentBookIndex;
    // 这里我们可以返回自定义的JSX而不是字符串，但AnimatedList不支持
    return item;
  });

  return (
    <div className="flex h-screen">
      {/* 左侧书籍列表 */}
      <div className="w-1/4 p-4 border-r overflow-hidden">
        <h2 className="text-xl font-bold mb-4">Books</h2>

        {loading ? (
          <div className="p-4">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
            </div>
          </div>
        ) : error ? (
          <p className="text-red-500 p-4">{error}</p>
        ) : books.length === 0 ? (
          <p className="p-4">
            没有找到书籍。请在Vercel Blob的books目录中添加EPUB文件。
          </p>
        ) : (
          <AnimatedList
            items={bookItems}
            onItemSelect={handleBookSelect}
            className="w-full animated-list-item"
            itemClassName=""
            enableArrowNavigation={true}
            initialSelectedIndex={currentBookIndex}
          />
        )}
      </div>

      {/* 右侧内容区域 */}
      <div className="w-3/4 h-full">{children}</div>
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
