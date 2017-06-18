var path = require('path');

module.exports = function (config) {
    config.set({
        browsers: ['Chrome'],
        coverageReporter: {
            reporters: [
                { type: 'html', subdir: 'html' },
                { type: 'lcovonly', subdir: '.' },
            ],
        },
        files: [
            'tests.webpack.js',
        ],
        frameworks: [
            'jasmine',
        ],
        preprocessors: {
            'tests.webpack.js': ['webpack', 'sourcemap'],
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