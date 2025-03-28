/** @format */

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/Navigation'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
})

export const metadata: Metadata = {
    title: 'P-Flux',
    description: '一个融合了博客、组件展示和精选网站导航的现代化平台',
    icons: {
        icon: '/favicon.svg',
        shortcut: '/favicon.svg',
        apple: '/favicon.svg',
        other: {
            rel: 'apple-touch-icon-precomposed',
            url: '/favicon.svg'
        }
    }
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="zh-CN">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gray-50`}
            >
                <Navigation />
                <div className="flex-grow">{children}</div>
            </body>
        </html>
    )
}
