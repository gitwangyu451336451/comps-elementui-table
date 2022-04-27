<!--
 * @Author       : 王宇
 * @desc         : 组件描述
 * @Date         : 2022-01-20 15:22:41
 * @LastEditTime : 2022-04-26 12:16:53
 * @LastEditors  : 王宇
 * @FilePath     : \vue-element-table\src\com-table-col.vue
-->

<template>
    <div ref="col"></div>
</template>

<script>
import Vue from 'vue'
export default {
    props: ['render', 'row', 'index', 'tableData'],
    mounted() {
        this.reRender()
    },
    methods: {
        reRender() {
            const col = new Vue({
                render: (h) => {
                    return this.render(h, this.row, this.index, this.tableData)
                },
            })
            col.$mount(this.$refs.col)
        },
    },
}
</script>
