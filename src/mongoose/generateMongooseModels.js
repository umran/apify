const mongoose = require('mongoose')
const generateMongooseSchemas = require('./generateMongooseSchemas')

module.exports = (schemas, mongooseSchemas) => {
  return Object.keys(schemas).reduce((accumulator, schemaKey) => {
    if (schemas[schemaKey].class === 'collection') {
      accumulator[schemaKey] = mongoose.model(schemaKey, mongooseSchemas[schemaKey]())
    }

    return accumulator
  }, {})
}
