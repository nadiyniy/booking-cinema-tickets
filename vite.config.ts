import viteTsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig as defineVitestConfig } from 'vitest/config';
import { defineConfig as defineViteConfig, mergeConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';

const viteConfig = defineViteConfig({
    plugins: [
        react(),
        viteTsconfigPaths(),
        svgr({
            include: '**/*.svg?react'
        })
    ]
});

const vitestConfig = defineVitestConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './setupTests.ts'
    }
});

export default mergeConfig(viteConfig, vitestConfig);
