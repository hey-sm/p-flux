/** @format */

'use client'

import * as React from 'react'
import Link from 'next/link'
import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react'

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'

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
export function Navbar() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {items.map((item) => (
                    <NavigationMenuItem key={item.url}>
                        <Link href={item.url} legacyBehavior passHref>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                            >
                                {item.title}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}
