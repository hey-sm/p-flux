/** @format */
import React from "react";
import { Suspense } from "react";
import ClientAboutPage from "./ClientAboutPage";

// 服务端组件，用于预获取数据
export default async function AboutPage() {
  // 构建完整的绝对URL
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const apiUrl = `${baseUrl}/api/quotes`;

  // 服务端预获取引言数据
  const res = await fetch(apiUrl);
  const data = await res.json();

  return (
    <div className="about-page">
      <Suspense
        fallback={
          <div className="text-center p-10 animate-pulse">加载引言中...</div>
        }
      >
        {/* 将预获取的数据传递给客户端组件 */}
        <ClientAboutPage initialQuotes={data.quotes} />
      </Suspense>
    </div>
  );
}
