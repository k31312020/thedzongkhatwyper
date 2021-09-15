const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(nodeEnv),
        },
    }),
    new HtmlWebpackPlugin({
        template: '/index.html',
    }),
    new webpack.LoaderOptionsPlugin({
        options: {
            tslint: {
                emitErrors: true,
                failOnHint: true,
            },
        },
    }),
];

const config = {
    devtool: isProd ? 'hidden-source-map' : 'source-map',
    context: path.resolve('./src'),
    entry: {
        app: './index.ts',
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].[contenthash].bundle.js',
        clean: true
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                exclude: [/\/node_modules\//],
                use: ['ts-loader', 'source-map-loader'],
            },
            /*       !isProd
                ? {
                    test: /\.(js|ts)$/,
                    loader: 'istanbul-instrumenter-loader',
                    exclude: [/\/node_modules\//],
                    query: {
                        esModules: true,
                    },
                }
                : null, */
            { test: /\.html$/, loader: 'html-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ].filter(Boolean),
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins,
    devServer: {
        compress: true,
        port: 3000,
        hot: true,
    },
};

module.exports = config;
