import gulp from 'gulp';
import nodemon from "gulp-nodemon";

import { testsClient, testsServer, testsServerWatch } from "./tasks/tests";

gulp.task('default', () => console.log('Default task called'));
gulp.task('tests-client', testsClient );
gulp.task('tests-server', testsServer );
gulp.task('tests-server-watch', testsServerWatch);

gulp.task('tests', ['tests-client', 'tests-server-watch'] );
gulp.task('start', function () {
    nodemon({
        exec: 'babel-node server.js',
        ext: 'js',
        ignore: [
            './client/*',
            'server/**/*.spec.js',
            'client/**/*.test.js',
            'client/**/*.unit.js',
            'client/**/*.integration.js',
            '*.json'
        ]
    })
});