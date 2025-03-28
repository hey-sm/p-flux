/** @format */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * 格式化日期为本地化字符串
 */
export function formatDate(input: string | Date): string {
    try {
        const date = input instanceof Date ? input : new Date(input)

        // 检查日期是否有效
        if (isNaN(date.getTime())) {
            return '日期未知'
        }

        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    } catch {
        // 忽略错误，返回默认值
        return '日期未知'
    }
}

/**
 * 获取安全的 ISO 格式日期字符串，处理无效日期
 */
export function getSafeISOString(input: string | Date): string {
    try {
        const date = input instanceof Date ? input : new Date(input)

        // 检查日期是否有效
        if (isNaN(date.getTime())) {
            return new Date().toISOString()
        }

        return date.toISOString()
    } catch {
        // 忽略错误，返回默认值
        return new Date().toISOString()
    }
}
