/** @format */

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// 分类数据接口
export interface Category {
    name: string
    slug: string
    posts: {
        title: string
        slug: string
    }[]
}

interface CategoryNavProps {
    categories: Category[]
}

// 添加具名导出
export { CategoryNav }

export default function CategoryNav({ categories }: CategoryNavProps) {
    const pathname = usePathname()
    const [expandedCategories, setExpandedCategories] = useState<string[]>(
        // 默认展开当前分类
        categories
            .filter((cat) => pathname.includes(`/blog/${cat.slug}`))
            .map((cat) => cat.slug)
    )

    const toggleCategory = (slug: string) => {
        if (expandedCategories.includes(slug)) {
            setExpandedCategories(
                expandedCategories.filter((cat) => cat !== slug)
            )
        } else {
            setExpandedCategories([...expandedCategories, slug])
        }
    }

    const isActiveCategory = (slug: string) =>
        pathname.includes(`/blog/${slug}`)
    const isActivePost = (categorySlug: string, postSlug: string) =>
        pathname === `/blog/${categorySlug}/${postSlug}`

    return (
        <nav className="w-64 bg-white border-r border-gray-200 h-full">
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">博客分类</h2>
                <div className="space-y-2">
                    <Link
                        href="/blog"
                        className={cn(
                            'block py-2 px-3 rounded transition-colors',
                            pathname === '/blog'
                                ? 'bg-blue-50 text-blue-600 font-medium'
                                : 'hover:bg-gray-100'
                        )}
                    >
                        全部文章
                    </Link>

                    {categories.map((category) => (
                        <div key={category.slug} className="space-y-1">
                            <div className="flex items-center">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-start p-2 font-normal h-auto"
                                    onClick={() =>
                                        toggleCategory(category.slug)
                                    }
                                >
                                    <span className="mr-1">
                                        {expandedCategories.includes(
                                            category.slug
                                        ) ? (
                                            <ChevronDown className="h-4 w-4" />
                                        ) : (
                                            <ChevronRight className="h-4 w-4" />
                                        )}
                                    </span>
                                    <Link
                                        href={`/blog/${category.slug}`}
                                        className={cn(
                                            'flex-grow text-left',
                                            isActiveCategory(category.slug) &&
                                                'text-blue-600 font-medium'
                                        )}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {category.name}
                                    </Link>
                                </Button>
                            </div>

                            {expandedCategories.includes(category.slug) && (
                                <div className="pl-6 space-y-1">
                                    {category.posts.map((post, index) => (
                                        <Link
                                            key={`${category.slug}-${post.slug}-${index}`}
                                            href={`/blog/${category.slug}/${post.slug}`}
                                            className={cn(
                                                'block py-1 px-2 text-sm rounded truncate',
                                                isActivePost(
                                                    category.slug,
                                                    post.slug
                                                )
                                                    ? 'bg-blue-50 text-blue-600 font-medium'
                                                    : 'hover:bg-gray-100'
                                            )}
                                        >
                                            {post.title}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    )
}
