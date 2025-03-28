/** @format */

import { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, getAllCategories } from '@/lib/mdx'
import { Category } from '@/components/blog/CategoryNav'
import CategoryNav from '@/components/blog/CategoryNav'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
    title: '博客笔记 | P-Flux',
    description: '浏览我的博客文章、教程和笔记'
}

export default async function BlogPage() {
    // 获取所有文章和分类
    const posts = await getAllPosts()
    const categories = await getAllCategories()

    // 格式化分类数据
    const formattedCategories: Category[] = categories.map((categorySlug) => {
        const categoryPosts = posts.filter(
            (post) => post.category === categorySlug
        )

        // 根据分类slug获取分类名称
        const categoryNames: Record<string, string> = {
            frontend: '前端开发',
            backend: '后端开发',
            design: '设计相关'
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

    // 辅助函数：验证日期并格式化
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)

        // 检查日期是否有效
        if (isNaN(date.getTime())) {
            return {
                isoString: new Date().toISOString(),
                localizedString: '日期未知'
            }
        }

        return {
            isoString: date.toISOString(),
            localizedString: date.toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        }
    }

    return (
        <div className="flex flex-col md:flex-row">
            {/* 左侧分类导航 */}
            <aside className="md:w-64 flex-shrink-0">
                <CategoryNav categories={formattedCategories} />
            </aside>

            {/* 中间内容区 */}
            <main className="flex-grow px-6 py-8">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold mb-4">博客笔记</h1>
                    <p className="text-gray-600">
                        浏览我的技术文章、教程和学习笔记，涵盖前端、后端和设计等话题。
                    </p>
                </header>

                <div className="grid grid-cols-1 gap-8">
                    {posts.map((post, index) => (
                        <Card
                            key={`${post.category}-${post.slug}-${index}`}
                            className="overflow-hidden"
                        >
                            <CardHeader>
                                <div className="flex items-center justify-between mb-2">
                                    <Badge variant="outline">
                                        {post.category === 'frontend'
                                            ? '前端开发'
                                            : post.category === 'backend'
                                            ? '后端开发'
                                            : post.category === 'design'
                                            ? '设计相关'
                                            : post.category}
                                    </Badge>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Calendar className="mr-1 h-3 w-3" />
                                        <time
                                            dateTime={
                                                formatDate(post.date).isoString
                                            }
                                        >
                                            {
                                                formatDate(post.date)
                                                    .localizedString
                                            }
                                        </time>
                                    </div>
                                </div>
                                <CardTitle className="text-xl">
                                    <Link
                                        href={`/blog/${post.category}/${post.slug}`}
                                        className="hover:text-blue-600 transition-colors"
                                    >
                                        {post.title}
                                    </Link>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">{post.excerpt}</p>

                                {post.tags && post.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {post.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="secondary"
                                                className="text-xs"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter>
                                <Button
                                    asChild
                                    variant="ghost"
                                    size="sm"
                                    className="text-blue-600 p-0"
                                >
                                    <Link
                                        href={`/blog/${post.category}/${post.slug}`}
                                    >
                                        阅读全文
                                        <ArrowRight className="ml-1 h-3 w-3" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>

            {/* 右侧空间，保持布局平衡 */}
            <aside className="md:w-64 flex-shrink-0"></aside>
        </div>
    )
}
