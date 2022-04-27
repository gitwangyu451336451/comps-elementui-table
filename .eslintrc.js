/*
 * @Author       : 王宇
 * @desc         : 组件描述
 * @Date         : 2019-11-04 11:54:17
 * @LastEditTime : 2022-04-26 11:41:38
 * @LastEditors  : 王宇
 * @FilePath     : \vue-element-table\.eslintrc.js
 */
// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    extends: [
        'standard',
        'plugin:vue/essential',
        'plugin:prettier/recommended', // 推荐写法- 以插件方式， 把 Prettier 推荐的格式问题的配置以 ESLint rules 的方式写入,统一代码问题的来源
    ], // prettier放最后，disable所有和 Prettier 冲突的 ESLint 的配置
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['html'],
    rules: {
        'import/extensions': [
            0,
            'never',
            {
                vue: 'never',
                js: 'never',
                html: 'never',
                scss: 'never',
            },
        ], // 省略文件扩展
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: true,
            },
        ],
        'no-param-reassign': [
            'error',
            {
                props: true,
                ignorePropertyModificationsFor: [
                    'state', // for vuex state
                    'config',
                    'val',
                    'value',
                    'content',
                    'item',
                    'form',
                ],
            },
        ],
        indent: [
            // 缩进
            2,
            4,
            {
                SwitchCase: 1,
            },
        ],
    },
}
