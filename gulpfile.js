
"use strict";
var gulp = require('gulp'),
    request = require('request'),
    fs = require('fs'),
    compiler = require('./lib/compiler.js');


gulp.task('default', function(){
  // place code for your default task here
});


/*
 * fetchrdfa: update the rdfa-context file from the W3C site
 */
gulp.task('fetch', function(){
  var reqopt = {
    headers: {Accept: 'text/turtle'}
    //,proxy: 'http://localhost:8888'
  };

  var rq = request.defaults(reqopt);
  rq.get('http://www.w3.org/2011/rdfa-context/rdfa-1.1').pipe(fs.createWriteStream('./rdf/rdfa-context.ttl'));

});

/*
 * compile: generate the N3 and JSON-LD context from the Turtle files
 */
gulp.task('compile', function(){
  // place code for your default task here
});

/*
 * test: 
 */
gulp.task('test', function(){
  // place code for your default task here
});




