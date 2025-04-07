/** @format */

import { Metadata } from "next";
import Link from "next/link";
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
import { ChevronRight, Calendar } from "lucide-react";
import { MarqueeDemo } from "@/components/Marquee";
export const metadata: Metadata = {
  title: "fluxp - 首页",
  description: "欢迎来到 fluxp，这是一个现代化的个人网站",
};

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">home</h1>
    </div>
  );
}
