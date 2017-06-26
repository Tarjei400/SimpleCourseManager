//install asynchronous tests for jasmine
var async = require('jasmine-es6/overrides/async');
async.default();

var clientTestsContext = require.context('../client', true, /.(unit|integration|test)\.js$/);
clientTestsContext.keys().forEach(clientTestsContext);