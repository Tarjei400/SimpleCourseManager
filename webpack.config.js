var path = require('path');
var webpack = require('webpack');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        client: "./client/index.js"
    },
    output: {
        path: path.join(__dirname, "public"),
        filename: "[name]/bundle.js",
        chunkFilename: "[id].chunk.js"
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loader: ['babel-loader', 'eslint-loader'], exclude: /node_modules/ },
            { test: /\.html/, loader: 'file-loader?name=[path][name].[ext]', exclude: /node_modules/ },
        ]
    },
    devServer: {
        inline: true,
        port: 8081,
        lazy: false
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './client/index.tpl.ejs',
            inject: 'body',
            filename: 'index.html'
        }),
        new LiveReloadPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        //TODO: Minifiy bundle only on production environment
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: { warnings: false }
        // })
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map',
};