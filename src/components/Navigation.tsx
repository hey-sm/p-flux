/** @format */

'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem
} from '@heroui/navbar'
import { Link } from '@heroui/link'
export function Navigation() {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navItems = [
        { name: '首页', path: '/' },
        { name: '博客笔记', path: '/blog' },
        { name: '组件特效', path: '/ui-showcase' },
        { name: '网站导航', path: '/navigation' }
    ]

    const isActive = (path: string) => {
        return pathname === path
    }

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} className=" mx-auto px-4 py-2">
            <NavbarMenuToggle
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                className="sm:hidden"
            />
            <NavbarBrand>
                <p className="font-bold text-inherit">P-Flux</p>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {navItems.map((item) => (
                    <NavbarItem key={item.path} isActive={isActive(item.path)}>
                        <Link
                            href={item.path}
                            className={
                                isActive(item.path)
                                    ? 'text-slate-600'
                                    : 'text-slate-400'
                            }
                        >
                            {item.name}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarMenu>
                {navItems.map((item) => (
                    <NavbarMenuItem key={item.path}>
                        <Link className="w-full" href={item.path} size="lg">
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}
