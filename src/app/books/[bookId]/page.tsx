"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { ReactReader } from "react-reader";
import { useParams } from "next/navigation";
import "../reader-styles.css";
import { useBooks, Book } from "../BooksContext";
import { Skeleton } from "@/components/ui/skeleton";

// EPUB阅读器组件
function EpubReader({
  book,
  initialLocation,
}: {
  book: Book;
  initialLocation: string | number | null;
}) {
  const [location, setLocation] = useState<string | number | null>(
    initialLocation
  );
  const readerContainerRef = useRef<HTMLDivElement>(null);
  // 保存阅读位置
  const locationChanged = (epubcifi: string) => {
    setLocation(epubcifi);
    localStorage.setItem(`epub-location-${book.name}`, epubcifi);
  };

  return (
    <div className="h-full reader-container" ref={readerContainerRef}>
      <ReactReader
        url={book.url}
        title={book.title || book.name.replace(".epub", "")}
        location={location}
        locationChanged={locationChanged}
        showToc={true}
        epubOptions={{
          flow: "scrolled",
          manager: "continuous",
        }}
        swipeable={false}
      />
    </div>
  );
}

// 书籍页面组件
export default function BookPage() {
  const { bookId } = useParams();
  const { books, loading, error, preloadBook, preloadedBooks } = useBooks();
  const [book, setBook] = useState<Book | null>(null);
  const [bookLoading, setBookLoading] = useState(true);
  const [bookError, setBookError] = useState<string | null>(null);
  const [initialLocation, setInitialLocation] = useState<
    string | number | null
  >(null);

  // 获取特定书籍的信息
  useEffect(() => {
    async function loadBook() {
      if (!bookId) return;

      try {
        setBookLoading(true);

        // 尝试从预加载的书籍中获取
        const decodedBookId = decodeURIComponent(bookId as string);

        // 首先检查预加载的书籍
        if (preloadedBooks[decodedBookId]) {
          const book = preloadedBooks[decodedBookId];
          setBook(book);

          // 恢复上次阅读位置
          const savedLocation = localStorage.getItem(
            `epub-location-${book.name}`
          );
          if (savedLocation) setInitialLocation(savedLocation);

          setBookLoading(false);
          return;
        }

        // 如果books数组为空且加载中，则等待books加载完成再继续
        if (books.length === 0 && loading) {
          // 保持bookLoading为true，退出当前执行，等待books加载完成后的useEffect重新触发
          return;
        }

        // 从已加载的书籍列表中查找
        if (books.length > 0) {
          const foundBook = books.find((b) => b.name === decodedBookId);
          if (foundBook) {
            setBook(foundBook);

            // 恢复上次阅读位置
            const savedLocation = localStorage.getItem(
              `epub-location-${foundBook.name}`
            );
            if (savedLocation) setInitialLocation(savedLocation);

            setBookLoading(false);
            return;
          }
        }

        // 最后尝试预加载
        const foundBook = await preloadBook(decodedBookId);
        if (foundBook) {
          setBook(foundBook);

          // 恢复上次阅读位置
          const savedLocation = localStorage.getItem(
            `epub-location-${foundBook.name}`
          );
          if (savedLocation) setInitialLocation(savedLocation);
        } else {
          setBookError("找不到指定的书籍");
        }
      } catch (err) {
        console.error("Error loading book:", err);
        setBookError("加载书籍失败");
      } finally {
        setBookLoading(false);
      }
    }

    loadBook();
  }, [bookId, books, loading, preloadBook, preloadedBooks]);

  // 全局加载状态 - 书籍列表尚未加载完成
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div>
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-40 w-64" />
        </div>
      </div>
    );
  }

  // 全局错误
  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // 书籍特定加载状态 - 书籍列表已加载，正在加载特定书籍
  if (bookLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-full h-full">
          <div className="flex flex-col items-center justify-center h-full">
            <Skeleton className="h-6 w-48 mb-4" />
            <Skeleton className="h-[80%] w-[90%]" />
          </div>
        </div>
      </div>
    );
  }

  // 书籍特定错误
  if (bookError || !book) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">{bookError || "书籍不存在"}</p>
      </div>
    );
  }

  // 渲染EPUB阅读器
  return <EpubReader book={book} initialLocation={initialLocation} />;
}
