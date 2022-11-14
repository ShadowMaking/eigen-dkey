const { resolve } = require('../utils')

module.exports = [
    {
        test: /\.tsx?$/,
        loader: 'swc-loader',
        include: resolve('../src'),
    },
]