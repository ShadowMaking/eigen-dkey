
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const { resolveAssetsRootDir } = require('../utils')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = [
    new HtmlWebpackPlugin({
        template: 'public/index.html'
    }),
    new MiniCssExtractPlugin({
        filename: resolveAssetsRootDir('[name].css')
    }),
    new CopyWebpackPlugin(
        {
            patterns: [
                {
                    from: 'public/images', 
                    to: 'images'
                },
                {
                    from: 'public/manifest.json', 
                    to:  '',
                }
                // {
                //     from: path.join(__dirname, 'public/images'), to: path.join(__dirname, 'dist/images'),
                // },
                // {
                //     from: path.join(__dirname, 'public/manifest.json'), to: path.join(__dirname, 'dist/'),
                // }
            ]
        }
    )    
]