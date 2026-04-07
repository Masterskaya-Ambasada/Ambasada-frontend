import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'

async function enableMocks() {
  if (import.meta.env.DEV) {
    const { worker } = await import('../shared/mocks/browser')
    await worker.start()
  }
}

enableMocks().then(() => {
  createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
})