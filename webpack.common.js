var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const paths = {
    static: path.join(__dirname, 'static'),
    source: path.join(__dirname, 'src'),
    content: path.join(__dirname, 'dist'),
};

module.exports = {
    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                enforce: "pre",
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
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