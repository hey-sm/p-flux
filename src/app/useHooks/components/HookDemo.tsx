"use client";

import React from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ExternalLink, Github } from "lucide-react";
import HookScenario from "./HookScenario";

// 场景类型定义
export interface HookScenario {
  title?: string;
  demo: React.ReactNode;
  code: string;
}

interface HookDemoProps {
  id: string;
  name: string;
  description: string;
  category: string;
  scenarios: HookScenario[];
  docsLink?: string;
  githubLink?: string;
}

export default function HookDemo({
  id,
  name,
  description,
  category,
  scenarios,
  docsLink,
  githubLink,
}: HookDemoProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-2">
            <Link href="/useHooks">
              <ChevronLeft className="mr-2 h-4 w-4" />
              返回首页
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Badge>{category}</Badge>
            {docsLink && (
              <a
                href={docsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline inline-flex items-center"
              >
                文档 <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            )}
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline inline-flex items-center"
              >
                源码 <Github className="ml-1 h-3 w-3" />
              </a>
            )}
          </div>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl">
            {description}
          </p>
        </div>
      </div>

      {/* 动态渲染场景 */}
      {scenarios.map((scenario, index) => (
        <HookScenario
          key={index}
          title={scenario.title}
          index={index}
          codeExample={scenario.code}
        >
          {scenario.demo}
        </HookScenario>
      ))}
    </div>
  );
}
