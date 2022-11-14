const { resolve } = require('../utils')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = [
    {
        test: /\.scss$/,
        include: [path.join(__dirname, '../../src')],
        use: [
            
            // "style-loader",
            MiniCssExtractPlugin.loader,
            {
                loader: "cache-loader",
                options: {
                    cacheDirectory: resolve('./cache-loader')
                }
            },
            {
                loader: "css-loader"
            },
            {
                loader: 'sass-loader',   
                // options: {
                //     include: [path.join(__dirname, '../src/styles')]
                // }
            }                    
        ],
    },
    {
        test: /\.less$/,
        include: [resolve('../node_modules')],
        use: [
            // 'style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
                loader: 'less-loader',
                options: {
                    lessOptions: {
                        javascriptEnabled: true,
                    }
                }
            }
        ]
    }
]