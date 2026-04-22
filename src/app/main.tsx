import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../i18n'
import '../shared/styles/commonStyles.css'
import '../shared/styles/reset.css'
import '../shared/styles/variables.css'
import App from './App'
import { ErrorBoundaryProvider } from './providers/ErrorBoundaryProvider'
import './styles/index.css'

// функция включения моков
async function enableMocking() {
	const shouldMock =
		import.meta.env.DEV && import.meta.env.VITE_USE_MSW === 'true'

	if (!shouldMock) return

	const { worker } = await import('../mocks/browser')

	return worker.start({
		onUnhandledRequest: 'bypass'
	})
}

// ждём инициализацию MSW, потом рендерим приложение
enableMocking().then(() => {
	createRoot(document.getElementById('root')!).render(
		<StrictMode>
			<ErrorBoundaryProvider>
				<App />
			</ErrorBoundaryProvider>
		</StrictMode>
	)
})
