/** @format */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { ResponseStream } from "@/components/ui/response-stream";
import { LampContainer } from "@/components/ui/lamp";

interface Quote {
  id: number;
  text: string;
  author: string;
  created_at?: string;
}

interface TextStreamProps {
  initialQuotes?: Quote[];
}

export default function TextStream({ initialQuotes = [] }: TextStreamProps) {
  const [quote, setQuote] = useState<Quote>({ id: 0, text: "", author: "" });
  const [showAuthor, setShowAuthor] = useState(false);
  const [key, setKey] = useState(0);
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [loading, setLoading] = useState(initialQuotes.length === 0);

  const usedQuotesRef = useRef(new Set<number>());
  const isMountedRef = useRef(true);

  // 只有在没有初始数据时才需要获取数据
  useEffect(() => {
    // 如果已经有初始数据，直接显示
    if (initialQuotes.length > 0) {
      if (!quote.id) {
        getNextQuote(initialQuotes);
      }
      return;
    }

    // 否则从API获取数据
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/quotes");
        if (!response.ok) {
          throw new Error("获取引言失败");
        }
        const data = await response.json();
        if (isMountedRef.current && data.quotes && data.quotes.length > 0) {
          setQuotes(data.quotes);
          getNextQuote(data.quotes);
        }
      } catch (error) {
        console.error("获取引言失败:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();

    return () => {
      isMountedRef.current = false;
    };
  }, [initialQuotes]);

  // 获取新引言
  const getNextQuote = (quotesList = quotes) => {
    if (quotesList.length === 0) return { id: 0, text: "", author: "" };

    // 如果所有引言都已使用，重置
    if (usedQuotesRef.current.size >= quotesList.length) {
      usedQuotesRef.current.clear();
    }

    // 找到未使用的引言
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * quotesList.length);
    } while (usedQuotesRef.current.has(randomIndex));

    usedQuotesRef.current.add(randomIndex);
    const newQuote = quotesList[randomIndex];
    setQuote(newQuote);
    setShowAuthor(false);
    setKey((prev) => prev + 1);
    return newQuote;
  };

  // 引言显示完成的回调
  const handleQuoteComplete = () => {
    setShowAuthor(true);
  };

  return (
    <LampContainer key={key}>
      <div
        className="
          flex flex-col items-center justify-center
          w-full max-w-3xl mx-auto min-h-[200px]
          italic md:text-lg text-gray-400 
          px-5 md:px-6
        "
        onClick={() => getNextQuote()}
      >
        {loading ? (
          <div className="text-center animate-pulse">加载中...</div>
        ) : (
          <>
            <div className="flex items-center justify-center w-full">
              <ResponseStream
                textStream={quote.text}
                className="whitespace-pre-wrap hover:cursor-pointer select-none mb-2"
                speed={5}
                onComplete={handleQuoteComplete}
              />
            </div>
            {showAuthor && quote.author && (
              <div className="text-right w-full">
                <ResponseStream
                  textStream={"-- " + quote.author}
                  className="hover:cursor-pointer select-none inline-block"
                  speed={5}
                />
              </div>
            )}
          </>
        )}
      </div>
    </LampContainer>
  );
}
