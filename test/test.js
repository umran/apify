const expect = require('chai').expect
const generateMongooseSchemas = require('../src/generateMongooseSchemas')
const data = require('./data')

describe('generateMongooseSchemas()', () => {
  it('should take an object containing configuration schemas and return corresponding mongoose schemas', () => {

    // setup test environment
    const configurationSchemas = data.generateMongooseSchemas.configurationSchemas
    const expectedMongooseSchemas = data.generateMongooseSchemas.expectedMongooseSchemas

    // run tests
    const generatedMongooseSchemas = generateMongooseSchemas(configurationSchemas)

    // assert results
    Object.keys(generatedMongooseSchemas).forEach(generatedSchemaKey => {
      expect(generatedMongooseSchemas[generatedSchemaKey]).to.deep.equal(expectedMongooseSchemas[generatedSchemaKey])
    })

  })
})
