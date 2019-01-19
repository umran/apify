const Schema = require('mongoose').Schema

module.exports = {
  expectedMongooseSchema: new Schema({
    // string field
    name: {
      type: String,
      required: true
    },

    // string array field
    tags: {
      type: [String],
      required: false
    },

    // integer or float field
    age: {
      type: Number,
      required: true
    },

    // integer or float array field
    favourite_numbers: {
      type: [Number],
      required: true
    },

    // boolean field
    isAmerican: {
      type: Boolean,
      required: true
    },

    // boolean array field
    answers: {
      type: [Boolean],
      required: false
    },

    // date field
    start: {
      type: Date,
      required: true
    },

    // date array field
    starts: {
      type: [Date],
      required: true
    },

    // standalone schema field
    spouse: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'PersonSchema'
    },

    // standalone schema array field
    friends: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: 'PersonSchema'
    },

    // nested schema field
    contact: {
      type: new Schema({
        phone: {
          type: Number,
          required: true
        },
        email: {
          type: String,
          required: true
        }
      }),
      required: true
    },

    // nested schema array field
    addresses: {
      type: [new Schema({
        line_1: {
          type: String,
          required: true
        },
        line_2: {
          type: String,
          required: false
        },
        city: {
          type: String,
          required: true
        },
        postal_code: {
          type: String,
          required: true
        },
        province: {
          type: String,
          required: true
        }
      })],
      required: true
    }

  }),

  schemaConfig: {
    class: "standalone",
    fields: {
      name: {
        type: "string",
        required: true,
        es_indexed: true,
        es_analyzed: true,
        es_keyword: false
      },
      tags: {
        type: "array",
        required: false,
        item: {
          type: "string",
          // the required flag in the item object is ignored by mongoose, but is useful for graphql
          required: true,
          es_indexed: true,
          es_analyzed: true,
          es_keyword: true
        },
        // in the schema and array types, the es_indexed field determines whether the underlying object should be indexed according to the index and anlyzer options specified in the object
        es_indexed: true
      },
      age: {
        type: "integer",
        required: true,
        es_indexed: true
      },
      favourite_numbers: {
        type: "array",
        required: true,
        item: {
          type: "float",
          // the required flag in the item object is ignored by mongoose, but is useful for graphql
          required: true,
          es_indexed: true
        },
        // in the schema and array types, the es_indexed field determines whether the underlying object should be indexed according to the index and anlyzer options specified in the object
        es_indexed: true
      },
      isAmerican: {
        type: "boolean",
        required: true,
        es_indexed: true
      },
      answers: {
        type: "array",
        required: false,
        item: {
          type: "boolean",
          // the required flag in the item object is ignored by mongoose, but is useful for graphql
          required: true,
          es_indexed: true
        },
        es_indexed: true
      },
      start: {
        type: "date",
        required: true,
        es_indexed: true
      },
      starts: {
        type: "array",
        required: true,
        item: {
          type: "date",
          // the required flag in the item object is ignored by mongoose, but is useful for graphql
          required: true,
          es_indexed: true
        },
        // in the schema and array types, the es_indexed field determines whether the underlying object should be indexed according to the index and anlyzer options specified in the object
        es_indexed: true
      },
      spouse: {
        type: "reference",
        required: false,
        ref: "PersonSchema",
        // in the schema and array types, the es_indexed field determines whether the underlying object should be indexed according to the index and anlyzer options specified in the object
        es_indexed: true
      },
      friends: {
        type: "array",
        required: true,
        item: {
          type: "reference",
          // the required flag in the item object is ignored by mongoose, but is useful for graphql
          required: true,
          ref: "PersonSchema",
          // in the schema and array types, the es_indexed field determines whether the underlying object should be indexed according to the index and anlyzer options specified in the object
          es_indexed: true
        },
        es_indexed: true
      },
      contact: {
        type: "reference",
        required: true,
        ref: "ContactSchema",
        // in the schema and array types, the es_indexed field determines whether the underlying object should be indexed according to the index and anlyzer options specified in the object
        es_indexed: true
      },
      addresses: {
        type: "array",
        required: true,
        item: {
          type: "reference",
          // the required flag in the item object is ignored by mongoose, but is useful for graphql
          required: true,
          ref: "AddressSchema",
          // in the schema and array types, the es_indexed field determines whether the underlying object should be indexed according to the index and anlyzer options specified in the object
          es_indexed: true
        },
        // in the schema and array types, the es_indexed field determines whether the underlying object should be indexed according to the index and anlyzer options specified in the object
        es_indexed: true
      }
    }
  }
}
