# Uduvudu Initial Context
This repository contains a definition of predefined RDF vocabulary prefixes used in Uduvudu and related software.

It is extending [RDFa Core Initial Context](http://www.w3.org/2011/rdfa-context/rdfa-1.1) which provides base prefixes.

If this is useful for you, feel free to include it into your project. There are no other dependencies unless you want to build it on your own.

## Using it
We provide four static files:

* A manually maintained Turtle file for prefixes which are not in RDFa Core Initial Context.
* A snapshot of the RDFa Initial Context (in Turtle)
* A N-Tripes serialization containing prefixes and URIs (RDFa Initial Context and ours)
* A JSON-LD serialization containing prefixes and URIs (RDFa Initial Context and ours)

While there is more information available in the Turtle file, we serialize only rdfa:prefix and rdfa:uri into N-Triples and JSON-LD. Currently the subject URIs are blank nodes.

To use it either source the N-Triples or JSON-LD representation into your application.

Please do *not* make this list available on a URI outside of Github for the moment. There is a fair chance we will do this on our own at one point. If you really really need it, open an issue so we can talk about it.

## Versioning scheme
Each defined prefix is a mapping to an URI. It is a simple 1:1 mapping to make sure we get unambiguous results on [shrinking and resolving](http://www.w3.org/TR/rdf-interfaces/#prefix-maps) URIs. Once a prefix is in this repository, it cannot be altered anymore within same MAJOR release according to [Semantic Versioning 2.0.0](http://semver.org/).

This makes sure that within the same MAJOR release prefixes stay the same and do not break existing code. MINOR versions will be used for newly introduced prefixes which can be requested by opening a pull request on Github.

If you are using tools like NPM you should block the MAJOR release number to be sure your code does not break in the future. MINOR and REVISION releases can be wildcards. In case you define your own additional prefixes you might want to block MINOR too to avoid clashes.

## Adding new prefixes

For new requests, first check if the creator/owner of the namespace defined a prefix. If not check [prefix.cc](http://prefix.cc/). In case prefix.cc is ambiguous a discussion should be raised before the pull-requests gets integrated. Last thing to check are the predefined namespaces in the [DBpedia SPARQL endpoint](http://dbpedia.org/sparql?nsdecl) or other popular RDF resources. If you find one please refer to it in the pull request.

If there are no conflicts, the RDFa Initial Context list will get updated on each release. In case of conflicts they will be resolved in the next MAJOR version where the RDFa Core Initial Context wins over Uduvudu prefixes.

The RDFa prefixes get sourced automatically, other prefixes are maintained in a Turtle file in this repository. 

## History
* 0.0.1: Initial version with base prefixes

## Credits
* Adrian Gschwend <ktk@netlabs.org>
* Pascal Mainini <pascal@mainini.ch>
* DBpedia & DERI (prefix.cc)

## License

The MIT License (MIT)

Copyright (c) 2014 netlabs.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.