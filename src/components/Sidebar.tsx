/** @format */
'use client'
import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react'
import { useSidebar } from '@/components/ui/sidebar'
import Image from 'next/image'

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/ui/sidebar'

// Menu items.

const items = [
    {
        title: '首页',
        url: '/',
        icon: Home
    },
    {
        title: '博客笔记',
        url: '/blog',
        icon: Inbox
    },
    {
        title: '组件特效',
        url: '/ui-showcase',
        icon: Calendar
    },
    {
        title: '网站导航',
        url: '/navigation',
        icon: Search
    },
    {
        title: 'Settings',
        url: '/settings',
        icon: Settings
    }
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>P-Flux</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

// 自定义折叠按钮
export function CustomTrigger() {
    const { toggleSidebar } = useSidebar()

    return (
        <Image
            onClick={toggleSidebar}
            src="/toggle.svg"
            alt="Toggle Sidebar"
            width={36}
            height={36}
            className="fixed cursor-pointer  transition-transform duration-200 ease-in-out hover:rotate-180 hover:scale-110"
        />
    )
}
