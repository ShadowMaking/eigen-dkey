const path = require('path')
const jsRules = require('./rules/jsRules')
const styleRules = require('./rules/styleRules')
const fileRules = require('./rules/fileRules')
const plugins = require('./rules/plugins')
const optimization = require('./rules/optimization')
// console.log(styleRules)

module.exports = {
    entry: {
        popup: path.join(__dirname, '../src/index.tsx'),
        content: path.join(__dirname, '../src/content/index.ts'),
        background: path.join(__dirname, '../src/background/index.ts'),
        // public: path.join(__dirname, '../public'),
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].js'
    },
    module: {
        rules: [...jsRules, ...styleRules, ...fileRules]
    },
    plugins:[...plugins],
    resolve:{
        extensions: [ '.tsx' ,'.ts','.js', '.jsx'],
        alias: {
            '@components': path.join(__dirname, '../src/components')
        }
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, '../dist')
        }
    },
    optimization,
    // externals: {
    //     'react': 'window.React',
    //     'react-dom': 'window.ReactDOM'
    // }
}