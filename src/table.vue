<!--
 * @Author       : 王宇
 * @desc         : 组件描述
 * @Date         : 2022-01-19 11:00:20
 * @LastEditTime : 2022-05-11 11:04:09
 * @LastEditors  : 王宇
 * @FilePath     : \vue-element-table\src\table.vue
-->
<template>
    <div class="com-table">
        <el-table
            :data="tableData"
            :stripe="stripe !== false"
            :row-key="rowKey"
            :max-height="maxHeight"
            v-loading="loading"
            :border="border"
            :sum-text="summaryConf.summary ? summaryConf.sumText : ''"
            :show-summary="summaryConf.summary && summaryConf.showSummary"
            :spanMethod="
                summaryConf.summary ? summaryConf.objectSpanMethod : null
            "
            :summary-method="
                summaryConf.summary ? summaryConf.summaryMethod : null
            "
            :size="size || 'medium'"
            ref="mytable"
            @select-all="selectAll"
            @selection-change="handleSelectionChange"
            @select="selectOne"
            @sort-change="sortChange"
            style="width: 100%"
        >
            <el-table-column
                v-if="showIndex"
                label="序号"
                type="index"
                width="60"
            >
                <template slot-scope="scope">
                    {{ (pageNum - 1) * pageSize + scope.$index + 1 }}
                </template>
            </el-table-column>
            <template v-for="(item, i) in cols">
                <el-table-column
                    type="selection"
                    :key="'col' + i"
                    v-if="item.isSelect"
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
                    :show-overflow-tooltip="showOverflowTooltip"
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
                            :is="'tablecol'"
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
        <div class="com-table-tooltipBl">
            <slot name="tooltipBL"></slot>
        </div>
        <slot name="bottom"></slot>
        <el-pagination
            background
            class="pagination"
            v-if="pagination.show"
            :pager-count="pagination.pagerCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="compTotal"
        >
        </el-pagination>
        <div style="clear: both"></div>
    </div>
</template>

<script>
import tablecol from './table-col.vue'
export default {
    props: {
        // 大小
        size: {
            type: String,
            default: 'medium',
        },
        // 分页配置
        pagination: {
            type: Object,
            default: () => {
                return {
                    show: true,
                    // 分页参数
                    pageSize: 0,
                    pagerCount: 5,
                }
            },
        },
        // 是否显示边框
        border: {
            type: Boolean,
            default: true,
        },
        // 请求配置
        opts: {
            type: Object,
            default: () => {
                return {
                    dataType: 'remote',
                    type: 'get',
                    url: '',
                    params: '',
                    tableList: [],
                }
            },
        },
        // 是否显示序号
        showIndex: {
            type: Boolean,
            default: false,
        },
        // 列属性配置
        cols: {
            type: Array,
            default: () => {
                return []
            },
        },
        // 是否显示斑马线
        stripe: {
            type: Boolean,
            default: true,
        },
        // table最大高度
        maxHeight: {
            type: String || Number,
        },
        // 列超出时，显示tooltip
        showOverflowTooltip: {
            type: Boolean,
            default: true,
        },
        // 合计配置
        summaryConf: {
            type: Object,
            default: () => {
                return {
                    summary: false,
                    sumText: '',
                    showSummary: '',
                    objectSpanMethod: () => {},
                    summaryMethod: () => {},
                }
            },
        },
        rowKey: {
            type: String || Function,
        },
    },
    name: 'compTable',
    data() {
        return {
            loading: false,
            pageNum: 1,
            pageSize: 10,
            pageSizes: [10, 20, 30, 40],
            localData: [],
            total: 0,
        }
    },
    computed: {
        compTotal() {
            if (this.opts.dataType === 'static') {
                return this.opts.tableList.length
            } else {
                return this.total
            }
        },
        tableData() {
            //  静态数据
            if (this.opts.dataType === 'static') {
                if (!this.pagination.show) {
                    return this.opts.tableList
                } else {
                    const arr = this.opts.tableList.filter((item, i) => {
                        const max = this.pageNum * this.pageSize
                        const min = (this.pageNum - 1) * this.pageSize
                        return i + 1 <= max && i + 1 > min
                    })
                    return arr
                }
                // 远程数据
            } else {
                return this.localData
            }
        },
        // 数据总数
        dataRows() {
            if (this.opts.dataType === 'static') {
                return this.opts.tableList.length
            } else {
                return this.localData[0].total
            }
        },
    },
    created() {
        // 初始化配置
        this.initConfig()
        if (this.opts.dataType !== 'static') {
            this.getData()
        } else {
            this.total = this.opts.tableList.length
        }
    },
    methods: {
        /**
         * @description: 初始化配置
         */
        initConfig() {
            // 设置分页大小
            !!this.pagination.pageSize &&
                (this.pageSize = this.pagination.pageSize) &&
                this.pageSizes.push(this.pagination.pageSize)
        },
        /**
         * @description: 改变页容量
         */
        handleSizeChange(val) {
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
        sortChange({ order, prop }) {
            this.getData({ order, prop })
        },
        /**
         * @description: 获取动态数据
         * @param {*} p
         */
        getData(p) {
            if (!this.opts.url) {
                return
            }
            this.loading = true
            const param = Object.assign(
                { pageSize: this.pageSize, pageNum: this.pageNum },
                this.opts.params,
                p
            )
            if (this.opts.dataType === 'static') {
                const data = JSON.parse(JSON.stringify(this.opts.tableList))
                this.localData = data.filter((item) => {
                    let s = true
                    Object.keys(param).forEach((r) => {
                        item[r] && item[r].indexOf(param[r]) < 0 && (s = false)
                    })
                    return s
                })
                this.total = this.localData.length
                this.loading = false
                return
            }
            return new Promise((resolve) => {
                const p = Object.assign({ params: param })
                this.$axios
                    .get(this.opts.url, p)
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
            if (this.opts.dataType === 'static') {
                this.localData = JSON.parse(JSON.stringify(this.opts.tableList))
            } else {
                return this.getData(p)
            }
        },
    },
    components: {
        tablecol,
    },
}
</script>

<style scoped lang="scss">
.com-table {
    &-tooltipBl {
        margin-top: 10px;
        float: left;
    }
    .pagination {
        float: right;
        margin-top: 10px;
    }
}
</style>
