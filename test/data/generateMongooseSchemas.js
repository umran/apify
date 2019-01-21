const Schema = require('mongoose').Schema
const configurationSchemas = require('./configurationSchemas')
const configurationSchemasWithUndefinedReferences = require('./configurationSchemasWithUndefinedReferences')
const configurationSchemasWithCircularReferences = require('./configurationSchemasWithCircularReferences')

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

module.exports = {
  expectedMongooseSchemas: {
    PersonMongooseSchema,
    ContactMongooseSchema,
    AddressMongooseSchema,
    ParentMongooseSchema
  },
  configurationSchemas,
  configurationSchemasWithUndefinedReferences,
  configurationSchemasWithCircularReferences
}
