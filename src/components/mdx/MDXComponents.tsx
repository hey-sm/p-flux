/** @format */

'use client'

import React from 'react'
import Link from 'next/link'
import { Callout } from '@/components/ui/callout'
import { cn } from '@/lib/utils'
import Image from 'next/image'

// 为标题生成一致的ID
function generateId(text: string): string {
    return (
        text
            .toLowerCase()
            .replace(/[^\w\s\u4e00-\u9fa5]/g, '') // 保留中文字符和英文字母、数字
            .replace(/\s+/g, '-') // 空格替换为短横线
            .replace(/^-+|-+$/g, '') || // 移除首尾连字符
        'heading'
    ) // 如果处理后为空，提供默认值
}

// 定义 MDX 中使用的自定义组件
const components = {
    // 基础元素样式增强
    h1: ({
        id,
        children,
        ...props
    }: {
        id?: string
        children: React.ReactNode
    }) => {
        const headingId =
            id ||
            (typeof children === 'string' ? generateId(children) : undefined)
        return (
            <h1
                id={headingId}
                className="mt-2 scroll-m-20 text-3xl font-bold tracking-tight"
                {...props}
            >
                {children}
            </h1>
        )
    },
    h2: ({
        id,
        children,
        ...props
    }: {
        id?: string
        children: React.ReactNode
    }) => {
        const headingId =
            id ||
            (typeof children === 'string' ? generateId(children) : undefined)
        return (
            <h2
                id={headingId}
                className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0"
                {...props}
            >
                {children}
            </h2>
        )
    },
    h3: ({
        id,
        children,
        ...props
    }: {
        id?: string
        children: React.ReactNode
    }) => {
        const headingId =
            id ||
            (typeof children === 'string' ? generateId(children) : undefined)
        return (
            <h3
                id={headingId}
                className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
                {...props}
            >
                {children}
            </h3>
        )
    },
    a: ({
        href,
        children,
        ...props
    }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
        if (href && href.startsWith('#')) {
            // 内部链接，应用特殊样式
            return (
                <a
                    href={href}
                    className="font-medium text-primary underline underline-offset-4"
                    {...props}
                >
                    {children}
                </a>
            )
        }
        // 外部链接可以添加target="_blank"等属性
        return (
            <a
                href={href}
                className="font-medium text-primary underline underline-offset-4"
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel={
                    href?.startsWith('http') ? 'noopener noreferrer' : undefined
                }
                {...props}
            >
                {children}
            </a>
        )
    },
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p className="my-4 leading-7" {...props} />
    ),
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className="my-4 pl-6 list-disc" {...props} />
    ),
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
        <ol className="my-4 pl-6 list-decimal" {...props} />
    ),
    li: (props: React.HTMLAttributes<HTMLLIElement>) => (
        <li className="my-1" {...props} />
    ),
    blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
        <blockquote
            className="border-l-4 border-gray-200 pl-4 py-2 my-4 italic text-gray-700"
            {...props}
        />
    ),
    // 代码块增强
    code: ({
        className,
        children,
        ...props
    }: React.HTMLAttributes<HTMLElement>) => {
        // 检查是否是代码块 (className 会包含语言信息如 "language-js")
        const match = /language-(\w+)/.exec(className || '')

        // 如果是行内代码而不是代码块
        if (!match) {
            return (
                <code
                    className="px-1.5 py-0.5 mx-0.5 bg-gray-100 rounded text-red-600 text-sm font-mono"
                    {...props}
                >
                    {children}
                </code>
            )
        }

        // 渲染代码块 (highlight.js 会通过 rehype-highlight 处理)
        return (
            <code className={className} {...props}>
                {children}
            </code>
        )
    },
    pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
        <pre
            className={cn(
                'mb-4 mt-6 overflow-x-auto rounded-lg border bg-muted p-4',
                className
            )}
            {...props}
        />
    ),
    // 图片组件
    img: ({
        alt,
        src,
        ...props
    }: React.ImgHTMLAttributes<HTMLImageElement>) => (
        <img src={src} alt={alt} className="rounded-md border" {...props} />
    ),
    // 视频组件
    video: (props: React.VideoHTMLAttributes<HTMLVideoElement>) => (
        <video className="rounded-md border" controls {...props} />
    ),
    // 表格样式
    table: ({
        className,
        ...props
    }: React.TableHTMLAttributes<HTMLTableElement>) => (
        <div className="my-6 w-full overflow-y-auto">
            <table className={cn('w-full', className)} {...props} />
        </div>
    ),
    // 自定义组件
    Callout
}

export default components
