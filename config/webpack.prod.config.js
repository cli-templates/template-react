const path = require('path')
const baseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')

const config = {
    mode: 'production',
    entry: {
        app: './src/index.{{#if typescript}}tsx{{else}}js{{/if}}'
    }
}

module.exports = merge(baseConfig, config)