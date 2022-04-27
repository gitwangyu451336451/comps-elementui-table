<!--
 * @Author       : 王宇
 * @desc         : 组件描述
 * @Date         : 2022-04-25 17:35:14
 * @LastEditTime : 2022-04-26 13:43:45
 * @LastEditors  : 王宇
 * @FilePath     : \vue-element-table\src\app.vue
-->

<template>
    <div id="app">
        <el-table :data="tableData">
            <el-table-column prop="date"></el-table-column>
        </el-table>
        <com-table :tabAttr="tabAttr" ref="comTable" class="mt16"></com-table>
    </div>
</template>

<script>
import comTable from './com-table.vue'

export default {
    components: { comTable },
    data() {
        return {
            tableData: [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                },
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄',
                },
            ],
            tabAttr: {
                source: {
                    type: 'remote',
                    url: '',
                    params: { spotCheckId: '' },
                    tableData: {
                        tableList: [],
                    },
                },
                cols: [
                    {
                        title: '异常状态',
                        key: 'yczt',
                        render: (h, p) => {
                            return h('span', [p.yczt || '--'])
                        },
                    },
                    { title: '流水号', key: 'lsh' },
                    { title: '检验流水号', key: 'jylsh' },
                    { title: '检测线代号', key: 'jcxdh' },
                    { title: '安检机构编码', key: 'jyjgbh' },
                    { title: '检验类别', key: 'jylb' },
                    { title: '上线标记', key: 'sxbj' },
                    { title: '号牌号码', key: 'hphm' },
                    { title: '号牌种类', key: 'hpzl' },
                    { title: '中文品牌', key: 'clpp1' },
                    { title: '车辆型号', key: 'clxh' },
                    { title: '车辆类型', key: 'cllx' },
                ],
            },
        }
    },
}
</script>

<style>
#app {
    color: red;
}
</style>
