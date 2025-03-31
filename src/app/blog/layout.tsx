/** @format */

import Link from 'next/link'
import { getAllCategories, getAllPosts } from '@/lib/mdx'
import { type BlogPost } from '@/lib/mdx'

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger
} from '@/components/ui/menubar'

export default async function BlogLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    // 获取所有分类和文章
    const categories = await getAllCategories()
    const posts = await getAllPosts()

    // 根据分类slug获取分类名称（简单版）
    const categoryNames: Record<string, string> = {
        frontend: '前端开发',
        backend: '后端开发',
        design: '设计相关'
        // 添加更多映射
    }

    // 按分类整理文章 - 修复类型错误
    const postsByCategory: Record<string, BlogPost[]> = {}
    categories.forEach((category) => {
        postsByCategory[category] = posts.filter(
            (post) => post.category === category
        )
    })

    return (
        <div className="min-h-screen">
            <div className="container mx-auto ">
                {/* 右侧导航菜单 */}
                <Menubar className="border-0 shadow-none flex justify-end pr-4 bg-transparent">
                    {/* 为每个分类创建独立的菜单 */}
                    {categories.map((categorySlug) => (
                        <MenubarMenu key={categorySlug}>
                            <MenubarTrigger>
                                {categoryNames[categorySlug] || categorySlug}
                            </MenubarTrigger>
                            <MenubarContent>
                                {postsByCategory[categorySlug].map((post) => (
                                    <MenubarItem key={post.slug}>
                                        <Link
                                            href={`/blog/${categorySlug}/${post.slug}`}
                                        >
                                            {post.title}
                                        </Link>
                                    </MenubarItem>
                                ))}
                            </MenubarContent>
                        </MenubarMenu>
                    ))}
                </Menubar>

                {/* 渲染子组件 */}
                {children}
            </div>
        </div>
    )
}
