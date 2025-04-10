/** @format */
"use client";
import React, { useState, useEffect, useRef } from "react";
import TextStream from "./TextStream";
import { MarqueeDemo } from "@/components/Marquee";
export default function DailyQuoteApp() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <TextStream />
      <MarqueeDemo />
    </div>
  );
}
