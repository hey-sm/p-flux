/** @format */

import { Metadata } from 'next'
import Link from 'next/link'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronRight, Calendar } from 'lucide-react'

export const metadata: Metadata = {
    title: 'P-Flux - 首页',
    description: '欢迎来到 P-Flux，这是一个现代化的个人网站'
}

export default function HomePage() {
  return (
        <main className="container mx-auto px-4 py-12">
            <section className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-6">欢迎来到 P-Flux</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    一个融合了博客、组件展示和精选网站导航的现代化平台
                </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle>博客笔记</CardTitle>
                        <CardDescription>
                            浏览我的文章、教程和笔记，了解最新的技术动态。
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button
                            asChild
                            variant="ghost"
                            className="text-blue-600"
                        >
                            <Link href="/blog">
                                查看博客
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle>组件特效</CardTitle>
                        <CardDescription>
                            探索各种精美的 UI 组件和交互特效展示。
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button
                            asChild
                            variant="ghost"
                            className="text-blue-600"
                        >
                            <Link href="/ui-showcase">
                                查看组件
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle>网站导航</CardTitle>
                        <CardDescription>
                            精选的网站资源导航，帮助您发现有价值的内容。
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button
                            asChild
                            variant="ghost"
                            className="text-blue-600"
                        >
                            <Link href="/navigation">
                                查看导航
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            </section>

            <section className="mb-16">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">最新动态</h2>
                    <Button asChild variant="outline">
                        <Link href="/blog">
                            查看全部
                            <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <Badge variant="outline" className="text-sm">
                                    Web开发
                                </Badge>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Calendar className="mr-1 h-3 w-3" />
                                    2023年5月15日
                                </div>
        </div>
                            <CardTitle className="mt-2">
                                <Link
                                    href="/blog/example-post"
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    使用Next.js构建现代Web应用
                                </Link>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Next.js是一个流行的React框架，它提供了许多开箱即用的功能，如服务器端渲染、静态站点生成、路由等...
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button
                                asChild
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 px-0"
                            >
                                <Link href="/blog/example-post">
                                    阅读更多
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <Badge variant="outline" className="text-sm">
                                    CSS
                                </Badge>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Calendar className="mr-1 h-3 w-3" />
                                    2023年5月10日
                                </div>
                            </div>
                            <CardTitle className="mt-2">
                                <Link
                                    href="/blog/another-example"
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    Tailwind CSS入门指南
                                </Link>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Tailwind
                                CSS是一个功能类优先的CSS框架，它提供了低级实用工具类，可以帮助你构建完全自定义的界面...
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button
                                asChild
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 px-0"
                            >
                                <Link href="/blog/another-example">
                                    阅读更多
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
    </div>
            </section>
        </main>
    )
}
