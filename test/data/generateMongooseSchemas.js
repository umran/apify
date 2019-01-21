const Schema = require('mongoose').Schema
const configurationSchemas = require('./configurationSchemas')
const configurationSchemasWithUndefinedReferences = require('./configurationSchemasWithUndefinedReferences')
const configurationSchemasWithCircularReferences = require('./configurationSchemasWithCircularReferences')

// expected mongoose schemas
const ContactSchema = {
  phone: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  }
}

const PersonSchema = {
  name: {
    type: String,
    required: true
  },
  contact: {
    type: ContactSchema,
    required: true
  }
}

const AddressSchema = {
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

const ParentSchema = {
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
    ref: 'PersonSchema'
  },

  // collection reference array field
  friends: {
    type: [{ type: Schema.Types.ObjectId, required: true, ref: 'PersonSchema' }],
    required: true
  },

  // embedded reference fields
  contact: {
    type: ContactSchema,
    required: true
  },

  otherContact: {
    type: ContactSchema,
    required: true
  },

  // embedded reference array field
  addresses: {
    type: [{type: AddressSchema, required: true }],
    required: true
  }

}

module.exports = {
  expectedMongooseSchemas: {
    PersonSchema,
    ContactSchema,
    AddressSchema,
    ParentSchema
  },
  configurationSchemas,
  configurationSchemasWithUndefinedReferences,
  configurationSchemasWithCircularReferences
}
