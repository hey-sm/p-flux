/** @format */
"use client";
import React, { useState, useEffect, useRef } from "react";
import TextStream from "./TextStream";
import { MarqueeDemo } from "@/components/Marquee";
import Link from "next/link";
import { SettingsIcon } from "lucide-react";

export default function DailyQuoteApp() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      <TextStream />
      <MarqueeDemo />
    </div>
  );
}
