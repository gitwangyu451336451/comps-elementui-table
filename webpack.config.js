/*
 * @Author       : 王宇
 * @desc         : 组件描述
 * @Date         : 2022-04-27 15:04:08
 * @LastEditTime : 2022-05-11 09:07:06
 * @LastEditors  : 王宇
 * @FilePath     : \vue-element-table\webpack.config.js
 */
const path = require('path')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const nodeExternals = require('webpack-node-externals')
// const CopyPlugin = require('copy-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
    entry: {
        index: './src/index',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        library: 'compsElementTable',
        libraryTarget: 'umd',
        globalObject: 'this',
        clean: true,
    },
    // resolve: {
    //     extensions: ['.tsx', '.ts', '.js'],
    //     alias: {
    //         '@': path.resolve(__dirname, './src'),
    //     },
    // },
    // plugins: [
    // new CopyPlugin({
    //     patterns: [
    //         {
    //             from: path.resolve(__dirname, './src/types.ts'),
    //             to: path.resolve(__dirname, './dist/index.d.ts'),
    //         },
    //     ],
    // }),
    // ],
    module: {
        rules: [
            { test: /\.vue$/, use: ['vue-loader'] },
            {
                test: /\.(jsx?|tsx?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                        },
                    },
                ],
            },
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
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: 'asset/resource',
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024,
                    },
                },
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({
                terserOptions: {
                    compress: {
                        // pure_funcs: ['console.log'],
                    },
                },
            }),
        ],
    },
    externalsPresets: { node: true },
    // externals: {
    //     'element-ui': {
    //         commonjs: 'element-ui',
    //         commonjs2: 'element-ui',
    //         amd: 'element-ui',
    //         root: '_',
    //     },
    // },
    plugins: [new VueLoaderPlugin(), new BundleAnalyzerPlugin()],
}
