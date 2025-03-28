/** @format */

'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { AlertCircle, Info, Check, AlertTriangle, XCircle } from 'lucide-react'

type CalloutType = 'default' | 'info' | 'warning' | 'error' | 'success'

interface CalloutProps {
    type?: CalloutType
    title?: string
    children: React.ReactNode
    className?: string
}

const icons = {
    default: Info,
    info: Info,
    warning: AlertTriangle,
    error: XCircle,
    success: Check
}

const styles = {
    default: 'bg-gray-100 border-gray-200 text-gray-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800'
}

export function Callout({
    type = 'default',
    title,
    children,
    className
}: CalloutProps) {
    const Icon = icons[type]

    return (
        <div
            className={cn(
                'my-6 flex gap-2.5 rounded-lg border p-4',
                styles[type],
                className
            )}
        >
            <div className="mt-0.5">
                <Icon className="h-5 w-5" />
            </div>
            <div>
                {title && <div className="font-medium mb-1">{title}</div>}
                <div className="prose-p:my-0 prose-p:leading-normal">
                    {children}
                </div>
            </div>
        </div>
    )
}
