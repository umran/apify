const Schema = require('mongoose').Schema
const configurationSchemas = require('./configurationSchemas')
const configurationSchemasWithUndefinedReferences = require('./configurationSchemasWithUndefinedReferences')
const configurationSchemasWithCircularReferences = require('./configurationSchemasWithCircularReferences')

// expected mongoose schemas
const Contact = {
  phone: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  }
}

const Person = {
  name: {
    type: String,
    required: true
  },
  contact: {
    type: Contact,
    required: true
  }
}

const Address = {
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
}

const Parent = {
  // string field
  name: {
    type: String,
    required: true
  },

  // string array field
  tags: {
    type: [{ type: String, required: true }],
    required: false
  },

  // integer or float field
  age: {
    type: Number,
    required: true
  },

  // integer or float array field
  favourite_numbers: {
    type: [{ type: Number, required: true }],
    required: true
  },

  // boolean field
  isAmerican: {
    type: Boolean,
    required: true
  },

  // boolean array field
  answers: {
    type: [{ type: Boolean, required: true }],
    required: false
  },

  // date field
  start: {
    type: Date,
    required: true
  },

  // date array field
  starts: {
    type: [{ type: Date, required: true }],
    required: true
  },

  // collection reference field
  spouse: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'Person'
  },

  // collection reference array field
  friends: {
    type: [{ type: Schema.Types.ObjectId, required: true, ref: 'Person' }],
    required: true
  },

  // embedded reference fields
  contact: {
    type: Contact,
    required: true
  },

  otherContact: {
    type: Contact,
    required: true
  },

  // embedded reference array field
  addresses: {
    type: [{type: Address, required: true }],
    required: true
  }

}

module.exports = {
  expectedMongooseSchemas: {
    Person,
    Contact,
    Address,
    Parent
  },
  configurationSchemas,
  configurationSchemasWithUndefinedReferences,
  configurationSchemasWithCircularReferences
}
