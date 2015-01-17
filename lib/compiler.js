/**
 * @file Uduvudu context compiler
 * @author Adrian Gschwend <ktk@netlabs.org>
 * @version 0.0.1
 * @copyright 2014 netlabs.org -- {@link http://www.netlabs.org}
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

/*jshint node:true, bitwise:true, curly:true, immed:true, indent:2, latedef:true, newcap:true, noarg: true, noempty:true, nonew:true, quotmark:single, undef:true, unused: true, trailing:true, white:false */

'use strict';
var N3 = require('n3'),
    CombinedStream = require('combined-stream'),
    fs = require('fs');

exports.compile = function() {

  var parser = N3.Parser(),
      store = N3.Store(),
      writer = N3.Writer(),
      N3Util = N3.Util,
      jsonld = {},
      context = {},
      uduvudunt = '',
      turtleStream = CombinedStream.create();

  turtleStream.append(fs.createReadStream('./rdf/rdfa-context.ttl'));
  turtleStream.append(fs.createReadStream('./rdf/uduvudu-context.ttl'));
  turtleStream.resume();

  parser.parse(turtleStream, function (error, triple) {
    if (error) { console.error(error); }
    else if (triple){
      store.addTriple(triple);
    }
    else {
      var prefixes = store.find(null, 'http://www.w3.org/ns/rdfa#prefix', null);

      prefixes.map(function (prefix){
        var schema = store.find(prefix.subject, 'http://www.w3.org/ns/rdfa#uri', null)[0];
        writer.addTriple(prefix);
        writer.addTriple(schema);
        context[N3Util.getLiteralValue(prefix.object)] = N3Util.getLiteralValue(schema.object);
        uduvudunt += prefix.subject+' <http://www.w3.org/ns/rdfa#prefix> '+prefix.object+' .\n';
        uduvudunt += prefix.subject+' <http://www.w3.org/ns/rdfa#uri> '+schema.object+' .\n';

      });

      writer.end(function (error, result) {
        jsonld['@context'] = context ;
        fs.writeFile('./rdf/uduvudu.ttl', result);
        fs.writeFile('./rdf/uduvudu.nt', uduvudunt);
        fs.writeFile('./rdf/uduvudu.jsonld', JSON.stringify(jsonld));
      });

    }
  });

};
