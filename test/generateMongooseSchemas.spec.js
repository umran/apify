const expect = require('chai').expect
const generateMongooseSchemas = require('../src/generateMongooseSchemas')
const data = require('./data').generateMongooseSchemas
const errors = require('../src/errors')
const MongooseSchema = require('mongoose').Schema

describe('generateMongooseSchemas()', () => {
  it('should take valid configuration schemas and return valid mongoose schemas', () => {

    const configurationSchemas = data.configurationSchemas

    const generatedSchemas = generateMongooseSchemas(configurationSchemas)

    Object.keys(generatedSchemas).forEach(generatedSchemaKey => {
      expect(generatedSchemas[generatedSchemaKey]()).to.be.instanceOf(MongooseSchema)
    })

  })

})
