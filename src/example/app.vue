<!--
 * @Author       : 王宇
 * @desc         : 组件描述
 * @Date         : 2022-04-25 17:35:14
 * @LastEditTime : 2022-05-11 10:51:02
 * @LastEditors  : 王宇
 * @FilePath     : \vue-element-table\src\app.vue
-->

<template>
    <div id="app">
        <p>动态数据</p>
        <comp-table
            :getRowKey="getRowKey"
            :cols="cols"
            :opts="opts"
            ref="comTable"
            class="mt16"
        ></comp-table>
        <p>静态数据</p>
        <comp-table
            :getRowKey="getRowKey"
            style="margin-top: 10px"
            :cols="cols"
            :opts="opts1"
            ref="comTable"
            class="mt16"
        ></comp-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            opts: {
                url: '/api/login',
            },
            opts1: {
                dataType: 'static',
                tableList: [
                    {
                        lsh: '123',
                        jylsh: '4234',
                        jcxdh: '153423',
                        jyjgbh: '1122413',
                    },
                    {
                        lsh: '124',
                        jylsh: '4234',
                        jcxdh: '153423',
                        jyjgbh: '1122413',
                    },
                ],
            },
            cols: [
                {
                    isSelect: true,
                    reserveSelection: true,
                },
                {
                    title: '流水号',
                    key: 'lsh',
                    sortable: true,
                },
                { title: '检验流水号', key: 'jylsh' },
                { title: '检测线代号', key: 'jcxdh' },
                { title: '安检机构编码', key: 'jyjgbh' },
            ],
        }
    },
    created() {
        for (let index = 0; index < 10; index++) {
            this.opts1.tableList.push({
                lsh: '124' + index,
                jylsh: '4234',
                jcxdh: '153423',
                jyjgbh: '1122413',
            })
        }
    },
    methods: {
        getRowKey(row) {
            console.log(row)
            return row.lsh
        },
    },
}
</script>
