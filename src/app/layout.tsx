/** @format */

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar, CustomTrigger } from '@/components/Sidebar'

import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

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

const banner = <Banner storageKey="some-key">Nextra 4.0 is released 🎉</Banner>
const navbar = (
    <Navbar
        logo={<b>Nextra</b>}
        // ... Your additional navbar options
    />
)
const footer = <Footer>MIT {new Date().getFullYear()} © Nextra.</Footer>

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="zh-CN">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gray-50`}
            >
                <SidebarProvider>
                    <AppSidebar />
                    <main className="flex-grow">
                        <CustomTrigger />
                        <Layout
                            banner={banner}
                            navbar={navbar}
                            pageMap={await getPageMap()}
                            docsRepositoryBase="https://github.com/shuding/nextra/tree/main/docs"
                            footer={footer}
                            // ... Your additional layout options
                        >
                            {children}
                        </Layout>
                    </main>
                </SidebarProvider>
            </body>
        </html>
    )
}
