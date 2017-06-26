import jasmine from "gulp-jasmine";
import gulp from "gulp";
import debug from "gulp-debug";import nodemon from "gulp-nodemon";
import { SpecReporter } from "jasmine-spec-reporter";
import { Server } from "karma";

const async = require('jasmine-es6/overrides/async');

export function testsClient(done) {
    //Runs client tests using karma
    new Server({
        configFile: __dirname + '/karma.config.js',
    }, () => { done() }).start();

}

const serverTests = 'server/**/*.spec.js';
export function testsServer() {
    async.default();
    // //Runs server tests
    return gulp.src([ serverTests ])
        .pipe(debug())
        .pipe(jasmine({
            timeout: 10000,
            verbose: true,
            reporter: new SpecReporter({
                spec: {
                    displayPending: true
                }
            })
        }));
}

export async function testsServerWatch() {
    nodemon({
        exec: 'gulp tests-server',
        ext: 'js',
        ignore: [
            './client/*',
            './server/*'
        ],
        watch: [
            'server/**/*.spec.js',
        ]
    })
}