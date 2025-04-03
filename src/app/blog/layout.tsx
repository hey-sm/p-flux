/** @format */

import type { Metadata } from 'next'
import { Layout, Navbar } from 'nextra-theme-docs'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

// 定义页面结构的接口
interface PageData {
    name: string
    route: string
    children?: PageData[]
    title: string
}

export const metadata: Metadata = {
    title: 'fluxp Blog - 知识分享与技术探索',
    description: 'fluxp的博客，分享前端、后端开发经验和技巧',
    keywords: ['fluxp', 'fluxp blog', '技术博客', '前端开发']
}

const navbar = <Navbar logo={<b>fluxp Blog</b>} />
const pageMap = (await getPageMap()) as PageData[]
const blogPage = pageMap.find((page) => page.route === '/blog')?.children || []

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <Layout
            navbar={navbar}
            pageMap={blogPage}
            docsRepositoryBase="https://github.com/shuding/nextra/tree/main/docs"
            footer={{ component: <></> }} // 移除右下角图标
        >
            {children}
        </Layout>
    )
}
