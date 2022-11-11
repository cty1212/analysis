import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import postcsspxtoviewport from 'postcss-px-to-viewport-8-plugin'
import autoprefixer from 'autoprefixer'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ``)
  console.log(env.VITE_BASE_URL)
  // console.log(process.env)
  return {
    base: env.VITE_BASE_URL || `/`,
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
    css: {
      postcss: {
        plugins: [postcsspxtoviewport({ viewportWidth: 750 }), autoprefixer]
      }
    },
    define: {
      // __APP_ENV__: env.VITE_BASE_URL
    }
  }
})
