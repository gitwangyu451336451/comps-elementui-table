/*
 * @Author       : 王宇
 * @desc         : 通用表格组件
 * @Date         : 2019-11-05 14:44:52
 * @LastEditTime : 2022-05-10 17:09:23
 * @LastEditors  : 王宇
 * @FilePath     : \vue-element-table\src\index.js
 */
import table from './table.vue'
var compTable = {
    install: function (Vue, options) {
        // 为表格添加请求对象
        // eslint-disable-next-line no-param-reassign
        Vue.prototype.$axios = options.axios
        Vue.component(table.name, table)
    },
}
if (typeof window !== 'undefined' && window.Vue && window.$axios) {
    window.Vue.use(compTable, { axios: window.$axios })
}
export default compTable
