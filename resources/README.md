# webcomponents.org resources content

## Installing
```bash
$ npm install
```

## Running locally
```bash
$ npm run start
```

## Tests & linting
```bash
$ npm run lint
$ npm test
```

# Proposed API

## Content
```
GET /content/:contentID
```
Returns blob of markdown content.

## List
```
GET /resources/[:type]/10
```
Returns a list of `n` resource excerpts of specified type.

## Author
```
/author/:author
```
Returns author profile info. eg. image, link to twitter, GitHub, bio.
