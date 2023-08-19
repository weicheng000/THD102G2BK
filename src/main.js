import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router/index.js'
import "@popperjs/core"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

function useTable(app) {
    app.use(VXETable)
}

createApp(App).use(router).use(useTable).mount('#app');