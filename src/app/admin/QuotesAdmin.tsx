"use client";

import React, { useState, useEffect } from "react";
import { PlusCircle, Edit2, Trash2, Save, X, Search } from "lucide-react";

interface Quote {
  id: number;
  text: string;
  author: string;
  created_at?: string;
}

export default function QuotesAdmin() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newText, setNewText] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // 获取所有引言
  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/quotes");
      if (!response.ok) {
        throw new Error("获取引言失败");
      }
      const data = await response.json();
      setQuotes(data.quotes);
      setError(null);
    } catch (err) {
      setError(
        "获取引言时出错：" + (err instanceof Error ? err.message : String(err))
      );
    } finally {
      setLoading(false);
    }
  };

  // 初始化加载
  useEffect(() => {
    fetchQuotes();
  }, []);

  // 添加新引言
  const addQuote = async () => {
    if (!newText.trim() || !newAuthor.trim()) return;

    try {
      setIsSaving(true);
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newText.trim(),
          author: newAuthor.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("添加引言失败");
      }

      // 重新获取引言列表以获取最新数据
      await fetchQuotes();

      // 重置表单
      setNewText("");
      setNewAuthor("");
      setIsAddingNew(false);
      setError(null);
    } catch (err) {
      setError(
        "添加引言时出错：" + (err instanceof Error ? err.message : String(err))
      );
    } finally {
      setIsSaving(false);
    }
  };

  // 开始编辑引言
  const startEditing = (quote: Quote) => {
    setEditingId(quote.id);
    setEditText(quote.text);
    setEditAuthor(quote.author);
  };

  // 更新引言
  const updateQuote = async () => {
    if (editingId === null || !editText.trim() || !editAuthor.trim()) return;

    try {
      setIsSaving(true);
      const response = await fetch("/api/quotes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingId,
          text: editText.trim(),
          author: editAuthor.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("更新引言失败");
      }

      // 重新获取引言列表
      await fetchQuotes();

      // 重置编辑状态
      setEditingId(null);
      setEditText("");
      setEditAuthor("");
      setError(null);
    } catch (err) {
      setError(
        "更新引言时出错：" + (err instanceof Error ? err.message : String(err))
      );
    } finally {
      setIsSaving(false);
    }
  };

  // 取消编辑
  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
    setEditAuthor("");
  };

  // 删除引言
  const deleteQuote = async (id: number) => {
    if (!confirm("确定要删除这条引言吗？")) return;

    try {
      setIsSaving(true);
      const response = await fetch("/api/quotes", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("删除引言失败");
      }

      // 重新获取引言列表
      await fetchQuotes();
      setError(null);
    } catch (err) {
      setError(
        "删除引言时出错：" + (err instanceof Error ? err.message : String(err))
      );
    } finally {
      setIsSaving(false);
    }
  };

  // 添加新引言
  const addNewQuote = () => {
    setIsAddingNew(true);
    setNewText("");
    setNewAuthor("");
  };

  // 取消添加
  const cancelAdd = () => {
    setIsAddingNew(false);
    setNewText("");
    setNewAuthor("");
  };

  // 过滤引言
  const filteredQuotes = quotes.filter((quote) => {
    const term = searchTerm.toLowerCase();
    return (
      quote.text.toLowerCase().includes(term) ||
      quote.author.toLowerCase().includes(term)
    );
  });

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>正在加载引言数据...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-300 text-red-700 p-4 rounded-md mb-6">
        <p className="font-medium">发生错误</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold">引言管理</h2>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <input
              type="text"
              placeholder="搜索引言或作者..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-64 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
          <button
            onClick={addNewQuote}
            disabled={isAddingNew || editingId !== null || isSaving}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50 transition-colors"
          >
            <PlusCircle size={18} />
            添加
          </button>
        </div>
      </div>

      {/* 添加新引言的表单 */}
      {isAddingNew && (
        <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
          <h3 className="text-lg font-semibold mb-3">添加新引言</h3>
          <div className="mb-3">
            <label className="block mb-2 font-medium text-gray-700">
              引言内容：
            </label>
            <textarea
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="请输入引言内容..."
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">
              作者：
            </label>
            <input
              type="text"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入作者..."
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={cancelAdd}
              className="flex items-center gap-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors"
            >
              <X size={16} />
              取消
            </button>
            <button
              onClick={addQuote}
              disabled={!newText.trim() || !newAuthor.trim() || isSaving}
              className="flex items-center gap-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md disabled:opacity-50 transition-colors"
            >
              <Save size={16} />
              保存
            </button>
          </div>
        </div>
      )}

      {/* 引言列表 */}
      {filteredQuotes.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          {searchTerm ? "没有找到匹配的引言" : "还没有添加任何引言"}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQuotes.map((quote) => (
            <div
              key={quote.id}
              className="p-4 border border-gray-200 rounded-md hover:border-gray-300 transition-colors"
            >
              {editingId === quote.id ? (
                <div>
                  <div className="mb-3">
                    <label className="block mb-2 font-medium text-gray-700">
                      引言内容：
                    </label>
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium text-gray-700">
                      作者：
                    </label>
                    <input
                      type="text"
                      value={editAuthor}
                      onChange={(e) => setEditAuthor(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={cancelEdit}
                      className="flex items-center gap-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors"
                    >
                      <X size={16} />
                      取消
                    </button>
                    <button
                      onClick={updateQuote}
                      disabled={
                        !editText.trim() || !editAuthor.trim() || isSaving
                      }
                      className="flex items-center gap-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md disabled:opacity-50 transition-colors"
                    >
                      <Save size={16} />
                      保存
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="mb-2 text-gray-700 whitespace-pre-wrap">
                    {quote.text}
                  </p>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <p className="italic text-gray-600">— {quote.author}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditing(quote)}
                        disabled={editingId !== null || isSaving}
                        className="text-blue-500 hover:text-blue-700 p-1 disabled:opacity-50 transition-colors"
                        title="编辑"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteQuote(quote.id)}
                        disabled={editingId !== null || isSaving}
                        className="text-red-500 hover:text-red-700 p-1 disabled:opacity-50 transition-colors"
                        title="删除"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {isSaving && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-center">保存中...</p>
          </div>
        </div>
      )}
    </div>
  );
}
