import 'vue/jsx'

// 引入windi css
import '@/plugins/unocss'

// 导入全局的svg图标
import '@/plugins/svgIcon'

// 初始化多语言
import { setupI18n } from '@/plugins/vueI18n'

// 引入状态管理
import { setupStore } from '@/store'

// 全局组件
import { setupGlobCom } from '@/components'

// 引入element-plus
import { setupElementPlus } from '@/plugins/elementPlus'

// 引入全局样式
import '@/styles/index.less'

// 引入动画
import '@/plugins/animate.css'

// 路由
import { setupRouter } from './router'

import { createApp } from 'vue'

import App from './App.vue'

import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/styles/main.scss'

// 创建实例
const setupAll = async () => {
  const app = createApp(App)

  app.use(ElementPlus, {
    // options
  })

  app.config.errorHandler = (err, instance, info) => {
    console.log('Global Error Handler:', err, info)
    // You can also log the error to an external service here
  }

  app.config.warnHandler = (msg, instance, trace) => {
    console.warn('Global Warning Handler:', msg, trace)
    // You can also log the warning to an external service here
  }

  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

  await setupI18n(app)

  setupStore(app)

  setupGlobCom(app)

  setupElementPlus(app)

  setupRouter(app)

  app.mount('#app')
}

setupAll()
