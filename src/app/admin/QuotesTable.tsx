/** @format */

"use client";

import React, { useState } from "react";
import { Check, Edit, Plus, Trash2, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Quote {
  id: number;
  text: string;
  author: string;
  created_at?: string;
}

interface QuotesTableProps {
  quotes: Quote[];
  onSave: (quote: Omit<Quote, "created_at">) => Promise<void>;
  onDelete: (id: number) => void;
  isLoading?: boolean;
  onAdd: () => void;
}

// 抽取编辑操作按钮组件
const EditActions = ({
  onSave,
  onCancel,
  isDisabled,
}: {
  onSave: () => void;
  onCancel: () => void;
  isDisabled: boolean;
}) => (
  <div className="flex space-x-2">
    <Button size="icon" variant="ghost" onClick={onSave} disabled={isDisabled}>
      <Check className="h-4 w-4 text-green-600" />
    </Button>
    <Button size="icon" variant="ghost" onClick={onCancel}>
      <X className="h-4 w-4 text-red-600" />
    </Button>
  </div>
);

// 抽取行操作按钮组件
const RowActions = ({
  onEdit,
  onDelete,
  isDisabled,
}: {
  onEdit: () => void;
  onDelete: () => void;
  isDisabled: boolean;
}) => (
  <div className="flex space-x-2">
    <Button size="icon" variant="ghost" onClick={onEdit} disabled={isDisabled}>
      <Edit className="h-4 w-4 text-blue-600" />
    </Button>
    <Button
      size="icon"
      variant="ghost"
      onClick={onDelete}
      disabled={isDisabled}
    >
      <Trash2 className="h-4 w-4 text-red-600" />
    </Button>
  </div>
);

export default function QuotesTable({
  quotes,
  onSave,
  onDelete,
  isLoading = false,
  onAdd,
}: QuotesTableProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");
  const [editingAuthor, setEditingAuthor] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [newQuote, setNewQuote] = useState<{ text: string; author: string }>({
    text: "",
    author: "",
  });
  const [saving, setSaving] = useState<boolean>(false);

  // 处理长文本截断
  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  // 开始编辑
  const startEditing = (quote: Quote) => {
    setEditingId(quote.id);
    setEditingText(quote.text);
    setEditingAuthor(quote.author);
  };

  // 取消编辑
  const cancelEditing = () => {
    setEditingId(null);
  };

  // 保存编辑
  const saveEditing = async () => {
    if (editingId === null || !editingText || !editingAuthor) return;

    setSaving(true);
    await onSave({
      id: editingId,
      text: editingText,
      author: editingAuthor,
    });
    setSaving(false);
    setEditingId(null);
  };

  // 开始新增
  const startAdding = () => {
    setIsAdding(true);
    setNewQuote({ text: "", author: "" });
    onAdd();
  };

  // 取消新增
  const cancelAdding = () => {
    setIsAdding(false);
  };

  // 保存新增
  const saveNewQuote = async () => {
    if (!newQuote.text || !newQuote.author) return;

    setSaving(true);
    await onSave({
      id: 0, // 临时ID，后端会忽略并生成新ID
      text: newQuote.text,
      author: newQuote.author,
    });
    setSaving(false);
    setIsAdding(false);
    setNewQuote({ text: "", author: "" });
  };

  return (
    <div className="w-full rounded-md border">
      <div className="p-4 flex justify-between items-center border-b">
        <h3 className="text-lg font-medium">引言列表</h3>
        <Button onClick={startAdding} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          新增引言
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">作者</TableHead>
            <TableHead>引言</TableHead>
            <TableHead className="w-[120px]">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* 新增引言 */}
          {isAdding && (
            <TableRow className="bg-muted/50">
              <TableCell>
                <Input
                  value={newQuote.author}
                  onChange={(e) =>
                    setNewQuote({ ...newQuote, author: e.target.value })
                  }
                  placeholder="作者姓名"
                  className="w-full"
                  autoFocus
                />
              </TableCell>
              <TableCell>
                <Input
                  value={newQuote.text}
                  onChange={(e) =>
                    setNewQuote({ ...newQuote, text: e.target.value })
                  }
                  placeholder="引言内容"
                  className="w-full"
                />
              </TableCell>
              <TableCell>
                <EditActions
                  onSave={saveNewQuote}
                  onCancel={cancelAdding}
                  isDisabled={!newQuote.text || !newQuote.author || saving}
                />
              </TableCell>
            </TableRow>
          )}

          {/* 无数据时显示提示 */}
          {quotes.length === 0 && !isAdding ? (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center py-10 text-gray-500"
              >
                暂无引言数据
              </TableCell>
            </TableRow>
          ) : (
            quotes
              .sort((a, b) => b.id - a.id)
              .map((quote) => (
                <TableRow key={quote.id}>
                  <TableCell>
                    {editingId === quote.id ? (
                      <Input
                        value={editingAuthor}
                        onChange={(e) => setEditingAuthor(e.target.value)}
                        className="w-full"
                        autoFocus
                      />
                    ) : (
                      <Badge variant="outline">{quote.author}</Badge>
                    )}
                  </TableCell>
                  <TableCell className="max-w-[600px]">
                    {editingId === quote.id ? (
                      <Input
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="w-full"
                      />
                    ) : (
                      <div className="whitespace-normal break-words">
                        {truncateText(quote.text)}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === quote.id ? (
                      <EditActions
                        onSave={saveEditing}
                        onCancel={cancelEditing}
                        isDisabled={!editingText || !editingAuthor || saving}
                      />
                    ) : (
                      <RowActions
                        onEdit={() => startEditing(quote)}
                        onDelete={() => onDelete(quote.id)}
                        isDisabled={editingId !== null || saving}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
