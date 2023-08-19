import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router/index.js'
import "@popperjs/core"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import i18n from './i18n'

function useTable(app) {
    app.use(VXETable)
}

VXETable.setup({
    // 对组件内置的提示语进行国际化翻译
    i18n: (key, args) => i18n.global.t(key, args)
  })

createApp(App).use(router).use(useTable).use(i18n).mount('#app');