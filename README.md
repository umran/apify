# Apify

A tool to bootstrap modern backends using graphql, mongodb, redis and elasticsearch

[![Build Status](https://travis-ci.org/umran/apify.svg?branch=master)](https://travis-ci.org/umran/apify)
[![Coverage Status](https://img.shields.io/coveralls/github/umran/apify/master.svg)](https://coveralls.io/github/umran/apify?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/umran/apify/badge.svg)](https://snyk.io/test/github/umran/apify)
[![Dependency Status](https://david-dm.org/umran/apify.svg)](https://david-dm.org/umran/apify)

## Introduction

Apify generates GraphQL APIs for backends that use mongodb as a primary store, redis as a caching layer, and rely on elasticsearch for full-text search, via a simple configuration interface that is designed to combine configuration options from mongoose and graphql schemas and elasticsearch mappings. Apify thus effectively reduces the configuration complexity of backends that rely on mongodb, elasticsearch and graphql to a single configuration file under a unified syntax.

For each collection level document that is defined, Apify automatically creates the relevant collection in mongodb along with its elasticsearch mappings. It also defines GraphQL endpoints for the collection that allows CRUD operations as well as fulltext search of documents via elasticsearch.

## Defining Document Schemas
Documents are defined as javascript objects with the properties: 'class' and 'fields'.

The 'fields' property is an object that contains all of the fields of the document, which in turn contain information relevant to validation and search indexing.

The 'class' property takes a text value indicating the class of document. There are two classes that may be defined: 'collection' and 'embedded'

### The Collection Class

Collection class documents are documents that will be stored in mongodb under a collection. Therefore documents classified as collection are ideally standalone documents that are semantically significant in and of themselves.

See below for an example schema of a collection class document.

````javascript
Student: {
  class: 'collection',
  fields: {
    firstName: {
      type: 'string',
      required: true,
      es_indexed: true,
      es_keyword: true
    },
    lastName: {
      type: 'string',
      required: true,
      es_indexed: true,
      es_keyword: true
    }
  }
}
````

## The Embedded Class

Embedded documents are, as the name suggests, documents that will not be stored under its own collection, but rather as part of an existing collection. Documents classified as embedded are ideally documents that do not make much sense outside the context of a parent document.

See below for an example schema of an embedded document

````javascript
Grades: {
  class: 'embedded',
  fields: {
    mathematics: {
      type: 'float',
      required: true,
      es_indexed: true,
      es_boost: 2.0
    },
    english: {
      type: 'float',
      required: true,
      es_indexed: true,
      es_boost: 1.5
    },
    physics: {
      type: 'float',
      required: false,
      es_indexed: true,
      es_boost: 1.0
    }
  }
}
````

In order to reference an embedded document from within a collection level document, simply create a reference field within the collection level document that points to the embedded document, like so:

```javascript
// the embedded document
Grades: {
  class: 'embedded',
  fields: {
    mathematics: {
      type: 'float',
      required: true,
      es_indexed: true,
      es_boost: 2.0
    },
    english: {
      type: 'float',
      required: true,
      es_indexed: true,
      es_boost: 1.5
    },
    physics: {
      type: 'float',
      required: false,
      es_indexed: true,
      es_boost: 1.0
    }
  }
}

// the collection level document
Student: {
  class: 'collection',
  fields: {
    firstName: {
      type: 'string',
      required: true,
      es_indexed: true,
      es_keyword: true
    },
    lastName: {
      type: 'string',
      required: true,
      es_indexed: true,
      es_keyword: true
    },
    grades: {
      type: 'reference',
      ref: 'Grades',
      required: false,
      es_indexed: true
    }
  }
}
```