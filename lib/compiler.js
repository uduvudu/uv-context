/**
 * @file Uduvudu context compiler
 * @author Adrian Gschwend <ktk@netlabs.org>
 * @version 0.2.0
 * @copyright 2014-2019 netlabs.org -- {@link http://www.netlabs.org}
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

'use strict'
var N3 = require('n3')
var CombinedStream = require('combined-stream')
var fs = require('fs')

exports.compile = function () {
  var parser = new N3.Parser()
  var store = new N3.Store()
  var turtleWriter = new N3.Writer(
    { prefixes: {
      rdfa: 'http://www.w3.org/ns/rdfa#'
    }})
  var ntriplesWriter = new N3.Writer({ format: 'N-Triples' })
  var jsonld = {}
  var context = {}
  var turtleStream = CombinedStream.create()

  turtleStream.append(fs.createReadStream('./rdf/rdfa-context.ttl'))
  turtleStream.append(fs.createReadStream('./rdf/uduvudu-context.ttl'))
  turtleStream.resume()

  parser.parse(turtleStream, function (error, triple) {
    if (error) { console.error(error) } else if (triple) {
      store.addQuad(triple)
    } else {
      var prefixes = store.getQuads(null, 'http://www.w3.org/ns/rdfa#prefix', null)

      prefixes.map(function (prefix) {
        var schema = store.getQuads(prefix.subject, 'http://www.w3.org/ns/rdfa#uri', null)[0]
        turtleWriter.addQuad(prefix)
        turtleWriter.addQuad(schema)
        ntriplesWriter.addQuad(prefix)
        ntriplesWriter.addQuad(schema)
        context[prefix.object.value] = schema.object.value
      })

      turtleWriter.end((_error, result) => fs.writeFileSync('./rdf/uduvudu.ttl', result))
      ntriplesWriter.end((_error, result) => fs.writeFileSync('./rdf/uduvudu.nt', result))
      jsonld['@context'] = context
      fs.writeFileSync('./rdf/uduvudu.jsonld', JSON.stringify(jsonld))
    }
  })
}
