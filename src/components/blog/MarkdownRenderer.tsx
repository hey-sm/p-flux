/** @format */

'use client'

import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote'
import { Badge } from '@/components/ui/badge'
import { Calendar } from 'lucide-react'

interface MarkdownRendererProps {
    source: MDXRemoteProps
    title: string
    date: string
    tags?: string[]
}

export default function MarkdownRenderer({
    source,
    title,
    date,
    tags = []
}: MarkdownRendererProps) {
    return (
        <article className="prose prose-lg max-w-none">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">{title}</h1>

                <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                        <Calendar className="mr-1 h-4 w-4" />
                        <time dateTime={new Date(date).toISOString()}>
                            {new Date(date).toLocaleDateString('zh-CN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <Badge
                                key={tag}
                                variant="outline"
                                className="text-sm"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>

            <div className="markdown-content">
                <MDXRemote {...source} />
            </div>
        </article>
    )
}
