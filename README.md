# Apify

A tool to bootstrap modern backends using GraphQL, MongoDB, Redis and Elasticsearch.

[![Build Status](https://travis-ci.org/umran/apify.svg?branch=master)](https://travis-ci.org/umran/apify)
[![Coverage Status](https://img.shields.io/coveralls/github/umran/apify/master.svg)](https://coveralls.io/github/umran/apify?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/umran/apify/badge.svg)](https://snyk.io/test/github/umran/apify)
[![Dependency Status](https://david-dm.org/umran/apify.svg)](https://david-dm.org/umran/apify)

## Introduction

Apify generates GraphQL CRUD APIs that are tightly coupled with MongoDB, via Mongoose, as a primary store, optionally Redis, among others as a cache store, and Elasticsearch as a full-text search engine. Apify exposes a simple configuration interface that is designed to combine configuration options for Mongoose, GraphQL schemas and Elasticsearch mappings. Apify thus effectively reduces the configuration complexity of backends that rely on MongoDB, Elasticsearch and GraphQL to a single configuration file under a universal syntax.

For each collection level document that is defined, Apify automatically creates the relevant collection in MongoDB along with its Elasticsearch mappings. It also defines GraphQL endpoints for each collection that allow CRUD operations as well as full-text search to be performed on documents right out of the box.

## Defining Document Schemas

Defining document schemas is the first and the most crucial step towards setting up the server. Documents are defined as javascript objects that have the properties: `class` and `fields`.

The `fields` property is an object that contains all of the fields of the document, which in turn contain information relevant to validation and search indexing.

The `class` property takes a text value indicating the class of document. There are two classes that may be defined: "collection" and "embedded"

### The Collection Class

Collection class documents are documents that will be stored in MongoDB under a collection. Documents classified as collection are usually standalone documents that have meaning in and of themselves.

See below for an example schema of a collection class document.

```javascript
const Student = {
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

Embedded documents are, as the name suggests, documents that will not be stored under its own collection, but rather embedded in an existing collection. Documents classified as embedded are usually documents that do not make much sense outside the context of a parent document. Because the shape of any individual document schema is flat, Apify requires you to define a separate embedded document for each level of nesting in order to define documents with deeply nested structures.

See below for an example schema of an embedded document.

```javascript
const Grades = {
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
const Grades = {
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
const Student = {
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

Each field of a document has a couple of required properties. The field's `required` property is one of them, which explicitly tells Apify whether to always expect a value for the field. The field's `type` property is another required property and tells Apify how to properly parse and deal with the value associated with the field. A field can have a number of other properties, both required and optional depending on its type. See below for details of each field type in turn.

#### String Fields

String fields have a required property: `type` whose value must be set to "string". Refer to the table below for all the properties that may be defined on a field of `type` "string".

| Property | Required | Type | Description |
| --- | --- | --- | --- |
| `required` | true | Boolean | Tells Apify whether to always expect a value for the field |
| `type` | true | String | Tells Apify how to parse values of the field |
| `es_indexed` | true | Boolean | Tells Elasticsearch whether to analyze the field during indexing |
| `es_keyword` | false | Boolean | Tells Elasticsearch whether to analyze the field as a `keyword` rather than as full-text; defaults to `false` |
| `es_boost` | false | Number | Tells Elasticsearch how to weight the field when calculating the document's relevance score; defaults to 1.0 |
| `es_analyzer` | false | String | Tells Elasticsearch which analyzer to use during indexing; defaults to the standard analyzer |
| `es_search_analyzer` | false | String | Tells Elasticsearch which analyzer to use during search; defaults to the analyzer defined at `es_analyzer`|
| `es_search_quote_analyzer` | false | String | Tells Elasticsearch which analyzer to use for quotes during search; defaults to the analyzer defined at `es_search_analyzer`|

#### Integer Fields

Integer fields have a required property: `type` whose value must be set to "integer". Refer to the table below for all the properties that may be defined on a field of `type` "integer".

| Property | Required | Type | Description |
| --- | --- | --- | --- |
| `required` | true | Boolean | Tells Apify whether to always expect a value for the field |
| `type` | true | String | Tells Apify how to parse values of the field |
| `es_indexed` | true | Boolean | Tells Elasticsearch whether to analyze the field during indexing |
| `es_boost` | false | Number | Tells Elasticsearch how to weight the field when calculating the document's relevance score; defaults to 1.0 |

#### Float Fields

Float fields have a required property: `type` whose value must be set to "integer". Refer to the table below for all the properties that may be defined on a field of `type` "float".

| Property | Required | Type | Description |
| --- | --- | --- | --- |
| `required` | true | Boolean | Tells Apify whether to always expect a value for the field |
| `type` | true | String | Tells Apify how to parse values of the field |
| `es_indexed` | true | Boolean | Tells Elasticsearch whether to analyze the field during indexing |
| `es_boost` | false | Number | Tells Elasticsearch how to weight the field when calculating the document's relevance score; defaults to 1.0 |

#### Boolean Fields

Integer fields have a required property: `type` whose value must be set to "integer". Refer to the table below for all the properties that may be defined on a field of `type` "integer".

| Property | Required | Type | Description |
| --- | --- | --- | --- |
| `required` | true | Boolean | Tells Apify whether to always expect a value for the field |
| `type` | true | String | Tells Apify how to parse values of the field |
| `es_indexed` | true | Boolean | Tells Elasticsearch whether to analyze the field during indexing |
| `es_boost` | false | Number | Tells Elasticsearch how to weight the field when calculating the document's relevance score; defaults to 1.0 |

#### Date Fields

Date fields have a required property: `type` whose value must be set to "date". Date fields are a special kind of field in that it takes valid ISO `Date` objects. Refer to the table below for all the properties that may be defined on a field of `type` "date".

| Property | Required | Type | Description |
| --- | --- | --- | --- |
| `required` | true | Boolean | Tells Apify whether to always expect a value for the field |
| `type` | true | String | Tells Apify how to parse values of the field |
| `es_indexed` | true | Boolean | Tells Elasticsearch whether to analyze the field during indexing |
| `es_boost` | false | Number | Tells Elasticsearch how to weight the field when calculating the document's relevance score; defaults to 1.0 |
| `default` | false | String | Specifies a default date to use during creation of the document. Takes any valid ISO Date string or the value: "current_date", which generates a timestamp during query time (on create or update) |

#### Reference Fields

Reference fields have a required property: `type` whose value must be set to "reference". Reference fields are a pointer to another collection or embedded document and is useful for nesting documents together. Refer to the table below for all the properties that may be defined on a field of `type` "reference".

| Property | Required | Type | Description |
| --- | --- | --- | --- |
| `required` | true | Boolean | Tells Apify whether to always expect a value for the field |
| `type` | true | String | Tells Apify how to parse values of the field |
| `es_indexed` | true | Boolean | Tells Elasticsearch whether to analyze the field containing the nested document during indexing |
| `ref` | true | String | Tells Apify which document this field is a reference to. The value should be the document name as defined in the document schema definition and is case sensitive  |

#### Array Fields

Array fields have a required property: `type` whose value must be set to "array". Array fields specify a list of any other type of field. Array fields are useful for storing lists of values of the same type in a collection. Refer to the table below for all the properties that may be defined on a field of `type` "array".

| Property | Required | Type | Description |
| --- | --- | --- | --- |
| `required` | true | Boolean | Tells Apify whether to always expect a value for the field |
| `type` | true | String | Tells Apify how to parse values of the field |
| `item` | true | Object <Field> | Tells Apify the field type of the values that are contained in the array. The value must be an object that represents one of the field types described above; cannot be an array type because nesting arrays within arrays is not allowed |

## Defining the Root Resolver

The root resolver is a single function that defines how API calls to the `create_`, `read_`, `update_`, `delete_` and `search_` endpoints are handled.

## Building the Backend Configuration

This section is unfinished at the moment.

## Building the GraphQL Schema

This section is unfinished at the moment.

## Setting Up and Running the GraphQL Server

This section is unfinished at the moment.
