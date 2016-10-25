'use strict';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.js');
let mock = require('mock-fs');

chai.should();
chai.use(chaiHttp);

describe('api/content', function() {
  before(function() {
    mock({
      'articles/test-article.md': 'test-article',
      'articles/has-excerpt.md': `
metadata
excerpt
<!-- Excerpt -->
markdown`,
    });
  });

  after(mock.restore);

  it('should return something', function(done) {
    chai.request(server)
      .get('/content/test-article.md')
      .end(function(err, response) {
        response.should.have.status(200);
        response.text.should.equal('test-article');
        done();
      });
  });

  it('should strip excerpt from response', function(done) {
    chai.request(server)
      .get('/content/has-excerpt.md')
      .end(function(err, response) {
        response.should.have.status(200);
        response.text.should.equal('markdown');
        done();
      });
  });
});
