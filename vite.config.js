import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import postcsspxtoviewport from 'cnjm-postcss-px-to-viewport'
import autoprefixer from 'autoprefixer'
import path from 'path'
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
      vueJsx()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL(`./src`, import.meta.url))
      }
    },
    server: {
      host: `0.0.0.0`
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
    }
  }
})
