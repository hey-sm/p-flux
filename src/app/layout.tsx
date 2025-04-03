/** @format */

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
})

export const metadata: Metadata = {
    title: 'fluxp - 个人技术博客与导航',
    description:
        'fluxp是一个专注于前端技术分享的个人博客，提供技术文章、组件展示和精选网站导航',
    keywords: ['fluxp', 'fluxp', '前端博客', '技术分享'],
    metadataBase: new URL('https://fluxp.top'),
    alternates: {
        canonical: '/'
    },
    openGraph: {
        title: 'fluxp - 个人技术博客与导航',
        description: 'fluxp是一个专注于前端技术分享的个人博客',
        url: 'https://fluxp.top',
        siteName: 'fluxp',
        images: [
            {
                url: 'https://fluxp.top/og-image.jpg',
                width: 1200,
                height: 630
            }
        ],
        locale: 'zh_CN',
        type: 'website'
    },
    robots: {
        index: true,
        follow: true
    },
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

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="zh-CN">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <div className="flex justify-end">
                    <Navbar />
                </div>
                {children}
            </body>
        </html>
    )
}
