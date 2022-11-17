import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import postcsspxtoviewport from 'cnjm-postcss-px-to-viewport'
import autoprefixer from 'autoprefixer'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
const root = process.cwd()

function pathResolve(dir) {
  return path.resolve(root, `.`, dir)
}
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ``)
  console.log(env.VITE_PUBLIC_PATH)
  // console.log(process.env)
  return {
    base: env.VITE_PUBLIC_PATH || `/`,
    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()]
      }),
      createSvgIconsPlugin({
        iconDirs: [pathResolve(`src/icons`)],
        symbolId: `icon-[dir]-[name]`,
        svgoOptions: true
      }),
      vueJsx()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL(`./src`, import.meta.url))
      }
    },
    server: {
      host: `0.0.0.0`,
      open: false, //启动项目后打开浏览器
      // port: 1111, //端口
      proxy: {
        '/api': {
          target: `http://localhost:3000/`, //API服务地址
          changeOrigin: true //开启跨域
          // rewrite: (path) => path.replace(/^\//, ``)
        }
      }
    },
    css: {
      postcss: {
        plugins: [
          postcsspxtoviewport({
            viewportWidth: 750,
            customFun: ({ file }) => {
              // 这个自定义的方法是针对处理vant组件下的设计稿为375问题
              const designWidth = path
                .join(file)
                .includes(path.join(`node_modules`, `vant`))
                ? 375
                : 750
              return designWidth
            }
          }),
          autoprefixer
        ]
      }
    },
    define: {
      // __APP_ENV__: env.VITE_BASE_URL
    },
    build: {
      minify: `terser`,
      outDir: `dist`,
      sourcemap: env.VITE_SOURCEMAP === `true` ? `inline` : false,
      chunkSizeWarningLimit: 1500,
      // brotliSize: false,
      // rollupOptions: {
      //   output: {
      //     // 最小化拆分包
      //     manualChunks(id) {
      //       if (id.includes(`node_modules`)) {
      //         return id
      //           .toString()
      //           .split(`node_modules/`)[1]
      //           .split(`/`)[0]
      //           .toString()
      //       }
      //     },
      //     chunkFileNames: `js/[name].[hash].js` // 用于命名代码拆分时创建的共享块的输出命名，[name]表示文件名,[hash]表示该文件内容hash值
      //   }
      // },
      terserOptions: {
        compress: {
          drop_debugger: env.VITE_DROP_DEBUGGER === `true`,
          drop_console: env.VITE_DROP_CONSOLE === `true`
        }
      }
    }
  }
})
