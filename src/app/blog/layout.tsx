/** @format */

import { Metadata } from 'next'
import { getAllCategories, getAllPosts } from '@/lib/mdx'
import { Category } from '@/components/blog/CategoryNav'

export const metadata: Metadata = {
    title: '博客笔记 | P-Flux',
    description: '浏览我的博客文章、教程和笔记'
}

export default async function BlogLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    // 获取所有分类和文章
    const categories = await getAllCategories()
    const posts = await getAllPosts()

    // 将数据格式化为CategoryNav组件需要的格式
    const formattedCategories: Category[] = categories.map((categorySlug) => {
        const categoryPosts = posts.filter(
            (post) => post.category === categorySlug
        )

        // 根据分类slug获取分类名称（简单版）
        const categoryNames: Record<string, string> = {
            frontend: '前端开发',
            backend: '后端开发',
            design: '设计相关'
            // 添加更多映射
        }

        return {
            name: categoryNames[categorySlug] || categorySlug,
            slug: categorySlug,
            posts: categoryPosts.map((post) => ({
                title: post.title,
                slug: post.slug
            }))
        }
    })

    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-0">
                {/* 克隆子元素并传递属性 */}
                {typeof children === 'function'
                    ? children({ categories: formattedCategories })
                    : children}
            </div>
        </div>
    )
}
