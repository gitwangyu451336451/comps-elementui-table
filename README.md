# comps-elementui-table

> vue + elementUI
> 基于 vue 和 elementUI 二次开发的表格组件，支持 el-table 基础功能，扩展分页查询，可支持动态和静态数据，目的是提高开发效率，减少代码量。

---

开始

```
npm install comps-elementui-table --save
```

---

使用

```
import comTable from 'comps-elementui-table'
```

由于组件数据是通过组件内部请求发起，故需要将 axios 挂在到组件上；原因：分页时需要重新拉取数据，一般项目会对请求和返回头进行封装，例如设置 token，故将 axios 对象传入。
注：组件已与后端约定好数据返回格式

```
Vue.use(comTable, { axios })
```

---

> props

| 参数                | 说明                                                                                                                                                                       | 类型          | 可选值                                                                                                                                                                                | 默认值 |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| size                | Table 的尺寸                                                                                                                                                               | String        | medium / small / mini                                                                                                                                                                 | medium |
| pagination          | 分页配置，是否展示 show,分页大小:pageSize,页码按钮的数量，当总页数超过该值时会折叠 pagerCount                                                                              | Object        | {show:true,pageSize:0,pagerCount:5}                                                                                                                                                   | --     |
| border              | 是否带有纵向边框                                                                                                                                                           | Boolean       | true/false                                                                                                                                                                            | true   |
| opts                | 数据请求配置，必填 dataType 静态或动态数据类型,type 请求类型,url 请求地址,params 默认请求参数,tableList 静态数据 dataType 为 static 时生效                                 | Object        | {dataType: 'remote',type: 'get',url: '',params: '',tableList:[]}                                                                                                                      | --     |
| showIndex           | 是否显示序号                                                                                                                                                               | Boolean       | true/false                                                                                                                                                                            | false  |
| cols                | 表格列设置；reserveSelection 在 isSelect 为 true 时生效,一般情况设置首列为{isSelect: true,reserveSelection: true},checkSelectable 设置当前列是否可选,sortable 设置是否排序 | Array         | [{title: '列名',key: '字段',isSelect:false,reserveSelection:true,checkSelectable:true,sortable: true,width:'宽度',expand:'是否展开',fixed:'浮动',renderHeader:'',render:(h,row)=>{}}] |        |
| maxHeight           | Table 的最大高度。合法的值为数字或者单位为 px 的高度                                                                                                                       | string/number | --                                                                                                                                                                                    | --     |
| stripe              | 是否为斑马纹 table                                                                                                                                                         | Boolean       | true/false                                                                                                                                                                            | true   |
| showOverflowTooltip | 表格列超出是否显示 tooltip                                                                                                                                                 | Boolean       | true/false                                                                                                                                                                            | true   |
| summaryConf         | 合计行相关配置                                                                                                                                                             | Object        | {summary: false, sumText: '',showSummary: '',objectSpanMethod: () => {},summaryMethod: () => {},}                                                                                     | --     |

---

> 函数

| 方法名  | 说明 | 参数                                       |
| ------- | ---- | ------------------------------------------ |
| refresh | 刷新 | params:Object,可传入附加参数或覆盖已有参数 |

---

> 事件

| 事件名           | 说明                                         | 参数           |
| ---------------- | -------------------------------------------- | -------------- |
| selectOne        | 当用户手动勾选数据行的 Checkbox 时触发的事件 | selection, row |
| selectAll        | 当用户手动勾选全选 Checkbox 时触发的事件     | selection      |
| selection-change | 当选择项发生变化时会触发该事件               | selection      |
| getData          | dataType 为 remote 时，数据获取成功事件      | dataList,total |
