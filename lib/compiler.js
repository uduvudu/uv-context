
'use strict';
var N3 = require('n3'),
    CombinedStream = require('combined-stream'),
    fs = require('fs');

var parser = N3.Parser(),
    store = N3.Store(),
    writer = N3.Writer(),
    N3Util = N3.Util,
    jsonld = {},
    context = {}, 
    turtleStream = CombinedStream.create();

turtleStream.append(fs.createReadStream('./rdf/rdfa-context.ttl'));
turtleStream.append(fs.createReadStream('./rdf/uduvudu.ttl'));
turtleStream.resume();


parser.parse(turtleStream, function (error, triple, prefixes) {
  if (error)
    console.error(error);
  else if (triple){
    store.addTriple(triple);
  }
  else {
    console.error('end');
    var prefixes = store.find(null, 'http://www.w3.org/ns/rdfa#prefix', null);

    prefixes.map(function (prefix){
      var schema = store.find(prefix.subject, 'http://www.w3.org/ns/rdfa#uri', null)[0];
      writer.addTriple(prefix);
      writer.addTriple(schema);
      context[N3Util.getLiteralValue(prefix.object)] = N3Util.getLiteralValue(schema.object) ;
    });

    writer.end(function (error, result) {
      jsonld["@context"] = context ;
      fs.writeFile('./rdf/unified.ttl', result);
      fs.writeFile('./rdf/uduvudu.jsonld', JSON.stringify(jsonld));
    })
   
  }
});

