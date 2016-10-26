'use strict';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.js');
let mock = require('mock-fs');

// TODO: These tests fail if not gen.

chai.should();
chai.use(chaiHttp);

describe('api/content', function() {
  before(function() {
    mock({
      'documents/articles/test-article.md': 'test-article',
      'documents/articles/has-excerpt.md': `
metadata
excerpt
<!-- Excerpt -->
markdown`,
    });
  });

  after(mock.restore);

  it('should return something', function(done) {
    chai.request(server)
      .get('/content/articles/test-article.md')
      .end(function(err, response) {
        response.should.have.status(200);
        response.text.should.equal('test-article');
        done();
      });
  });

  it('should strip excerpt from response', function(done) {
    chai.request(server)
      .get('/content/articles/has-excerpt.md')
      .end(function(err, response) {
        response.should.have.status(200);
        response.text.should.equal('markdown');
        done();
      });
  });


  it('should not allow relative path urls', function(done) {
    chai.request(server)
      .get('/content/../app.js')
      .end(function(err, response) {
        response.should.have.status(400);
        done();
      });
  });
});

describe('api/authors', function() {
  it('should 404 on unknown author', function(done) {
    chai.request(server)
      .get('/author/fake-author')
      .end(function(err, response) {
        response.should.have.status(404);
        done();
      });
  });

  it('should return author object', function(done) {
    chai.request(server)
      .get('/author/aaron_frost')
      .end(function(err, response) {
        response.should.have.status(200);
        response.should.be.json;
        done();
      });
  });
});

describe('api/resources', function() {
  it('should have results', function(done) {
    chai.request(server)
      .get('/resources')
      .end(function(err, response) {
        response.should.have.status(200);
        response.should.be.json;
        JSON.parse(response.text).should.have.property('count');
        JSON.parse(response.text).should.have.property('results').with.length(10);
        done();
      });
  });

  it('should respect limit', function(done) {
    chai.request(server)
      .get('/resources?limit=5')
      .end(function(err, response) {
        response.should.have.status(200);
        response.should.be.json;
        JSON.parse(response.text).should.have.property('count');
        JSON.parse(response.text).should.have.property('results').with.length(5);
        done();
      });
  });

  it('should return articles', function(done) {
    chai.request(server)
      .get('/resources/articles')
      .end(function(err, response) {
        response.should.have.status(200);
        response.should.be.json;
        JSON.parse(response.text).should.have.property('count');
        JSON.parse(response.text).should.have.property('results').with.length(10);
        done();
      });
  });
});
