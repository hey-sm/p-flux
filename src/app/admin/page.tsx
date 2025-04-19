/** @format */

"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuotesAdmin from "./QuotesAdmin";
import Link from "next/link";
import { ArrowLeft, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await signOut({ redirect: true, callbackUrl: "/login" });
    } catch (error) {
      console.error("登出错误:", error);
      setLoggingOut(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">fluxp</h1>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={handleLogout}
            disabled={loggingOut}
          >
            <LogOut size={16} />
            {loggingOut ? "登出中..." : "登出"}
          </Button>
        </div>
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={16} />
            返回首页
          </Link>
        </div>
      </div>

      <Tabs defaultValue="quotes" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="quotes">引言管理</TabsTrigger>
          <TabsTrigger value="settings">系统设置</TabsTrigger>
        </TabsList>

        <TabsContent value="quotes">
          <QuotesAdmin />
        </TabsContent>

        <TabsContent value="settings">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">系统设置</h2>
            <p className="text-gray-500">系统设置功能正在开发中...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
