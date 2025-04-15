"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface Book {
  name: string;
  url: string;
  title: string;
  size?: number;
  uploadedAt?: string;
}

interface BooksContextType {
  books: Book[];
  loading: boolean;
  error: string | null;
  preloadBook: (bookId: string) => Promise<Book | null>;
  preloadedBooks: Record<string, Book>;
}

const BooksContext = createContext<BooksContextType>({
  books: [],
  loading: true,
  error: null,
  preloadBook: async () => null,
  preloadedBooks: {},
});

export function BooksProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [preloadedBooks, setPreloadedBooks] = useState<Record<string, Book>>(
    {}
  );

  useEffect(() => {
    async function fetchBooks() {
      try {
        setLoading(true);
        const response = await fetch("/api/books");

        if (!response.ok) {
          throw new Error("获取书籍列表失败");
        }

        const data = await response.json();
        setBooks(data.books);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("加载书籍列表失败");
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  // 预加载特定书籍
  const preloadBook = async (bookId: string): Promise<Book | null> => {
    // 如果已预加载，直接返回
    if (preloadedBooks[bookId]) {
      return preloadedBooks[bookId];
    }

    // 如果书籍列表已加载，直接从中查找
    if (books.length > 0) {
      const foundBook = books.find((b) => b.name === bookId);
      if (foundBook) {
        // 缓存已找到的书籍
        setPreloadedBooks((prev) => ({
          ...prev,
          [bookId]: foundBook,
        }));
        return foundBook;
      }
    }

    return null;
  };

  return (
    <BooksContext.Provider
      value={{ books, loading, error, preloadBook, preloadedBooks }}
    >
      {children}
    </BooksContext.Provider>
  );
}

export function useBooks() {
  return useContext(BooksContext);
}
