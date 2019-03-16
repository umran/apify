# Apify

A tool to bootstrap modern backends using graphql, mongodb, redis and elasticsearch

[![Build Status](https://travis-ci.org/umran/apify.svg?branch=master)](https://travis-ci.org/umran/apify)
[![Coverage Status](https://img.shields.io/coveralls/github/umran/apify/master.svg)](https://coveralls.io/github/umran/apify?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/umran/apify/badge.svg)](https://snyk.io/test/github/umran/apify)
[![Dependency Status](https://david-dm.org/umran/apify.svg)](https://david-dm.org/umran/apify)

## Introduction

Apify generates GraphQL CRUD APIs that are tightly coupled with mongodb, via mongoose, as a primary store, optionally redis, among others as a cache store, and elasticsearch as a full-text search engine. Apify exposes a simple configuration interface that is designed to combine configuration options for mongoose, graphql schemas and elasticsearch mappings. Apify thus effectively reduces the configuration complexity of backends that rely on mongodb, elasticsearch and graphql to a single configuration file under a universal syntax.

For each collection level document that is defined, Apify automatically creates the relevant collection in mongodb along with its elasticsearch mappings. It also defines GraphQL endpoints for each collection that allow CRUD operations as well as full-text search to be performed on documents right out of the box.

## Defining Document Schemas

Defining document schemas is the first major step in setting up the server. Documents are defined as javascript objects that have the properties: `class` and `fields`.

The `fields` property is an object that contains all of the fields of the document, which in turn contain information relevant to validation and search indexing.

The `class` property takes a text value indicating the class of document. There are two classes that may be defined: "collection" and "embedded"

### The Collection Class

Collection class documents are documents that will be stored in mongodb under a collection. Documents classified as collection are usually standalone documents that have meaning in and of themselves.

See below for an example schema of a collection class document.

```javascript
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
```

### The Embedded Class

Embedded documents are, as the name suggests, documents that will not be stored under its own collection, but rather embedded in an existing collection. Documents classified as embedded are usually documents that do not make much sense outside the context of a parent document. Apify requires you to define a separate embedded document for each level of nesting within a parent document.

See below for an example schema of an embedded document

```javascript
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
```

In order to reference an embedded document from within a collection level document, simply create a reference field within the collection level document that points to the embedded document, like so:

```javascript
// an embedded document
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

// a collection level document that references the above defined embedded document
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

All documents, of both the embedded and collection classes should be compiled into a single javascript object whose keys are the document names:

```javascript

const documents = {
  Student: {
    class: 'collection',
    fields: {
      ...
    }
  },
  Grades: {
    class: 'embedded',
    fields: {
      ...
    }
  }
}

```

### Document Field Properties

Each field of a document has a couple of required properties. The field's `required` property is one of them, which explicitly tells apify whether to always expect a value for the field. The field's `type` property is another required property and tells apify how to properly parse and deal with the value associated with the field. A field can have a number of other properties, both required and optional depending on its type. Below we will discuss each field type in turn.

#### String Fields

As with all field types string field types have a required property `type` which must be set to the string literal "string". Refer to the table below for all the properties that may be defined on a field of `type` "string"

| Property | Required | Type | Description |
| --- | --- | --- | --- |
| `required` | true | Boolean | Tells Apify whether to always expect a value for the field |
| `type` | true | String | Tells Apify how to parse values associated with the field |
| `es_indexed` | true | Boolean | Tells Elasticsearch whether to analyze the field during indexing |
| `es_keyword` | false | Boolean | Tells Elasticsearch whether to analyze the field as a `keyword` rather than as full-text; defaults to `false` |
| `es_boost` | false | Number | Tells Elasticsearch how to weight the field when calculating the document's relevance score; defaults to 1.0 |
| `es_analyzer` | false | String | Tells Elasticsearch which analyzer to use during indexing; defaults to the standard analyzer |
| `es_search_analyzer` | false | String | Tells Elasticsearch which analyzer to use during search; defaults to the analyzer defined at `es_analyzer`|
| `es_search_quote_analyzer` | false | String | Tells Elasticsearch which analyzer to use for quotes during search; defaults to the analyzer defined at `es_search_analyzer`|

#### Integer Fields

This section is unfinished at the moment.

#### Float Fields

This section is unfinished at the moment.

#### Boolean Fields

This section is unfinished at the moment.

#### Date Fields

This section is unfinished at the moment.

#### Reference Fields

This section is unfinished at the moment.

#### Array Fields

This section is unfinished at the moment.

## Defining Resolvers

This section is unfinished at the moment.

## Building the Backend Configuration

This section is unfinished at the moment.

## Building the GraphQL Schema

This section is unfinished at the moment.

## Setting Up and Running the GraphQL Server

This section is unfinished at the moment.
