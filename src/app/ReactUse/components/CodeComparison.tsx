"use client";

import React from "react";
import { CodeComparison } from "@/components/ui/code-comparison";

interface TitleComparisonProps {
  beforeCode: string;
  afterCode: string;
  language?: string;
  filename?: string;
}

/**
 * 可复用的Hook对比组件 - 显示标题和代码对比
 */
export default function TitleComparison({
  beforeCode,
  afterCode,
  language = "tsx",
  filename = "",
}: TitleComparisonProps) {
  return (
    <div className="space-y-4">
      <h5 className="text-lg font-bold tracking-tight">原生实现</h5>
      <CodeComparison
        beforeCode={beforeCode}
        afterCode={afterCode}
        language={language}
        filename={filename}
        lightTheme="github-light"
        darkTheme="github-dark"
      />
    </div>
  );
}
