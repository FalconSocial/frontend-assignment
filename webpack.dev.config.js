const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');

const PORT = 8080;

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.ts',
        doc: './documentation/doc.ts'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.ts?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            use: [
              { loader: "style-loader" },
              { loader: "css-loader" },
              { loader: "sass-loader" }
            ]
        },{
            test: /\.svg/,
            use: 'svg-url-loader'
        }]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: [
            path.join(__dirname, 'dist'),
            path.join(__dirname, 'lib'),
            path.join(__dirname, 'static')
        ],
        hot: true,
        port: PORT
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            excludeAssets: [/doc.js/]
        }),
        new HtmlWebpackPlugin({
            filename: 'doc.html',
            template: 'documentation/doc.html',
            excludeAssets: [/index.js/]
        }),
        new HtmlWebpackExcludeAssetsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new TSLintPlugin({
            files: ['./src/**/*.ts', './lib/**/*.ts'],
            format: 'stylish'
        })
    ]
}
