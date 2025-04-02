/** @format */

import Link from 'next/link'

// 模拟网站导航数据
const categories = [
    {
        id: '1',
        name: '设计资源',
        sites: [
            {
                id: '1',
                name: 'Dribbble',
                url: 'https://dribbble.com',
                description: '优质设计作品展示平台，获取灵感的好地方'
            },
            {
                id: '2',
                name: 'Behance',
                url: 'https://behance.net',
                description: '创意专业人士的在线作品集平台'
            },
            {
                id: '3',
                name: 'Awwwards',
                url: 'https://www.awwwards.com',
                description: '优秀网站设计奖项和灵感来源'
            },
            {
                id: '4',
                name: 'UI8',
                url: 'https://ui8.net',
                description: '高质量UI设计资源和模板'
            }
        ]
    },
    {
        id: '2',
        name: '开发工具',
        sites: [
            {
                id: '1',
                name: 'GitHub',
                url: 'https://github.com',
                description: '代码托管平台和开源社区'
            },
            {
                id: '2',
                name: 'CodePen',
                url: 'https://codepen.io',
                description: '前端代码展示和实验平台'
            },
            {
                id: '3',
                name: 'VS Code',
                url: 'https://code.visualstudio.com',
                description: '微软出品的轻量级代码编辑器'
            },
            {
                id: '4',
                name: 'Vercel',
                url: 'https://vercel.com',
                description: '前端部署和托管平台'
            }
        ]
    },
    {
        id: '3',
        name: '学习资源',
        sites: [
            {
                id: '1',
                name: 'MDN Web Docs',
                url: 'https://developer.mozilla.org',
                description: 'Web技术权威文档'
            },
            {
                id: '2',
                name: 'freeCodeCamp',
                url: 'https://www.freecodecamp.org',
                description: '免费学习编程的开源社区'
            },
            {
                id: '3',
                name: 'CSS-Tricks',
                url: 'https://css-tricks.com',
                description: 'CSS技巧和教程网站'
            },
            {
                id: '4',
                name: '掘金',
                url: 'https://juejin.cn',
                description: '中文技术社区，分享前沿开发知识'
            }
        ]
    },
    {
        id: '4',
        name: '前端框架',
        sites: [
            {
                id: '1',
                name: 'React',
                url: 'https://react.dev',
                description: '用于构建用户界面的JavaScript库'
            },
            {
                id: '2',
                name: 'Vue.js',
                url: 'https://vuejs.org',
                description: '渐进式JavaScript框架'
            },
            {
                id: '3',
                name: 'Next.js',
                url: 'https://nextjs.org',
                description: 'React框架，用于生产环境'
            },
            {
                id: '4',
                name: 'Nuxt.js',
                url: 'https://nuxt.com',
                description: 'Vue.js框架，简化应用开发'
            }
        ]
    },
    {
        id: '5',
        name: 'CSS框架',
        sites: [
            {
                id: '1',
                name: 'Tailwind CSS',
                url: 'https://tailwindcss.com',
                description: '功能类优先的CSS框架'
            },
            {
                id: '2',
                name: 'Bootstrap',
                url: 'https://getbootstrap.com',
                description: '流行的响应式CSS框架'
            },
            {
                id: '3',
                name: 'Bulma',
                url: 'https://bulma.io',
                description: '基于Flexbox的现代CSS框架'
            },
            {
                id: '4',
                name: 'Chakra UI',
                url: 'https://chakra-ui.com',
                description: '简单、模块化的React UI组件'
            }
        ]
    },
    {
        id: '6',
        name: '实用工具',
        sites: [
            {
                id: '1',
                name: 'Can I use',
                url: 'https://caniuse.com',
                description: '浏览器特性兼容性查询'
            },
            {
                id: '2',
                name: 'TinyPNG',
                url: 'https://tinypng.com',
                description: '在线图片压缩工具'
            },
            {
                id: '3',
                name: 'Figma',
                url: 'https://www.figma.com',
                description: '在线协作设计工具'
            },
            {
                id: '4',
                name: 'JSON Formatter',
                url: 'https://jsonformatter.org',
                description: 'JSON格式化和验证工具'
            }
        ]
    }
]

export default function NavigationPage() {
    return (
        <main className="container mx-auto px-4 py-12">
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-bold mb-4">网站导航</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    精选实用网站资源，提高工作效率
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {categories.map((category) => (
                    <section key={category.id} className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 pb-2 border-b">
                            {category.name}
                        </h2>
                        <div className="space-y-4">
                            {category.sites.map((site) => (
                                <div
                                    key={site.id}
                                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <a
                                        href={site.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                    >
                                        <h3 className="text-lg font-bold text-blue-600 mb-1 hover:underline">
                                            {site.name}
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            {site.description}
                                        </p>
                                        <div className="text-xs text-gray-400 mt-1 truncate">
                                            {site.url}
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            <div className="mt-12 bg-gray-50 rounded-lg p-6 text-center">
                <h3 className="text-xl font-bold mb-3">推荐一个网站</h3>
                <p className="text-gray-600 mb-4">
                    知道一个很棒的网站资源？请告诉我们，我们会考虑添加到导航列表中。
                </p>
                <Link
                    href="/contact"
                    className="inline-block px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                    提交网站
                </Link>
            </div>
        </main>
    )
}
