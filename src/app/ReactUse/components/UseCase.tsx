"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface UseCaseProps {
  title?: string;
  children: React.ReactNode;
  codeExample: string;
}

export default function UseCase({
  title,
  children,
  codeExample,
}: UseCaseProps) {
  return (
    <div className="space-y-2">
      <h5 className="text-lg font-bold tracking-tight">
        {title || `使用场景`}
      </h5>
      <Tabs defaultValue="demo" className="w-full">
        <TabsList>
          <TabsTrigger value="demo">示例</TabsTrigger>
          <TabsTrigger value="code">代码</TabsTrigger>
        </TabsList>
        <TabsContent value="demo" className="p-4 border rounded-md mt-2">
          <div className="max-w-3xl mx-auto">{children}</div>
        </TabsContent>
        <TabsContent value="code" className="p-4 border rounded-md mt-2">
          <pre className="p-4 bg-muted rounded-md overflow-auto max-h-[500px]">
            <code className="text-sm">{codeExample}</code>
          </pre>
        </TabsContent>
      </Tabs>
    </div>
  );
}
