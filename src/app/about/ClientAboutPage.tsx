"use client";
import React from "react";
import TextStream from "./TextStream";

interface Quote {
  id: number;
  text: string;
  author: string;
  created_at?: string;
}

interface ClientAboutPageProps {
  initialQuotes: Quote[];
}

// 客户端组件，接收服务端预获取的数据
export default function ClientAboutPage({
  initialQuotes,
}: ClientAboutPageProps) {
  return (
    <div>
      <TextStream initialQuotes={initialQuotes} />
    </div>
  );
}
