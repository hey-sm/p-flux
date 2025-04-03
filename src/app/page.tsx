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
    title: 'fluxp - 首页',
    description: '欢迎来到 fluxp，这是一个现代化的个人网站'
}

export default function HomePage() {
    return <h6>fluxp</h6>
}
