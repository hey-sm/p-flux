"use client";

import React, { useState, useEffect } from "react";
import { PlusCircle, X, Save, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import QuotesTable from "./QuotesTable";

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
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Input
              type="text"
              placeholder="搜索引言或作者..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-64"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
          <Button
            onClick={addNewQuote}
            disabled={isAddingNew || editingId !== null || isSaving}
            className="flex items-center gap-2"
          >
            <PlusCircle size={18} />
            添加
          </Button>
        </div>
      </div>

      {/* 编辑表单 */}
      {editingId !== null && (
        <Card>
          <CardHeader>
            <CardTitle>编辑引言</CardTitle>
            <CardDescription>修改引言内容和作者信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="block font-medium text-sm">引言内容：</label>
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <label className="block font-medium text-sm">作者：</label>
              <Input
                type="text"
                value={editAuthor}
                onChange={(e) => setEditAuthor(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={cancelEdit}>
              <X size={16} className="mr-1" />
              取消
            </Button>
            <Button
              onClick={updateQuote}
              disabled={!editText.trim() || !editAuthor.trim() || isSaving}
            >
              <Save size={16} className="mr-1" />
              保存
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* 添加新引言表单 */}
      {isAddingNew && (
        <Card>
          <CardHeader>
            <CardTitle>添加新引言</CardTitle>
            <CardDescription>填写引言内容和作者信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="block font-medium text-sm">引言内容：</label>
              <textarea
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="请输入引言内容..."
              />
            </div>
            <div className="space-y-2">
              <label className="block font-medium text-sm">作者：</label>
              <Input
                type="text"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                placeholder="请输入作者..."
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={cancelAdd}>
              <X size={16} className="mr-1" />
              取消
            </Button>
            <Button
              onClick={addQuote}
              disabled={!newText.trim() || !newAuthor.trim() || isSaving}
            >
              <Save size={16} className="mr-1" />
              保存
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* 引言表格 */}
      <QuotesTable
        quotes={filteredQuotes}
        onEdit={startEditing}
        onDelete={deleteQuote}
        isLoading={loading}
      />

      {/* 加载中遮罩 */}
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
