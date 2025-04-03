/** @format */

import { MetadataRoute } from 'next'
import { getPageMap } from 'nextra/page-map'

interface PageData {
    name: string
    route: string
    children?: PageData[]
    title: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://fluxp.top'
    const pageMap = (await getPageMap()) as PageData[]

    // 递归函数来获取所有路由
    function getAllRoutes(pages: PageData[], routes: string[] = []): string[] {
        for (const page of pages) {
            if (page.route) {
                routes.push(page.route)
            }
            if (page.children && page.children.length > 0) {
                getAllRoutes(page.children, routes)
            }
        }
        return routes
    }

    const allRoutes = getAllRoutes(pageMap)

    return allRoutes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '/' ? 1.0 : 0.8
    }))
}
