/** @format */

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import MDXContent from '@/components/blog/MDXContent'
import { Badge } from '@/components/ui/badge'
import TableOfContents from '@/components/blog/TableOfContents'
import { getAllPosts, getPostBySlug, type BlogPost } from '@/lib/blog'
import { extractHeadings } from '@/lib/mdx'
import { formatDate, getSafeISOString } from '@/lib/utils'

// 动态生成页面的元数据
export async function generateMetadata({
    params
}: {
    params:
        | Promise<{ category: string; slug: string }>
        | { category: string; slug: string }
}): Promise<Metadata> {
    const resolvedParams = await Promise.resolve(params)

    const post = await getPostBySlug(
        resolvedParams.category,
        resolvedParams.slug
    )
    if (!post) {
        return {
            title: '文章未找到'
        }
    }

    return {
        title: `${post.title} | 博客`,
        description: post.excerpt
    }
}

// 动态生成所有路径
export async function generateStaticParams() {
    const posts = await getAllPosts()

    return posts.map((post: BlogPost) => ({
        category: post.category,
        slug: post.slug
    }))
}

// 分类标签映射表
const categoryLabels: Record<string, string> = {
    frontend: '前端开发',
    backend: '后端开发',
    devops: 'DevOps',
    design: '设计相关'
}

const BlogPostPage = async ({
    params
}: {
    params:
        | Promise<{ category: string; slug: string }>
        | { category: string; slug: string }
}) => {
    const resolvedParams = await Promise.resolve(params)

    const post = await getPostBySlug(
        resolvedParams.category,
        resolvedParams.slug
    )
    if (!post) {
        return notFound()
    }

    // 获取所有分类
    const posts = await getAllPosts()
    const categories = Array.from(
        new Set(posts.map((post: BlogPost) => post.category))
    ).map((slug: string) => ({
        slug,
        name: categoryLabels[slug as keyof typeof categoryLabels] || slug,
        posts: posts
            .filter((p: BlogPost) => p.category === slug)
            .map((p: BlogPost) => ({
                title: p.title,
                slug: p.slug
            }))
    }))

    // 从文章内容中提取标题生成目录
    const headings = extractHeadings(post.content)

    return (
        <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row py-6 gap-10">
                <div className="hidden lg:block w-64 shrink-0">
                    <div className="sticky top-20 max-h-[calc(100vh-5rem)]">
                        {headings.length > 0 && (
                            <TableOfContents
                                headings={headings}
                                contentContainerId="blog-content"
                            />
                        )}
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <div
                        id="blog-content"
                        className="h-[calc(100vh-5rem)] overflow-y-auto pr-4 scrollbar-hide"
                    >
                        <article className="prose dark:prose-invert prose-pre:p-0 prose-img:rounded-lg prose-headings:scroll-mt-20 max-w-none">
                            <h1 className="text-3xl font-bold mb-6">
                                {post.title}
                            </h1>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                                <time dateTime={getSafeISOString(post.date)}>
                                    {formatDate(post.date)}
                                </time>
                                <span>·</span>
                                <Link
                                    href={`/blog/${post.category}`}
                                    className="hover:text-foreground transition-colors"
                                >
                                    {categories.find(
                                        (c) => c.slug === post.category
                                    )?.name || post.category}
                                </Link>
                            </div>
                            {post.tags && post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {post.tags.map((tag: string) => (
                                        <Link
                                            key={tag}
                                            href={`/blog/tags/${tag}`}
                                        >
                                            <Badge variant="secondary">
                                                {tag}
                                            </Badge>
                                        </Link>
                                    ))}
                                </div>
                            )}
                            <MDXContent
                                category={post.category}
                                slug={post.slug}
                            />
                        </article>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogPostPage
