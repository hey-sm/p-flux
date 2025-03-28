/** @format */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// 博客内容目录路径
const contentDirectory = path.join(process.cwd(), 'src/content/blog')

// 博客文章接口
export interface BlogPost {
    slug: string
    category: string
    title: string
    date: string
    excerpt: string
    tags?: string[]
    content: string
}

/**
 * 获取所有博客文章的元数据
 */
export async function getAllPosts(): Promise<BlogPost[]> {
    const categories = fs.readdirSync(contentDirectory)

    const posts = categories.flatMap((category) => {
        const categoryPath = path.join(contentDirectory, category)

        // 确保是目录而不是文件
        if (!fs.statSync(categoryPath).isDirectory()) {
            return []
        }

        const files = fs.readdirSync(categoryPath)

        return files.map((fileName) => {
            // 从文件名生成slug
            const slug = fileName.replace(/\.mdx?$/, '')

            // 读取文件内容
            const filePath = path.join(categoryPath, fileName)
            const fileContents = fs.readFileSync(filePath, 'utf8')

            // 使用gray-matter解析frontmatter
            const { data, content } = matter(fileContents)

            return {
                slug,
                category,
                content,
                title: data.title,
                date: data.date,
                excerpt: data.excerpt || '',
                tags: data.tags || []
            } as BlogPost
        })
    })

    // 按日期排序，最新的在前面
    return posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
}

/**
 * 获取特定分类的所有博客文章
 */
export async function getPostsByCategory(
    category: string
): Promise<BlogPost[]> {
    const allPosts = await getAllPosts()
    return allPosts.filter((post) => post.category === category)
}

/**
 * 获取所有博客分类
 */
export async function getAllCategories(): Promise<string[]> {
    try {
        const categories = fs.readdirSync(contentDirectory)
        // 过滤掉非目录项
        return categories.filter((category) => {
            const categoryPath = path.join(contentDirectory, category)
            return fs.statSync(categoryPath).isDirectory()
        })
    } catch (error) {
        console.error('Error reading categories:', error)
        return []
    }
}

/**
 * 获取特定分类和slug的博客文章
 */
export async function getPostBySlug(
    category: string,
    slug: string
): Promise<BlogPost | null> {
    try {
        // 尝试 .md 扩展名
        let filePath = path.join(contentDirectory, category, `${slug}.md`)

        // 如果 .md 文件不存在，尝试 .mdx 扩展名
        if (!fs.existsSync(filePath)) {
            filePath = path.join(contentDirectory, category, `${slug}.mdx`)

            // 如果两种扩展名的文件都不存在
            if (!fs.existsSync(filePath)) {
                return null
            }
        }

        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
            slug,
            category,
            content,
            title: data.title,
            date: data.date,
            excerpt: data.excerpt || '',
            tags: data.tags || []
        }
    } catch (error) {
        console.error(`Error fetching post ${category}/${slug}:`, error)
        return null
    }
}

/**
 * 从Markdown内容中提取标题和其层级，用于生成目录
 */
export function extractHeadings(content: string) {
    const headingLines = content
        .split('\n')
        .filter((line) => line.match(/^#+\s/))

    // 用于跟踪已使用的锚点
    const usedAnchors = new Set<string>()

    return headingLines.map((line, index) => {
        // 计算标题级别 (h1, h2, etc)
        const level = line.match(/^#+/)?.[0].length || 0

        // 提取标题文本
        const text = line.replace(/^#+\s/, '')

        // 生成基础锚点ID，处理包括中文在内的字符
        let anchor = text
            .toLowerCase()
            .replace(/[^\w\s\u4e00-\u9fa5]/g, '') // 保留中文字符
            .replace(/\s+/g, '-') // 空格替换为短横线
            .replace(/^-+|-+$/g, '') // 移除首尾连字符

        // 如果锚点为空（可能全是特殊字符），使用index作为锚点
        if (!anchor) {
            anchor = `heading-${index}`
        }

        // 确保锚点唯一
        if (usedAnchors.has(anchor)) {
            let counter = 1
            while (usedAnchors.has(`${anchor}-${counter}`)) {
                counter++
            }
            anchor = `${anchor}-${counter}`
        }

        usedAnchors.add(anchor)

        return { level, text, anchor, index }
    })
}
