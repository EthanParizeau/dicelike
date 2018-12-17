const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        //host: '0.0.0.0', // HOST ON LAN
        port: 3000,
        contentBase: './dist',
        publicPath: '/',
    },
});