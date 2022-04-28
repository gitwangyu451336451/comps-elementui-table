const path = require('path')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const nodeExternals = require('webpack-node-externals')
const CopyPlugin = require('copy-webpack-plugin')

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
    plugins: [
        // new CopyPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(__dirname, './src/types.ts'),
        //             to: path.resolve(__dirname, './dist/index.d.ts'),
        //         },
        //     ],
        // }),
    ],
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
    externals: {
        'element-ui': {
            commonjs: 'element-ui',
            commonjs2: 'element-ui',
            amd: 'element-ui',
            root: '_',
        },
    },
    plugins: [new VueLoaderPlugin()],
}
