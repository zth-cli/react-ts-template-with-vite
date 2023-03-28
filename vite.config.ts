import { loadEnv, ConfigEnv, UserConfigExport } from 'vite'
import react from '@vitejs/plugin-react'
import viteEslint from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path'

const resolve = (dir: string) => path.join(__dirname, dir)
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const isBuild = command === 'build'
  const root = process.cwd()
  // console.log(loadEnv(mode, process.cwd())); // 获取当前环境的.nev.${mode}的值
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = loadEnv(mode, root)
  return {
    plugins: [
      react(),
      viteEslint({
        failOnError: false,
      }),
      AutoImport({
        imports: ['react', 'react-router-dom', 'ahooks'], // 自动导入vue和vue-router等相关函数
        eslintrc: {
          enabled: false, // 若没此json文件，先开启，生成后在关闭
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
    base: isBuild ? './' : VITE_PUBLIC_PATH,
    server: {
      port: Number(VITE_PORT),
      host: '0.0.0.0',
      open: true,
      proxy: {
        '/api': {
          target: VITE_PROXY, // 目标地址
          changeOrigin: true, // 设置同源 默认false，是否需要改变原始主机头为目标URL,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
}
