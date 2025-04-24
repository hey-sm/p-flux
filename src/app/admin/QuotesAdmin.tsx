/** @format */

"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import QuotesTable from "./QuotesTable";

interface Quote {
  id: number;
  text: string;
  author: string;
  created_at?: string;
}

// 定义API调用类型
type ApiMethod = "GET" | "POST" | "PUT" | "DELETE";

export default function QuotesAdmin() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // 通用API请求函数
  const apiRequest = async <T,>(
    method: ApiMethod,
    endpoint: string,
    body?: Record<string, unknown>,
    errorMessage?: string
  ): Promise<T> => {
    try {
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (body && method !== "GET") {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(endpoint, options);

      if (!response.ok) {
        throw new Error(errorMessage || `请求失败 (${response.status})`);
      }

      return await response.json();
    } catch (err) {
      throw new Error(
        errorMessage ||
          "请求出错：" + (err instanceof Error ? err.message : String(err))
      );
    }
  };

  // 获取所有引言
  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const data = await apiRequest<{ quotes: Quote[] }>(
        "GET",
        "/api/quotes",
        undefined,
        "获取引言失败"
      );
      setQuotes(data.quotes);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  // 初始化加载
  useEffect(() => {
    fetchQuotes();
  }, []);

  // 保存引言（新增或更新）
  const handleSaveQuote = async (quote: Omit<Quote, "created_at">) => {
    try {
      setIsSaving(true);
      const isNew = quote.id === 0;
      const method = isNew ? "POST" : "PUT";
      const errorMsg = isNew ? "添加引言失败" : "更新引言失败";

      await apiRequest(method, "/api/quotes", quote, errorMsg);

      await fetchQuotes();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsSaving(false);
    }
  };

  // 删除引言
  const deleteQuote = async (id: number) => {
    if (!confirm("确定要删除这条引言吗？")) return;

    try {
      setIsSaving(true);
      await apiRequest("DELETE", "/api/quotes", { id }, "删除引言失败");

      await fetchQuotes();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsSaving(false);
    }
  };

  // 处理新增引言
  const handleAddQuote = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 过滤引言
  const filteredQuotes = quotes.filter((quote) => {
    const term = searchTerm.toLowerCase();
    return (
      quote.text.toLowerCase().includes(term) ||
      quote.author.toLowerCase().includes(term)
    );
  });

  if (error) {
    return (
      <div className="bg-red-50 border border-red-300 text-red-700 p-4 rounded-md mb-6">
        <p className="font-medium">发生错误</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 顶部操作栏 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold">引言管理</h2>
        <div className="relative flex-1 sm:flex-initial max-w-sm">
          <Input
            type="text"
            placeholder="搜索引言或作者..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
      </div>

      {/* 引言表格 */}
      <QuotesTable
        quotes={filteredQuotes}
        onSave={handleSaveQuote}
        onDelete={deleteQuote}
        onAdd={handleAddQuote}
        isLoading={loading}
      />
    </div>
  );
}
