//install asynchronous tests for jasmine
var async = require('jasmine-es6/overrides/async');
async.default();

var testsContext = require.context('./client', true, /.(unit|integration|test)\.js$/);
testsContext.keys().forEach(testsContext);