/** @format */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { ResponseStream } from "@/components/ui/response-stream";
import quotesData from "@/app/about/quotes.json";

export default function TextStream() {
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [showAuthor, setShowAuthor] = useState(false);
  const [key, setKey] = useState(0);
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
    setKey((prev) => prev + 1);
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
    <div
      className="
          flex flex-col items-center justify-center
          w-full max-w-3xl mx-auto 
          italic  md:text-lg text-gray-400 
          px-5 md:px-6
        "
      onClick={getNextQuote}
    >
      <ResponseStream
        key={`quote-${key}`}
        textStream={quote.text}
        className="whitespace-pre-wrap  hover:cursor-pointer select-none mb-2"
        speed={5}
        onComplete={handleQuoteComplete}
      />
      {showAuthor && quote.author && (
        <div className="text-right w-full">
          <ResponseStream
            key={`author-${key}`}
            textStream={"-- " + quote.author}
            className="hover:cursor-pointer select-none inline-block"
            speed={5}
          />
        </div>
      )}
    </div>
  );
}
