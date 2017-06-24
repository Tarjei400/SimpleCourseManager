var path = require('path');

module.exports = function (config) {
    config.set({
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
        coverageReporter: {
            reporters: [
                { type: 'html', subdir: 'html' },
                { type: 'lcovonly', subdir: '.' },
            ],
        },
        files: [
            'tests.config.js',
        ],
        frameworks: [
            'jasmine',
        ],
        preprocessors: {
            'tests.config.js': ['webpack', 'sourcemap'],
        },
        reporters: ['progress', 'coverage'],
        webpack: {

            externals: {
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext' : true,
                'babel-core/register': true,
                'babel-core/polyfill': true,
                'babel-polyfill': true,
                'react/addons': true,
            },
            module: {
                loaders: [
                    {
                        test: /\.jsx?$/,
                        include: /client/,
                        exclude: /(bower_components|node_modules)/,
                        loader: ['babel-loader']
                    }
                ]

            },
        },
    });
};