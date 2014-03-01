

request = require('request');
fs = require('fs');

var rdfa = {
  uri: 'http://www.w3.org/TR/Content-in-RDF10/',
  headers: {Accept: 'text/turtle'}
}

request(rdfa).pipe(fs.createWriteStream('./rdf/rdfa-context.ttl'));
