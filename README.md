# webcomponents community

[![Join the chat at https://gitter.im/webcomponents/community](https://badges.gitter.im/webcomponents/community.svg)](https://gitter.im/webcomponents/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Travis](https://img.shields.io/travis/webcomponents/community.svg)](https://travis-ci.org/webcomponents/community)

# Adding or modifying content
 1. Decide what the content type is:
  * Evergreen pages such as Polyfills, Specifications should be modified in [/static]
  * Posts such as articles/podcasts/presentations should be added to [/documents]
 1. Send a PR with the changes.
 1. Done! Once it's merged, the site will update with the latest content.

# Development
## Installing
```bash
$ npm install
```

## Running locally
```bash
$ npm start
$ npm run monitor
```

## Tests & linting
```bash
$ npm run lint
$ npm test
```

## API

### Content
```
GET /content/:path
```
Returns blob of markdown/html content.

### Static
```
GET /static/:file
```
Returns static file. Static files do not appear in `/resources` lists and do not contain any docpad metadata.

### List
```
GET /resources/[:type]
```
Returns a list of `n` resource excerpts of specified type.
`type` is optional.
Query params:
 * `offset` - offset in results to return. Default: 0
 * `limit` - number of results to return. Default: 10
