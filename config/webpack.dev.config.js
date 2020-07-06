const path = require('path')
const baseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')

const config = {
    mode: 'development',
    entry: {
        app: './src/index.{{#if typescript}}tsx{{else}}js{{/if}}'
    },
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        compress: true,
        port: 7000,
        hot: true,
        hotOnly: true,
        publicPath: '/public/',
        historyApiFallback: {
            index: '/public/index.html'
        }
    }
}

module.exports = merge(baseConfig, config)