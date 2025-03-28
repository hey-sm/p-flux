/** @format */

import type { NextConfig } from 'next'
import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'

// 增强 MDX 配置，添加明确的 React 和代码高亮支持
const withMDX = createMDX({
    options: {
        jsx: true, // 支持 JSX
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [remarkGfm], // 支持 GitHub Flavored Markdown
        rehypePlugins: [
            rehypeSlug, // 为标题添加 ID
            [rehypeHighlight, { ignoreMissing: true }] // 代码高亮
        ]
    }
})

const nextConfig: NextConfig = {
    devIndicators: false,
    // 配置页面使用mdx扩展名
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx']
    /* config options here */
}

export default withMDX(nextConfig)
