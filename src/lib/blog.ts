/** @format */

import {
    getAllPosts as getPostsFromMdx,
    getPostBySlug as getPostBySlugFromMdx,
    getAllCategories as getCategoriesFromMdx,
    extractHeadings,
    type BlogPost
} from './mdx'

/**
 * 获取所有博客文章
 */
export async function getAllPosts(): Promise<BlogPost[]> {
    return getPostsFromMdx()
}

/**
 * 获取特定分类和slug的博客文章
 */
export async function getPostBySlug(
    category: string,
    slug: string
): Promise<BlogPost | null> {
    return getPostBySlugFromMdx(category, slug)
}

/**
 * 获取所有博客分类
 */
export async function getAllCategories(): Promise<string[]> {
    return getCategoriesFromMdx()
}

// 重新导出函数和类型
export { extractHeadings }
export type { BlogPost }
