var path = require('path');
var webpack = require('webpack');

module.exports = function (config) {
    config.set({
        logLevel: config.LOG_ERROR,
        browsers: ['CustomChromeHeadless'],
        customLaunchers: {
            CustomChromeHeadless: {
                base: 'Chrome',
                flags: [
                    '--no-sandbox',
                    '--disable-gpu',
                    '--headless',
                    // Without a remote debugging port, Google Chrome exits immediately.
                    ' --remote-debugging-port=9222',
                ]
            }
        },
        reporters: ["spec"],
        specReporter: {
            maxLogLines: 5,         // limit number of lines logged per test
            suppressErrorSummary: true,  // do not print error summary
            suppressFailed: false,  // do not print information about failed tests
            suppressPassed: false,  // do not print information about passed tests
            suppressSkipped: true,  // do not print information about skipped tests
            showSpecTiming: false // print the time elapsed for each spec
        },

        coverageReporter: {
            reporters: [
                { type: 'html', subdir: 'html' },
                { type: 'lcovonly', subdir: '.' },
            ],
        },
        frameworks: [
            'jasmine',
        ],
        files: [
            'client.tests.config.js'
        ],
        preprocessors: {
            'client.tests.config.js': ['webpack', 'sourcemap'],
        },
        webpack: {

            externals: {
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext' : true,
                'babel-core/register': true,
                'babel-core/polyfill': true,
                'babel-polyfill': true,
                'babel-plugin-module-resolver': true,
                'react/addons': true,
            },
            module: {
                loaders: [
                    {
                        test: /\.jsx?$/,
                        include: /client/,
                        exclude: /(bower_components|node_modules|\*.config.js$)/,
                        loader: ['babel-loader']
                    }
                ]

            },
            plugins: [
                new webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
                    },
                }),
            ]
        },
        webpackMiddleware: {
            // webpack-dev-middleware configuration
            stats: 'errors-only'
        },
    });
};