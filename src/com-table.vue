<!--
 * @Author       : 王宇
 * @desc         : 组件描述
 * @Date         : 2022-01-19 11:00:20
 * @LastEditTime : 2022-04-26 15:26:54
 * @LastEditors  : 王宇
 * @FilePath     : \vue-element-table\src\com-table.vue
-->
<template>
    <div class="com-table">
        <el-table
            :data="tableData"
            :stripe="tabAttr.stripe !== false"
            :row-key="tabAttr.rowKey"
            :max-height="tabAttr.maxHeight"
            v-loading="loading"
            border
            :sum-text="tabAttr.summary && tabAttr.summary.sumText"
            :show-summary="tabAttr.summary && tabAttr.summary.showSummary"
            :spanMethod="tabAttr.summary && tabAttr.summary.objectSpanMethod"
            :summary-method="tabAttr.summary && tabAttr.summary.summaryMethod"
            :tree-props="tabAttr.treeProps"
            :size="tabAttr.size || 'medium'"
            ref="mytable"
            @select-all="selectAll"
            @selection-change="handleSelectionChange"
            @select="selectOne"
            @sort-change="sortChange"
            style="width: 100%"
        >
            <el-table-column
                v-if="tabAttr.showIndex"
                label="序号"
                type="index"
                width="60"
            >
                <template slot-scope="scope">
                    {{ (pageNum - 1) * pageSize + scope.$index + 1 }}
                </template>
            </el-table-column>
            <template v-for="(item, i) in tabAttr.cols">
                <el-table-column
                    type="selection"
                    :key="'col' + i"
                    v-if="item.showSelect"
                    :reserve-selection="item.reserveSelection"
                    :selectable="item.checkSelectable"
                    width="55"
                >
                </el-table-column>
                <el-table-column
                    :key="'col' + i"
                    :prop="item.key"
                    :label="item.title"
                    :width="item.width"
                    :type="item.expand"
                    :formatter="item.formatter"
                    :show-overflow-tooltip="tabAttr.showOverflowTooltip"
                    :sortable="item.sortable"
                    :fixed="item.fixed"
                    :render-header="item.renderHeader"
                    v-else-if="!item.render && !item.expand"
                >
                </el-table-column>
                <el-table-column
                    :key="'col' + i"
                    type="expand"
                    width="55"
                    :sortable="item.sortable"
                    :render-header="item.renderHeader"
                    v-else-if="item.expand"
                >
                    <template> </template>
                </el-table-column>
                <el-table-column
                    :key="'col' + i"
                    v-else
                    :fixed="item.fixed"
                    :width="item.width"
                    :label="item.title"
                    :render-header="item.renderHeader"
                >
                    <template slot-scope="scope">
                        <component
                            :is="'mytablecol'"
                            :render="item.render"
                            :index="scope.$index"
                            :tableData="tableData"
                            :row="scope.row"
                        >
                        </component>
                    </template>
                </el-table-column>
            </template>
            <slot name="empty-content" slot="empty"> </slot>
        </el-table>
        <div class="mt10 fl">
            <slot name="tooltipBL"></slot>
        </div>
        <slot name="bottom"></slot>
        <el-pagination
            background
            class="pagination"
            v-if="!hidePagination"
            :pager-count="tabAttr.pagerCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>
        <div style="clear: both"></div>
    </div>
</template>

<script>
import mytablecol from './com-table-col.vue'
export default {
    props: {
        tabAttr: {
            type: Object,
            default: () => {
                return {
                    // table的大小
                    summary: {
                        sumText: '',
                        showSummary: '',
                        objectSpanMethod: () => {},
                        summaryMethod: () => {},
                    },
                    size: 'medium',
                    // 是否显示pagination
                    hidePagination: false,
                    // 是否合计
                    showSummary: false,
                    showOverflowTooltip: true,
                    // 分页参数
                    pageSize: 0,
                    pagerCount: 5,
                    rowKey: '', // 行数据的 Key，用来优化 Table 的渲染
                    treeProps: {}, // 渲染嵌套数据的配置选项
                    source: {
                        type: 'remote', // remote远程数据,static静态数据，
                        reqType: 'get',
                        url: '', // type==remote时启用
                        params: '', // type==remote时启用
                        tableData: {
                            // type==static时配置
                            // rows: 0, // 总数
                            tableList: [], // 静态数据 selfDef属性-是否自定义列内容
                        },
                    },
                    showSelect: false, // 是否显示选择框
                    showIndex: false, // 是否显示序号
                    // 搜索框配置
                    searchCof: {
                        showSearch: true,
                        searchData: [], // { type: '',key:'',list:[] } type===select,list存在,type===text,list不存在
                    },
                    cols: [], // 列表属性参考element-ui
                    // 配置 iSearch 是否是搜索字段
                    // 合并单元格自定义函数
                    objectSpanMethod: null,
                }
            },
        },
    },
    name: 'comTable',
    data() {
        return {
            loading: false,
            hidePagination: false,
            pageNum: 1,
            pageSize: 10,
            pageSizes: [10, 20, 30, 40],
            searchText: '',
            select: '',
            localData: [],
            total: 0,
            // 搜索字段
            searchData: [],
            // 当前选择的参数
            nowSelectParam: null,
            key: 1,
            orderField: '',
            orderWay: '',
            // 静态数据
            tableList: [],
        }
    },
    computed: {
        tableData() {
            //  静态数据
            if (this.tabAttr.source.type === 'static') {
                if (!this.hidePagination) {
                    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                    this.total = this.tabAttr.source.tableData.tableList.length
                    return this.tabAttr.source.tableData.tableList
                } else {
                    const arr = this.tabAttr.source.tableData.tableList.filter(
                        (item, i) => {
                            const max = this.pageNum * this.pageSize
                            const min = (this.pageNum - 1) * this.pageSize
                            return i + 1 <= max && i + 1 > min
                        }
                    )
                    return arr
                }
                // 远程数据
            } else {
                return this.localData
            }
        },
        // 数据总数
        dataRows() {
            if (this.tabAttr.source.type === 'static') {
                return this.tabAttr.source.tableData.tableList.length
            } else {
                return this.localData[0].total
            }
        },
    },
    created() {
        // 初始化配置
        this.initConfig()
        if (this.tabAttr.source.type !== 'static') {
            this.getData()
        } else {
            this.total = this.tabAttr.source.tableData.tableList.length
            this.tableList = JSON.parse(
                JSON.stringify(this.tabAttr.source.tableData.tableList)
            )
            // this.$nextTick(() => {
            //     this.toggleSelection()
            //     this.toggleSelectionByData()
            // })
        }
    },
    mounted() {},
    watch: {},
    methods: {
        /**
         * @description: 初始化配置
         */
        initConfig() {
            this.hidePagination = this.tabAttr.hidePagination
            // 设置分页大小
            !!this.tabAttr.pageSize &&
                (this.pageSize = this.tabAttr.pageSize) &&
                this.pageSizes.push(this.tabAttr.pageSize)
        },
        /**
         * @description: 改变页容量
         */
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`)
            this.pageSize = val
            this.pageNum = 1
            this.getData()
        },
        /**
         * @description: 改变当前页
         */
        handleCurrentChange(val) {
            this.pageNum = val
            this.pageSize = 10
            // console.log(`当前页: ${val}`)
            this.getData()
        },
        /**
         * @description: 选中全部
         * @param {*}selection
         */
        selectAll(selection) {
            this.selection = selection
            this.$emit('selection-all', selection)
        },
        /**
         * @description: 表格事件 selection-change
         * @param {*} selection
         */
        handleSelectionChange(selection) {
            this.selection = selection
            this.$emit('selection-change', selection)
        },
        /**
         * @description: 选中单个
         * @param {*} selection
         * @param {*} row
         */
        selectOne(selection, row) {
            this.$emit('selectOne', selection, row)
        },
        /**
         * @description: 排序数据
         * @param {*} column
         */
        sortChange(column) {
            if (column.order && column.order === 'descending') {
                this.orderField = column.prop
                this.orderWay = 'DESC'
            } else if (column.order && column.order === 'ascending') {
                this.orderField = column.prop
                this.orderWay = 'ASC'
            } else {
                this.orderField = ''
                this.orderWay = ''
            }
            this.getData()
        },
        /**
         * @description: 获取动态数据
         * @param {*} p
         */
        getData(p) {
            if (!this.tabAttr.source.url) {
                return
            }
            this.loading = true
            const param = Object.assign(
                { pageSize: this.pageSize, pageNum: this.pageNum },
                this.tabAttr.source.params,
                p
            )

            if (this.orderField !== '' && this.orderField != null) {
                param.orderField = this.orderField
                param.orderWay = this.orderWay
            }
            if (this.tabAttr.source.type === 'static') {
                const data = JSON.parse(
                    JSON.stringify(this.tabAttr.source.tableData.tableList)
                )
                this.tableList = data.filter((item) => {
                    let s = true
                    Object.keys(param).forEach((r) => {
                        item[r] && item[r].indexOf(param[r]) < 0 && (s = false)
                    })
                    return s
                })
                this.total = this.tableList.length
                this.$emit('searchData', this.tableList)
                this.loading = false
                // this.toggleSelection()
                // this.toggleSelectionByData()
                return
            }
            return new Promise((resolve) => {
                const p = Object.assign({ params: param })
                this.$axios
                    .get(this.tabAttr.source.url, p)
                    .then((res) => {
                        if (
                            res.content &&
                            res.content.list &&
                            Object.prototype.toString.call(res.content.list) ===
                                '[object Array]'
                        ) {
                            this.localData = res.content.list
                            this.total = res.content.total
                        } else {
                            this.localData = []
                        }
                        this.loading = false
                        this.$emit('getData', this.localData, this.total)

                        this.$nextTick(() => {
                            ++this.key
                            // this.toggleSelection()
                            // this.toggleSelectionByData()
                            this.$emit('afterGetData', this.localData)
                        })
                        resolve(this.localData)
                    })
                    .catch((e) => {
                        this.loading = false
                    })
            })
        },
        /**
         * @description: 刷新
         */
        refresh(p) {
            if (this.tabAttr.source.type === 'static') {
                this.total = this.tabAttr.source.tableData.tableList.length
                this.tableList = JSON.parse(
                    JSON.stringify(this.tabAttr.source.tableData.tableList)
                )
                ++this.key
            } else {
                return this.getData(p)
            }
        },
    },
    components: {
        mytablecol,
    },
}
</script>
