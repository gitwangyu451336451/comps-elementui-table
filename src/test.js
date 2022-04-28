/*
 * @Author       : 王宇
 * @desc         : 组件描述
 * @Date         : 2022-04-25 11:09:55
 * @LastEditTime : 2022-04-28 08:28:16
 * @LastEditors  : 王宇
 * @FilePath     : \vue-element-table\src\test.js
 */

import Vue from 'vue'
import app from './app.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import comTable from '../dist/index.js'
// console.log(comTable, 123)
Vue.use(ElementUI)
Vue.use(comTable)
new Vue({ render: (h) => h(app) }).$mount('#app')
console.log(123)
