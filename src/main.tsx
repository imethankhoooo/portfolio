import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import './i18n'
import './styles/globals.css'
import App from './App'

// Static previews served from a sub-path (no SPA fallback) build with VITE_HASH_ROUTER=1.
const Router = import.meta.env.VITE_HASH_ROUTER === '1' ? HashRouter : BrowserRouter

// Page transitions own the scroll position; stop the browser restoring it on back/forward.
history.scrollRestoration = 'manual'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Router>
            <App />
        </Router>
    </StrictMode>,
)
