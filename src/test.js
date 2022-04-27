/*
 * @Author       : 王宇
 * @desc         : 组件描述
 * @Date         : 2022-04-25 11:09:55
 * @LastEditTime : 2022-04-26 17:15:46
 * @LastEditors  : 王宇
 * @FilePath     : \vue-element-table\src\test.js
 */

import Vue from 'vue'
import app from './app.vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)
import comTable from '../dist/index.js'
Vue.use(comTable)
new Vue({ render: (h) => h(app) }).$mount('#app')
