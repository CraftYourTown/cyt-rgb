import { defineConfig } from 'vite'

export default defineConfig({
    root: './src',
    base: '/rgb',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
    },
})