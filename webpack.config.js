var path = require('path');
var webpack = require('webpack');
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    entry: {
        client: "./client/index.js",
        server: "./server/index.js"
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
        contentBase: path.join(__dirname, "public/client"),
        compress: true,
        port: 8081,
        lazy: false,
    },

    plugins: [
        new LiveReloadPlugin()
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map',
};