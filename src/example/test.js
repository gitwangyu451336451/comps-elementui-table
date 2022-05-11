/*
 * @Author       : 王宇
 * @desc         : 组件描述
 * @Date         : 2022-04-25 11:09:55
 * @LastEditTime : 2022-05-11 10:55:16
 * @LastEditors  : 王宇
 * @FilePath     : \vue-element-table\src\example\test.js
 */

import '../mock/index'
import Vue from 'vue'
import app from './app.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import comTable from '../dist/index.js'

import comTable from '../index'
import axios from 'axios'
axios.interceptors.response.use((response) => {
    return response.data
})
Vue.use(ElementUI)
Vue.use(comTable, { axios })
new Vue({ render: (h) => h(app) }).$mount('#app')
