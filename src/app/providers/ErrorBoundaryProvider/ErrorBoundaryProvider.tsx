import type { ReactNode } from 'react'
import { ErrorBoundary } from '../../../shared/ui/ErrorBoundary'

interface ErrorBoundaryProviderProps {
	children: ReactNode
}

export const ErrorBoundaryProvider = ({
	children
}: ErrorBoundaryProviderProps) => {
	return <ErrorBoundary>{children}</ErrorBoundary>
}
