const expect = require('chai').expect
const generateMongooseSchemas = require('../src/generateMongooseSchemas')
const data = require('./data').generateMongooseSchemas
const errors = require('../src/errors')

describe('generateMongooseSchemas()', () => {
  it('should take valid configuration schemas and return corresponding mongoose schemas', () => {

    const configurationSchemas = data.configurationSchemas
    const expectedMongooseSchemas = data.expectedMongooseSchemas

    const generatedMongooseSchemas = generateMongooseSchemas(configurationSchemas)

    Object.keys(generatedMongooseSchemas).forEach(generatedSchemaKey => {
      expect(generatedMongooseSchemas[generatedSchemaKey]).to.deep.equal(expectedMongooseSchemas[generatedSchemaKey])
    })

  })

  it('should take configuration schemas with undefined references and throw a SchemaError with code unresolvableReference', () => {

    const configurationSchemas = data.configurationSchemasWithUndefinedReferences
    const test = () => {
      generateMongooseSchemas(configurationSchemas)
    }

    expect(test).to.throw(errors.SchemaError, /^unresolvableReference/)

  })

  it('should take configuration schemas with circular references and throw a SchemaError with code unresolvableReference', () => {

    const configurationSchemas = data.configurationSchemasWithCircularReferences
    const test = () => {
      generateMongooseSchemas(configurationSchemas)
    }

    expect(test).to.throw(errors.SchemaError, /^unresolvableReference/)
  })

})
