/** @format */

'use client'

import React from 'react'
import { MDXProvider as BaseMDXProvider } from '@mdx-js/react'
import components from './MDXComponents'

interface MDXProviderProps {
    children: React.ReactNode
}

export function MDXProvider({ children }: MDXProviderProps) {
    return <BaseMDXProvider components={components}>{children}</BaseMDXProvider>
}
