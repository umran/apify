const Schema = require('mongoose').Schema

// expected mongoose schemas
const PersonMongooseSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

const ContactMongooseSchema = new Schema({
  phone: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  }
})

const AddressMongooseSchema = new Schema({
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
})

const ParentMongooseSchema = new Schema({
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

  // collection reference field
  spouse: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'PersonSchema'
  },

  // collection reference array field
  friends: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: 'PersonSchema'
  },

  // embedded reference field
  contact: {
    type: ContactMongooseSchema,
    required: true
  },

  // embedded reference array field
  addresses: {
    type: [AddressMongooseSchema],
    required: true
  }

})

// configuration schemas
const PersonSchema = {
  class: "collection",
  fields: {
    name: {
      type: "string",
      required: true,
      es_indexed: true,
      es_analyzed: true,
      es_keyword: false
    }
  }
}

const ContactSchema = {
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
      es_analyzed: false,
      es_keyword: true
    }
  }
}

const AddressSchema = {
  class: "embedded",
  fields: {
    line_1: {
      type: "string",
      required: true,
      es_indexed: true,
      es_analyzed: false,
      es_keyword: false
    },
    line_2: {
      type: "string",
      required: false,
      es_indexed: true,
      es_analyzed: false,
      es_keyword: false
    },
    city: {
      type: "string",
      required: true,
      es_indexed: true,
      es_analyzed: false,
      es_keyword: false
    },
    postal_code: {
      type: "string",
      required: true,
      es_indexed: true,
      es_analyzed: false,
      es_keyword: false
    },
    province: {
      type: "string",
      required: true,
      es_indexed: true,
      es_analyzed: false,
      es_keyword: false
    }
  }
}

const ParentSchema = {
  class: "collection",
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
      // for the reference and array types, the es_indexed field determines whether the underlying object should be indexed according to the index and anlyzer options specified in the object
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
      // for the reference and array types, the es_indexed field determines whether the underlying object should be indexed according to the index and anlyzer options specified in the object
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
      // for the reference and array types, the es_indexed field determines whether the underlying object should be indexed according to the index and anlyzer options specified in the object
      es_indexed: true
    },
    spouse: {
      type: "reference",
      required: false,
      ref: "PersonSchema",
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
        ref: "PersonSchema",
        // for the reference and array types, the es_indexed field determines whether the underlying object should be indexed according to the index and anlyzer options specified in the object
        es_indexed: true
      },
      // for the reference and array types, the es_indexed field determines whether the underlying object should be indexed according to the index and anlyzer options specified in the object
      es_indexed: true
    },
    contact: {
      type: "reference",
      required: true,
      ref: "ContactSchema",
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
        ref: "AddressSchema",
        // for the reference and array types, the es_indexed field determines whether the underlying object should be indexed according to the index and anlyzer options specified in the object
        es_indexed: true
      },
      // for the reference and array types, the es_indexed field determines whether the underlying object should be indexed according to the index and anlyzer options specified in the object
      es_indexed: true
    }
  }
}

module.exports = {
  expectedMongooseSchemas: {
    PersonMongooseSchema,
    ContactMongooseSchema,
    AddressMongooseSchema,
    ParentMongooseSchema
  },
  configurationSchemas: {
    PersonSchema,
    ContactSchema,
    AddressSchema,
    ParentSchema
  }
}
