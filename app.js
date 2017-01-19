'use strict';

let express = require('express');
let fs = require('fs');
let app = express();

let authors = require('./authors.js');
let metadata = {all: []};
let metadataMap = {};

app.disable('x-powered-by');

for (let meta of require('./content-gen.js')) {
  metadata.all.push(meta);
  if (!metadata[meta.category])
    metadata[meta.category] = [];
  metadata[meta.category].push(meta);
  metadataMap[meta.relativePath] = meta;
}

app.use('/assets', express.static('assets'));

// Legacy image paths from webcomponents.github.io
app.use('/img/stories', express.static('assets/images'));

// Used for static pages that don't show up in any other resources
app.use('/static', express.static('static',
  {setHeaders: (res) => res.header('Access-Control-Allow-Origin', '*')}));

app.get('/content/*', function(request, response) {
  response.header('Access-Control-Allow-Origin', '*');
  let extensions = ['.md', '.html', '.html.md'];
  let file = null;

  for (let extension of extensions) {
    if (fs.existsSync('documents/'+ request.params[0] + extension))
      file = 'documents/'+ request.params[0] + extension;
  }

  if (!file) {
    response.status(404).send('Invalid path');
    return;
  }

  let path = fs.realpathSync(file);
  let isolatedDir = fs.realpathSync('documents');

  if (path.indexOf(isolatedDir) != 0) {
    response.status(400).send('Invalid path');
    return;
  }

  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      response.status(404).send('Cannot find ' + err.path);
      return;
    }
    data = data.replace(/([^]*<!-- Excerpt -->)/m, '').trim();
    const metadata = metadataMap[request.params[0]];

    // Return full author metadata
    if (metadata.authors) {
      for (let author of metadata.authors)
        Object.assign(author, authors[author.id]);
    }

    response.setHeader('Content-Type', 'application/json');
    response.status(200).send({metadata: metadata, content: data});
  });
});

app.get('/author/:id', function(request, response) {
  response.header('Access-Control-Allow-Origin', '*');

  const id = request.params.id;
  if (!authors[id]) {
    response.status(404).send('Cannot find author ' + id);
    return;
  }
  response.setHeader('Content-Type', 'application/json');
  response.status(200).send(authors[id]);
});

/**
 * @param {!Array.<Object>} bucket
 * @param {number} offset
 * @param {number} limit
 * @return {Object} result
 */
function createResult(bucket, offset, limit) {
  return {count: bucket.length, results: bucket.slice(offset, offset + limit)};
}

app.get('/resources', function(request, response) {
  response.header('Access-Control-Allow-Origin', '*');
  const offset = parseInt(request.query.offset) || 0;
  const limit = parseInt(request.query.limit) || 10;
  response.status(200).send(createResult(metadata.all, offset, limit));
});

app.get('/resources/author/:author', function(request, response) {
  response.header('Access-Control-Allow-Origin', '*');
  const offset = parseInt(request.query.offset) || 0;
  const limit = parseInt(request.query.limit) || 10;

  let filtered = metadata.all.filter(function(item) {
    if (!item.authors)
      return false;
    for (let author of item.authors) {
      if (author.id == request.params.author)
        return true;
    }
    return false;
  });
  response.status(200).send(
    createResult(filtered, offset, limit));
});

app.get('/resources/:bucket', function(request, response) {
  response.header('Access-Control-Allow-Origin', '*');
  if (!metadata[request.params.bucket]) {
    response.status(404).send('Unknown category');
    return;
  }
  const offset = parseInt(request.query.offset) || 0;
  const limit = parseInt(request.query.limit) || 10;
  response.status(200).send(
    createResult(metadata[request.params.bucket], offset, limit));
});

// Start the server
let server = app.listen(process.env.PORT || '8080', function() {
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit.');
});

module.exports = server;
