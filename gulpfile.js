/*jshint node:true, bitwise:true, curly:true, immed:true, indent:2, latedef:true, newcap:true, noarg: true, noempty:true, nonew:true, quotmark:single, undef:true, unused: true, trailing:true, white:false */

'use strict';
var gulp = require('gulp'),
    request = require('request'),
    fs = require('fs'),
    tape = require('tape'),
    compiler = require('./lib/compiler.js');
//    uvc = require('./index.js');


gulp.task('default', ['fetch', 'compile', 'test']);

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
  compiler.compile();
});

/*
 * test: make sure it worked out properly
     TODO add test for Turtle/Nt as well
 */
gulp.task('test', function(){
//  console.log(uvc.prefixes);

  var prefix = './rdf/uduvudu.jsonld';
  var context;

  fs.readFile(prefix, function (err, data) {
    if (err) {
      console.log('Failed to load '+prefix);
    }
    context = JSON.parse(data);
    tape('check rdfa & uduvudu context', function (t) {
      t.plan(2);
      t.deepEqual(context['@context']['void'], 'http://rdfs.org/ns/void#');
      t.deepEqual(context['@context']['hydra'], 'http://www.w3.org/ns/hydra/core#');
    });
  });


});
