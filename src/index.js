/*
 * @Author       : 王宇
 * @desc         : 通用表格组件
 * @Date         : 2019-11-05 14:44:52
 * @LastEditTime : 2022-04-26 17:15:31
 * @LastEditors  : 王宇
 * @FilePath     : \vue-element-table\src\index.js
 */
import comTableComp from './com-table.vue'
import { Table, TableColumn, Pagination, Loading } from 'element-ui'
import 'element-ui/lib/theme-chalk/table.css'
import 'element-ui/lib/theme-chalk/table-column.css'
import 'element-ui/lib/theme-chalk/pagination.css'
var comTable = function (Vue, options) {
    Vue.component(comTableComp.name, comTableComp)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Pagination)
    Vue.directive('Loading', Loading)
}
if (typeof window !== 'undefined' && window.Vue) {
    comTable(window.Vue)
}
export default comTable
