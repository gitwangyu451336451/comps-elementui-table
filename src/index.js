/*
 * @Author       : 王宇
 * @desc         : 通用表格组件
 * @Date         : 2019-11-05 14:44:52
 * @LastEditTime : 2022-04-27 16:01:19
 * @LastEditors  : 王宇
 * @FilePath     : \vue-element-table\src\index.js
 */
import comTableComp from './com-table.vue'
// import elementUi from 'element-ui'
// import 'element-ui/lib/theme-chalk/table.css'
// import 'element-ui/lib/theme-chalk/table-column.css'
// import 'element-ui/lib/theme-chalk/pagination.css'
var comTable = {
    install: function (Vue, options) {
        Vue.component(comTableComp.name, comTableComp)
        // console.log(elementUi)
        // Vue.use(elementUi)
        // Vue.use(TableColumn)
        // Vue.use(Pagination)
        // Vue.directive('Loading', Loading)
    },
}
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(comTable)
}
export default comTable
