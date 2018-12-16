var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var root_dir = path.resolve(__dirname);

var paths = {
    static: path.join(root_dir, 'static'),
    source: path.join(root_dir, 'src'),
    content: path.join(root_dir, 'dist'),
    // NOTE:
    // maybe if we define the path to the rot.js lib here, and use the "expose-loader" for it as well?
};

module.exports = {
    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    mode: 'development',
    devtool: 'eval-source-map',

    devServer: {
        contentBase: paths.content,
        publicPath: '/',
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
        new CopyWebpackPlugin([
            {
                from: path.join(paths.static),
                to: path.join(paths.content),
            },
        ]),
        // injects the correct `<script/>` tag into our `index.html`
        new HtmlWebpackPlugin({
            template: path.resolve(paths.source, 'index.html'),
            filename: 'index.html',
        }),
    ],

};