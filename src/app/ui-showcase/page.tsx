/** @format */

import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: '组件特效 | P-Flux',
    description: '探索各种精美的UI组件和交互特效展示'
}

// 模拟组件数据
const components = [
    {
        id: '1',
        title: '悬浮卡片',
        description: '具有精美悬浮效果的卡片组件，适用于展示产品或内容。',
        category: '卡片',
        slug: 'hover-cards'
    },
    {
        id: '2',
        title: '动画按钮',
        description: '具有各种状态和动画效果的按钮集合。',
        category: '按钮',
        slug: 'animated-buttons'
    },
    {
        id: '3',
        title: '模态对话框',
        description: '各种样式的模态对话框组件，带有平滑的过渡效果。',
        category: '对话框',
        slug: 'modal-dialogs'
    },
    {
        id: '4',
        title: '导航菜单',
        description: '响应式导航菜单组件，适用于各种网站布局。',
        category: '导航',
        slug: 'navigation-menus'
    },
    {
        id: '5',
        title: '加载动画',
        description: '各种创意加载指示器和动画效果。',
        category: '加载器',
        slug: 'loading-animations'
    },
    {
        id: '6',
        title: '表单元素',
        description: '经过精心设计的表单输入组件，包括文本框、下拉菜单等。',
        category: '表单',
        slug: 'form-elements'
    }
]

export default function ComponentsPage() {
    return (
        <main className="container mx-auto px-4 py-12">
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-bold mb-4">组件特效展示</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    探索各种精美的UI组件和交互特效，适用于现代Web应用
                </p>
            </header>

            <div className="mb-8">
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {[
                        '全部',
                        '卡片',
                        '按钮',
                        '导航',
                        '表单',
                        '对话框',
                        '加载器'
                    ].map((category) => (
                        <button
                            key={category}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 transition-colors"
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {components.map((component) => (
                    <Link
                        key={component.id}
                        href={`/components/${component.slug}`}
                        className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    >
                        <div className="aspect-video bg-gray-100 flex items-center justify-center">
                            <span className="text-3xl">🎨</span>
                        </div>
                        <div className="p-6">
                            <div className="text-sm text-gray-500 mb-2">
                                {component.category}
                            </div>
                            <h2 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                                {component.title}
                            </h2>
                            <p className="text-gray-600">
                                {component.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">需要自定义组件？</h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    如果您需要特定功能的组件或特效，可以联系我们定制开发，满足您的项目需求。
                </p>
                <Link
                    href="/contact"
                    className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                    联系我们
                </Link>
            </div>
        </main>
    )
}
