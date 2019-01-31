// configuration schemas
const Contact = {
  class: "embedded",
  fields: {
    phone: {
      type: "integer",
      required: true,
      es_indexed: true
    },
    email: {
      type: "string",
      required: true,
      es_indexed: true,
      es_keyword: true
    }
  }
}

const Person = {
  class: "collection",
  fields: {
    name: {
      type: "string",
      required: true,
      es_indexed: true,
      es_keyword: false
    },
    contact: {
      type: "reference",
      required: true,
      ref: "Contact",
      es_indexed: true
    },
    parents: {
      type: "array",
      required: true,
      item: {
        type: "association",
        ref: "Parent",
        intransitive: false,
        from: "Parent",
        match: {
          local_field: "id",
          foreign_field: "spouse"
        },
        select: "spouse"
      }
    },
    alias_of: {
      type: "reference",
      required: true,
      ref: "Person",
      es_indexed: true
    }
  }
}

const Address = {
  class: "embedded",
  fields: {
    line_1: {
      type: "string",
      required: true,
      es_indexed: true,
      es_keyword: false
    },
    line_2: {
      type: "string",
      required: false,
      es_indexed: true,
      es_keyword: false
    },
    city: {
      type: "string",
      required: true,
      es_indexed: true,
      es_keyword: false
    },
    postal_code: {
      type: "string",
      required: true,
      es_indexed: true,
      es_keyword: true
    },
    province: {
      type: "string",
      required: true,
      es_indexed: true,
      es_keyword: false
    }
  }
}

const Parent = {
  class: "collection",
  fields: {
    name: {
      type: "string",
      required: true,
      es_indexed: true,
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
        es_keyword: true
      }
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
      }
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
      }
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
      }
    },
    spouse: {
      type: "reference",
      required: false,
      ref: "Person",
      // for the reference and array types, the es_indexed field determines whether the underlying object should be indexed according to the index and anlyzer options specified in the object
      es_indexed: true
    },
    friends: {
      type: "array",
      required: true,
      item: {
        type: "reference",
        // the required flag in the item object is ignored by mongoose, but is useful for graphql
        required: true,
        ref: "Person",
        // for the reference and array types, the es_indexed field determines whether the underlying object should be indexed according to the index and anlyzer options specified in the object
        es_indexed: true
      }
    },
    contact: {
      type: "reference",
      required: true,
      ref: "Contact",
      // for the reference and array types, the es_indexed field determines whether the underlying object should be indexed according to the index and anlyzer options specified in the object
      es_indexed: true
    },
    // a second reference to the same schema is added here to cover additional branches during testing
    otherContact: {
      type: "reference",
      required: true,
      ref: "Contact",
      // for the reference and array types, the es_indexed field determines whether the underlying object should be indexed according to the index and anlyzer options specified in the object
      es_indexed: true
    },
    addresses: {
      type: "array",
      required: true,
      item: {
        type: "reference",
        // the required flag in the item object is ignored by mongoose, but is useful for graphql
        required: true,
        ref: "Address",
        // for the reference and array types, the es_indexed field determines whether the underlying object should be indexed according to the index and anlyzer options specified in the object
        es_indexed: true
      }
    }
  }
}

module.exports = {
  Person,
  Contact,
  Address,
  Parent
}
