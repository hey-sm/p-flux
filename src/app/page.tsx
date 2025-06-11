/** @format */

import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Zap, Code, Rocket } from "lucide-react";
import { MarqueeDemo } from "@/components/Marquee";

export const metadata: Metadata = {
  title: "fluxp - 首页",
  description: "欢迎来到 fluxp，这是一个现代化的个人网站",
};

export default function HomePage() {
  return (
    <div className="bg-background text-foreground animate-fadeIn">
      <main className="container mx-auto px-4 md:px-6 py-12 md:py-24 lg:py-32">
        {/* Hero Section */}
        <section className="text-center py-16 md:py-24 lg:py-32 animate-slideUp">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            fluxp
          </h1>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mb-8">
            一个充满激情的前端开发者，致力于构建美观、实用的用户界面和体验。
          </p>
        </section>

        {/* Marquee Section */}
        <section className="flex justify-center items-center">
          <MarqueeDemo />
        </section>

        {/* Features/Cards Section */}
        <section className="py-16 md:py-24">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="transform hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-primary/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">前沿技术</CardTitle>
                <Zap className="w-6 h-6 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  紧跟行业趋势，使用 React、Next.js、TypeScript
                  等现代技术栈进行开发。
                </p>
              </CardContent>
            </Card>
            <Card className="transform hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-primary/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">精美设计</CardTitle>
                <Code className="w-6 h-6 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  注重 UI/UX 设计，热衷于创造像素完美、用户友好的界面。
                </p>
              </CardContent>
            </Card>
            <Card className="transform hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-primary/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">性能优化</CardTitle>
                <Rocket className="w-6 h-6 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  追求极致性能，通过代码分割、懒加载等技术，让网站飞起来。
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
