/** @format */
"use client";
import Link from "next/link";
import React from "react";

export default function ComponentsPage() {
  return (
    <div className="animation-showcase">
      <div className="container">
        <div style={{ "--i": 0 } as React.CSSProperties}></div>
        <div style={{ "--i": 1 } as React.CSSProperties}></div>
        <div style={{ "--i": 2 } as React.CSSProperties}></div>
        <div style={{ "--i": 3 } as React.CSSProperties}></div>
        <div style={{ "--i": 4 } as React.CSSProperties}></div>
        <div style={{ "--i": 5 } as React.CSSProperties}></div>
        <div style={{ "--i": 6 } as React.CSSProperties}></div>
        <div style={{ "--i": 7 } as React.CSSProperties}></div>
        <div style={{ "--i": 8 } as React.CSSProperties}></div>
        <div style={{ "--i": 9 } as React.CSSProperties}></div>
        <div style={{ "--i": 10 } as React.CSSProperties}></div>
        <div style={{ "--i": 11 } as React.CSSProperties}></div>
        <div style={{ "--i": 12 } as React.CSSProperties}></div>
      </div>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .animation-showcase {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }

        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          width: 100%;
          height: 100%;
        }

        .container div {
          position: absolute;
          width: calc(30vmin - var(--i) * 5vmin);
          height: calc(30vmin - var(--i) * 5vmin);
          filter: hue-rotate(calc((var(--i) + 1) * 15deg));
          box-shadow: 0 0 1vmin 0 #3884ff45, -0.25vmin 0.25vmin 1vmin 0 #000b;
          background: #3884ff45;
          animation: move 2s ease-in-out infinite alternate;
          animation-delay: calc(var(--i) * 0.07s);
        }

        .container div:nth-child(12) {
          filter: hue-rotate(calc((var(--i) + 1) * 15deg)) brightness(1.5);
        }

        .container div:nth-child(13) {
          filter: hue-rotate(calc((var(--i) + 1) * 15deg)) brightness(2);
          box-shadow: 0 0 1vmin 0 #3884ff45, -0.25vmin 0.25vmin 1vmin 0 #000b,
            0 0 6vmin 0 #fffc inset;
        }

        @keyframes move {
          0% {
            border-radius: 0%;
            transform: rotate(-90deg);
          }
          100% {
            border-radius: 50%;
            transform: rotate(90deg);
          }
        }
      `}</style>
    </div>
  );
}
