/*
 * @Author       : 王宇
 * @desc         : 组件描述
 * @Date         : 2022-04-26 17:09:08
 * @LastEditTime : 2022-05-11 10:55:11
 * @LastEditors  : 王宇
 * @FilePath     : \vue-element-table\webpack.config.dev.js
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const TerserWebpackPlugin = require('terser-webpack-plugin')
console.log(process.env.NODE_ENV)
const config = {
    mode: 'development',
    entry: {
        index: './src/example/test.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        // library: {
        //     // 默认umd支持包括amd
        //     type: 'commonjs-static', // commonjs-static支持require和import两种模式
        // },
        clean: true,
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            { test: /\.vue$/, use: ['vue-loader'] },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // 将 JS 字符串生成为 style 节点
                    'style-loader',
                    // 将 CSS 转化成 CommonJS 模块
                    'css-loader',
                    // 将 Sass 编译成 CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    optimization: {
        // runtimeChunk: 'single', // 解决热更新miss错误问题
        // minimize: true, // 压缩混淆
        // minimizer: [
        //     new TerserWebpackPlugin({
        //         terserOptions: {
        //             compress: {
        //                 // pure_funcs: ['console.log'],
        //             },
        //         },
        //     }),
        // ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'Development',
            template: 'index.html',
        }),
    ],
}

module.exports = config
