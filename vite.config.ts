import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    cssMinify: true,
    modulePreload: {
      polyfill: false, // تحسين الأداء
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // فصل node_modules
          if (id.includes('node_modules')) {
            // فصل Radix UI
            if (id.includes('@radix-ui')) {
              return 'radix-ui';
            }
            // فصل React Query
            if (id.includes('@tanstack')) {
              return 'tanstack';
            }
            // فصل React Router
            if (id.includes('react-router')) {
              return 'react-router';
            }
            // باقي المكتبات
            return 'vendor';
          }
        },
        // تقليل أسماء الملفات
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    minify: 'esbuild',
    target: 'esnext',
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
  },
  plugins: [
    react()
  ]
}));
