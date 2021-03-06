var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: './index.dist.js',
    output: {
        path: './dist/',
        filename: 'g-iframe-man.min.js'
    },
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('css-loader!less-loader?sourceMap', {publicPath: './'})
            }, // use ! to chain loaders
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css-loader?sourceMap', {publicPath: './'})
            },
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'} // inline base64 URLs for <=8k images, direct URLs for the rest
        ]
    },
    plugins: [
        //启用压缩
        new webpack.optimize.UglifyJsPlugin(),
        //分离出CSS
        new ExtractTextPlugin("g-iframe-man.min.css", {
            allChunks: true
        })
    ]
};