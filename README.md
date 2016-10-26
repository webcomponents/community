# webcomponents community

[![Join the chat at https://gitter.im/webcomponents/community](https://badges.gitter.im/webcomponents/community.svg)](https://gitter.im/webcomponents/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# community section on webcomponents.org
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

# API

## Content
```
GET /content/:path
```
Returns blob of markdown/html content.

## List
```
GET /resources/[:type]
```
Returns a list of `n` resource excerpts of specified type.
`type` is optional.
Query params:
 * `offset` - offset in results to return. Default: 0
 * `limit` - number of results to return. Default: 10

## Author
```
/author/:author
```
Returns author profile info. eg. image, link to twitter, GitHub, bio.
