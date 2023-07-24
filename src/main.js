import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Elementplus from 'element-plus'
import axios from 'axios'
import * as echarts from "echarts";
createApp(App).config.globalProperties.$echarts = echarts;
createApp(App).config.globalProperties.$axios=axios;
createApp(App).use(router)
              .use(Elementplus)
              .mount('#app')

