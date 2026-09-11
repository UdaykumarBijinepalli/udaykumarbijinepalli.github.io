import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// User-site repository: https://udaykumarbijinepalli.github.io/
// Because the repository is <username>.github.io, the site is served from '/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
})
