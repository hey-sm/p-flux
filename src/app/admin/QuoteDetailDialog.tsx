"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Eye } from "lucide-react";

interface Quote {
  id: number;
  text: string;
  author: string;
  created_at?: string;
}

interface QuoteDetailDialogProps {
  quote: Quote;
  trigger?: React.ReactNode;
}

export default function QuoteDetailDialog({
  quote,
  trigger,
}: QuoteDetailDialogProps) {
  // 格式化日期
  const formatDate = (dateString?: string) => {
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon" title="查看详情">
            <Eye className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>引言详情</DialogTitle>
          <DialogDescription>
            ID: {quote.id} · 由 <Badge>{quote.author}</Badge> 提供
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-muted/50 p-4 rounded-md">
            <p className="whitespace-pre-wrap text-foreground">{quote.text}</p>
          </div>

          {quote.created_at && (
            <div className="flex items-center text-muted-foreground text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              <span>添加于 {formatDate(quote.created_at)}</span>
            </div>
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              关闭
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
