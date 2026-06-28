import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: { headers: securityHeaders },
    preview: { headers: securityHeaders },
    build: {
        sourcemap: false,
    },
})
