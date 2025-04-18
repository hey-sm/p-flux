"use client";

import React, { useState } from "react";
import { Edit2, Trash2, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "lucide-react";

interface Quote {
  id: number;
  text: string;
  author: string;
  created_at?: string;
}

interface QuotesTableProps {
  quotes: Quote[];
  onEdit: (quote: Quote) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

export default function QuotesTable({
  quotes,
  onEdit,
  onDelete,
  isLoading = false,
}: QuotesTableProps) {
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  // 处理长文本截断
  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  // 格式化日期
  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // 详细日期格式化
  const formatDetailDate = (dateString?: string) => {
    if (!dateString) return "未知日期";
    const date = new Date(dateString);
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 查看详情
  const viewDetail = (quote: Quote) => {
    setSelectedQuote(quote);
  };

  if (isLoading) {
    return (
      <div className="w-full py-10 text-center">
        <div className="animate-pulse">加载引言数据中...</div>
      </div>
    );
  }

  if (quotes.length === 0) {
    return (
      <div className="w-full py-10 text-center text-gray-500">暂无引言数据</div>
    );
  }

  return (
    <div className="w-full rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">ID</TableHead>
            <TableHead className="w-[300px]">引言</TableHead>
            <TableHead className="w-[150px]">作者</TableHead>
            <TableHead className="w-[120px]">添加日期</TableHead>
            <TableHead className="w-[120px] text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quotes.map((quote) => (
            <TableRow key={quote.id}>
              <TableCell className="font-medium">{quote.id}</TableCell>
              <TableCell className="max-w-[300px]">
                <div className="whitespace-normal break-words">
                  {truncateText(quote.text)}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{quote.author}</Badge>
              </TableCell>
              <TableCell>{formatDate(quote.created_at)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => viewDetail(quote)}
                        title="查看详情"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                      <SheetHeader>
                        <SheetTitle>引言详情</SheetTitle>
                        <SheetDescription>
                          ID: {selectedQuote?.id} · 由{" "}
                          <Badge>{selectedQuote?.author}</Badge> 提供
                        </SheetDescription>
                      </SheetHeader>
                      <Separator className="my-4" />
                      <div className="space-y-4 py-4">
                        <Card>
                          <CardContent className="pt-6">
                            <p className="whitespace-pre-wrap text-foreground">
                              {selectedQuote?.text}
                            </p>
                          </CardContent>
                        </Card>

                        {selectedQuote?.created_at && (
                          <div className="flex items-center text-muted-foreground text-sm">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>
                              添加于{" "}
                              {formatDetailDate(selectedQuote?.created_at)}
                            </span>
                          </div>
                        )}
                      </div>
                      <SheetFooter>
                        <SheetClose asChild>
                          <Button type="button" variant="secondary">
                            关闭
                          </Button>
                        </SheetClose>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(quote)}
                    title="编辑"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(quote.id)}
                    title="删除"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
