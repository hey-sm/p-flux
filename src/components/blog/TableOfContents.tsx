/** @format */

'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

// 标题类型接口
export interface Heading {
    level: number
    text: string
    anchor: string
    index: number
}

export interface TableOfContentsProps {
    headings: Heading[]
    contentContainerId: string
}

export default function TableOfContents({
    headings,
    contentContainerId
}: TableOfContentsProps) {
    // 仅显示 h2 和 h3 级别的标题
    const filteredHeadings = headings.filter(
        (heading) => heading.level === 2 || heading.level === 3
    )

    // 只跟踪一个简单的活动ID状态（用于UI高亮显示）
    const [activeId, setActiveId] = useState<string>('')

    // 参考元素
    const indicatorRef = useRef<HTMLDivElement>(null)
    const tocListRef = useRef<HTMLDivElement>(null)
    const scrollContainerRef = useRef<HTMLElement | null>(null)

    // 防止滚动检测自循环
    const isUpdatingRef = useRef(false)

    // 记录最后一个标题ID
    const lastHeadingIdRef = useRef<string>('')

    // 初始化和清理滚动监听
    useEffect(() => {
        if (filteredHeadings.length === 0) return

        // 获取内容容器元素
        const scrollContainer = document.getElementById(contentContainerId)
        if (!scrollContainer) return

        scrollContainerRef.current = scrollContainer

        // 如果有标题，记录最后一个标题的ID
        if (filteredHeadings.length > 0) {
            lastHeadingIdRef.current =
                filteredHeadings[filteredHeadings.length - 1].anchor
        }

        // 滚动处理函数
        const handleScroll = () => {
            // 防止自循环
            if (isUpdatingRef.current) return

            // 检查是否已滚动到底部或接近底部 (使用更小的阈值)
            const isAtEnd =
                Math.abs(
                    scrollContainer.scrollHeight -
                        scrollContainer.scrollTop -
                        scrollContainer.clientHeight
                ) < 30 // 使用绝对值判断，解决小数点精度问题

            // 找出当前可见的标题
            let currentId = ''
            const headingElements: { id: string; top: number }[] = []

            // 获取所有标题元素位置
            filteredHeadings.forEach((heading) => {
                const element = document.getElementById(heading.anchor)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    const containerRect =
                        scrollContainer.getBoundingClientRect()
                    const top =
                        rect.top - containerRect.top + scrollContainer.scrollTop

                    headingElements.push({ id: heading.anchor, top })
                }
            })

            // 按位置排序
            headingElements.sort((a, b) => a.top - b.top)

            // 如果在最底部，直接使用最后一个标题
            if (isAtEnd && lastHeadingIdRef.current) {
                currentId = lastHeadingIdRef.current
            } else {
                // 正常滚动逻辑：找到当前可见的标题
                const scrollPosition = scrollContainer.scrollTop + 100
                for (const heading of headingElements) {
                    if (heading.top > scrollPosition) {
                        break
                    }
                    currentId = heading.id
                }

                // 如果没找到，但接近底部，也选择最后一个
                if (
                    !currentId &&
                    scrollContainer.scrollTop + scrollContainer.clientHeight >
                        scrollContainer.scrollHeight - 100 &&
                    headingElements.length > 0
                ) {
                    currentId = headingElements[headingElements.length - 1].id
                }
            }

            // 更新活动ID和指示器
            if (currentId && activeId !== currentId) {
                setActiveId(currentId)
                updateIndicator(currentId)
            }
        }

        // 使用较低的防抖时间
        const debouncedScroll = debounce(handleScroll, 20)

        // 窗口大小变化时重新计算
        const handleResize = debounce(() => {
            handleScroll()
        }, 100)

        // 添加事件监听
        scrollContainer.addEventListener('scroll', debouncedScroll)
        window.addEventListener('resize', handleResize)

        // 初始执行一次
        // 使用setTimeout确保DOM已完全加载
        setTimeout(handleScroll, 100)

        return () => {
            scrollContainer.removeEventListener('scroll', debouncedScroll)
            window.removeEventListener('resize', handleResize)
        }
    }, [filteredHeadings, contentContainerId, activeId])

    // 防抖函数
    function debounce<T extends (...args: unknown[]) => unknown>(
        fn: T,
        delay: number
    ): (...args: Parameters<T>) => void {
        let timer: ReturnType<typeof setTimeout> | null = null

        return (...args: Parameters<T>) => {
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => fn(...args), delay)
        }
    }

    // 直接更新指示器位置的函数（不依赖React状态）
    function updateIndicator(id: string) {
        if (!indicatorRef.current || !tocListRef.current) return

        const indicator = indicatorRef.current
        const activeItem = document.querySelector(
            `.toc-item[data-id="${id}"]`
        ) as HTMLElement | null

        if (!activeItem) return

        const tocListRect = tocListRef.current.getBoundingClientRect()
        const activeItemRect = activeItem.getBoundingClientRect()

        // 直接设置样式，不经过React状态流
        indicator.style.opacity = '1'
        indicator.style.top = `${activeItemRect.top - tocListRect.top}px`
        indicator.style.height = `${activeItem.clientHeight}px`
    }

    // 处理点击
    const handleClick = (anchor: string, event: React.MouseEvent) => {
        event.preventDefault()

        // 立即更新高亮状态
        setActiveId(anchor)

        // 立即更新指示器（不等待React重渲染）
        updateIndicator(anchor)

        // 标记正在更新以防止滚动事件干扰
        isUpdatingRef.current = true

        // 获取目标元素和滚动容器
        const targetElement = document.getElementById(anchor)
        const scrollContainer = scrollContainerRef.current

        if (targetElement && scrollContainer) {
            // 计算滚动位置
            const navbarHeight = 80
            const containerRect = scrollContainer.getBoundingClientRect()
            const targetRect = targetElement.getBoundingClientRect()
            const scrollTo =
                targetRect.top -
                containerRect.top +
                scrollContainer.scrollTop -
                navbarHeight

            // 执行滚动
            scrollContainer.scrollTo({
                top: scrollTo,
                behavior: 'smooth'
            })

            // 更新URL，但不引起页面跳转
            window.history.pushState(null, '', `#${anchor}`)

            // 滚动完成后恢复滚动检测
            setTimeout(() => {
                isUpdatingRef.current = false
            }, 400)
        }
    }

    // 如果没有标题，不显示目录
    if (filteredHeadings.length === 0) {
        return null
    }

    return (
        <div className="space-y-2">
            <h4 className="text-lg font-semibold">目录</h4>
            <div className="max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-hide">
                <ul className="space-y-1 text-sm relative pl-2">
                    {/* 简化的指示器，没有初始样式 */}
                    <div
                        ref={indicatorRef}
                        className="absolute left-0 w-1 bg-emerald-500 rounded-full transition-[height,opacity,top] duration-300 ease-out opacity-0"
                    />

                    <div ref={tocListRef} className="toc-list">
                        {filteredHeadings.map((heading) => (
                            <li
                                key={`${heading.anchor}-${heading.index}`}
                                data-id={heading.anchor}
                                className={cn(
                                    'py-1 relative transition-colors toc-item',
                                    heading.level === 3 && 'pl-4'
                                )}
                            >
                                <Link
                                    href={`#${heading.anchor}`}
                                    onClick={(e) =>
                                        handleClick(heading.anchor, e)
                                    }
                                    className={cn(
                                        'block transition-colors hover:text-foreground line-clamp-2 pl-2',
                                        activeId === heading.anchor
                                            ? 'font-medium text-foreground'
                                            : 'text-muted-foreground'
                                    )}
                                >
                                    {heading.text}
                                </Link>
                            </li>
                        ))}
                    </div>
                </ul>
            </div>
        </div>
    )
}
