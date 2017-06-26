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
            { test: /\.jsx?$/, loader: ['babel-loader', 'eslint-loader'], exclude:[/node_modules/] },
            { test: /\.html/, loader: 'file-loader?name=[path][name].[ext]', exclude: /node_modules/ },
            { test: /\.css$/, loader: [ 'style-loader', 'css-loader' ]}
        ]
    },
    devServer: {
        inline: true,
        port: 8085,
        lazy: false,
        stats: { chunks: false }
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
        //TODO: Minifiy bundle only on production environment
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: { warnings: false }
        // })
        //Passing NODE_ENV variable to frontend
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map',
};