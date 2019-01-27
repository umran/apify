const mongoose = require('mongoose')
const generateMongooseSchemas = require('./generateMongooseSchemas')

module.exports = schemas => {
  const mongooseSchemas = generateMongooseSchemas(schemas).generatedSchemas
  return Object.keys(schemas).reduce((accumulator, schemaKey) => {
    if (schemas[schemaKey].class === 'collection') {
      accumulator[schemaKey] = mongoose.model(schemaKey, mongooseSchemas[schemaKey])
    }

    return accumulator
  }, {})
}