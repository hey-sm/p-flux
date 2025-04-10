/** @format */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { ResponseStream } from "@/components/ui/response-stream";
import quotesData from "@/app/about/quotes.json";

export default function DailyQuoteApp() {
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [showAuthor, setShowAuthor] = useState(false);
  const usedQuotesRef = useRef(new Set());

  // 获取新引言
  const getNextQuote = () => {
    // 如果所有引言都已使用，重置
    if (usedQuotesRef.current.size >= quotesData.length) {
      usedQuotesRef.current.clear();
    }

    // 找到未使用的引言
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * quotesData.length);
    } while (usedQuotesRef.current.has(randomIndex));

    usedQuotesRef.current.add(randomIndex);
    const newQuote = quotesData[randomIndex];
    setQuote(newQuote);
    setShowAuthor(false);
    return newQuote;
  };

  // 引言显示完成的回调
  const handleQuoteComplete = () => {
    setShowAuthor(true);
  };

  // 初始化
  useEffect(() => {
    getNextQuote();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-emerald-700">
      <div
        className="flex flex-col items-center justify-center p-[min(5em,8%)] min-w-[280px] max-w-[60vw]"
        onClick={getNextQuote}
      >
        <ResponseStream
          textStream={quote.text}
          className="text-lg text-gray-400 whitespace-pre-wrap italic hover:cursor-pointer select-none mb-2"
          fadeDuration={1200}
          onComplete={handleQuoteComplete}
        />
        {showAuthor && quote.author && (
          <div className="text-right w-full">
            <ResponseStream
              textStream={"- " + quote.author}
              className="text-lg text-gray-400 italic hover:cursor-pointer select-none inline-block"
              fadeDuration={1200}
            />
          </div>
        )}
      </div>
    </div>
  );
}
