const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
{{#with typescript}}
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
{{/with}}
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const genCssLoader = require('./utils/genCssLoader')

const isDev = process.env.NODE_ENV === 'development'

const config = {
    output: {
        filename: '[name].[hash].js',
        chunkFilename: '[name].chunk.[hash].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                {{#if typescript}}
                test: /\.(ts|tsx)$/,
                {{else}}
                test: /\.(js|jsx)$/,
                {{/if}}
                loader: [
                    'babel-loader'{{#with typescript}},
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }
                    {{/with}}
                ]
            },
            genCssLoader({css_pre:'{{css_pre}}', extract: !isDev}),
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    name: 'assets/image/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../template/index.html')
        }),
        {{#with typescript}}
        new ForkTsCheckerWebpackPlugin(),
        {{/with}}
        new CleanWebpackPlugin()
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    minSize: 244000,
                    name: 'vendor',
                    chunks: 'initial'
                }
            }
        }
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM'
    },
    resolve: {
        extensions: [{{#with typescript}}'.ts','.tsx',{{/with}}'.js', '.jsx'],
        alias: {
            "@": path.resolve(__dirname, '../src/')
        }
    }
}

module.exports = config