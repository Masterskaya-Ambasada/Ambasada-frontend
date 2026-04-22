import { Component, type ErrorInfo, type ReactNode } from 'react'
import '../../styles/commonStyles.css'
import styles from './ErrorBoundary.module.css'
import type {
	ErrorBoundaryProps,
	ErrorBoundaryState
} from './ErrorBoundary.types'

export class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props)
		this.state = {
			hasError: false
		}
	}

	static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
		return {
			hasError: true
		}
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		const { onError } = this.props

		if (onError) {
			onError(error, errorInfo)
		}
	}

	handleReload = (): void => {
		window.location.reload()
	}

	render(): ReactNode {
		const { hasError } = this.state
		const { children, fallback } = this.props

		if (hasError) {
			if (fallback) {
				return fallback
			}

			return (
				<main
					className={styles.errorBoundary}
					role="alert"
					aria-labelledby="error-title"
				>
					<div className="container">
						<div className={styles.content}>
							<h1
								id="error-title"
								className={styles.title}
							>
								Что-то пошло не так
							</h1>

							<p className={styles.description}>
								Произошла непредвиденная ошибка в приложении.
							</p>

							<div className={styles.actions}>
								<button
									onClick={this.handleReload}
									className="btn btn--secondary"
									aria-label="Перезагрузить страницу"
									type="button"
								>
									Перезагрузить страницу
								</button>
							</div>
						</div>
					</div>
				</main>
			)
		}

		return children
	}
}
