/*
 * @Author       : 王宇
 * @desc         : 组件描述
 * @Date         : 2022-05-10 14:05:43
 * @LastEditTime : 2022-05-11 08:35:30
 * @LastEditors  : 王宇
 * @FilePath     : \vue-element-table\src\mock\index.js
 */
import Mock from 'mockjs'

Mock.mock(RegExp('/api/login' + '.*'), {
    content: {
        list: [
            {
                lsh: '123',
                jylsh: '4234',
                jcxdh: '153423',
                jyjgbh: '1122413',
            },
        ],
        total: 20,
    },
})
