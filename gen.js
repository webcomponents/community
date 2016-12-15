'use strict';

let fs = require('fs');
let docpad = require('docpad');
let authors = require('./authors.js');
let metadata = [];

docpad.createInstance({}, function(err, docpadInstance) {
  if (err)
    return console.error(err.stack);
  docpadInstance.parseDocumentDirectory({path: 'documents'}, processFiles);
});

/**
 * Process all the files that have been read.
 * @param {!Error} err
 * @param {!FilesCollection} files
 */
function processFiles(err, files) {
  for (let file of files.models) {
    let attributes = file.meta.attributes;

    // Add excerpt to metadata.
    let body = file.attributes.body;
    body = body.replace(/<!-- Excerpt -->[^]*/m, '').trim();
    attributes.excerpt = body;

    attributes.relativePath = file.attributes.relativePath.replace(/\..*/, '');

    let expandedAuthors = [];
    if (attributes.authors) {
      for (var id of attributes.authors) {
        let author = authors[id];
        if (!author)
          continue;
        expandedAuthors.push({
          id: id,
          name: author.name,
          twitter: author.twitter,
        });
      }

      attributes.authors = expandedAuthors;
    }

    metadata.push(attributes);
  }

  // Sort reverse chronological.
  metadata = metadata.sort(function(a, b) {
    return b.date - a.date;
  });

  writeGen(metadata);
}

/**
 * Writes metadata out to a .js file.
 * @param {!Array.<Object>} metadata
 */
function writeGen(metadata) {
  const contents = 'module.exports = ' + JSON.stringify(metadata, null, 2);
  fs.writeFile('content-gen.js', contents, function(err) {
    if (err)
      return console.error(err.stack);
    console.log('Generated metadata for ' + metadata.length + ' files.');
  });
}
