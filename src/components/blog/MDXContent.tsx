/** @format */

'use client'

import { useEffect, useState } from 'react'
import { MDXProvider } from '@/components/mdx/MDXProvider'
import 'highlight.js/styles/github-dark.css' // 导入 highlight.js 样式

interface MDXContentProps {
    category: string
    slug: string
}

export default function MDXContent({ category, slug }: MDXContentProps) {
    const [Component, setComponent] = useState<React.ComponentType | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        async function loadComponent() {
            try {
                setLoading(true)
                // 动态导入 MDX 文件
                const mdxModule = await import(
                    `@/content/blog/${category}/${slug}.mdx`
                )
                setComponent(() => mdxModule.default)
                setError(null)
            } catch (err) {
                console.error(
                    `Failed to load MDX: ${category}/${slug}.mdx`,
                    err
                )
                setError(err instanceof Error ? err : new Error(String(err)))
                setComponent(null)
            } finally {
                setLoading(false)
            }
        }

        loadComponent()
    }, [category, slug])

    if (loading) {
        return <div className="my-8 text-center">加载内容中...</div>
    }

    if (error) {
        return (
            <div className="my-8 p-4 border border-red-300 bg-red-50 text-red-800 rounded-md">
                <h3 className="text-lg font-medium">内容加载失败</h3>
                <p className="mt-2">无法加载文章内容，请稍后再试。</p>
                <p className="text-sm mt-4 text-red-600">{error.message}</p>
            </div>
        )
    }

    return Component ? (
        <MDXProvider>
            <Component />
        </MDXProvider>
    ) : null
}
