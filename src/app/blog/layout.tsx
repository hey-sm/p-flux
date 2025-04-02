/** @format */

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

const navbar = <Navbar logo={<b>P-Flux Blog</b>} />
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
            // ... Your additional layout options
        >
            {children}
        </Layout>
    )
}
