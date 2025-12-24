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
    // تقليل حجم الـ chunks
    rollupOptions: {
      output: {
        manualChunks: {
          // فصل المكتبات الكبيرة
          'radix-ui': ['@radix-ui/react-accordion', '@radix-ui/react-alert-dialog', '@radix-ui/react-avatar', '@radix-ui/react-checkbox'],
        }
      }
    },
    // استخدام esbuild للـ minification (مدمج مع Vite)
    minify: 'esbuild',
    // تقليل حجم الـ chunks
    chunkSizeWarningLimit: 600,
  },
  plugins: [
    react()
  ]
}));
