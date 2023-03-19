import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteEslint from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path'

const resolve = (dir: string) => path.join(__dirname, dir)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteEslint({
      failOnError: false,
    }),
    AutoImport({
      imports: ['react', 'react-router-dom'], // 自动导入vue和vue-router等相关函数
      eslintrc: {
        enabled: true, // 若没此json文件，先开启，生成后在关闭
        filepath: './.eslintrc-auto-import.json', // 默认
        globalsPropValue: true,
      },
      dirs: ['src/store'],
      vueTemplate: true,
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
      components: resolve('src/components'),
      api: resolve('src/api'),
    },
  },
})
