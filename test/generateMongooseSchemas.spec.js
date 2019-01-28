const expect = require('chai').expect
const generateMongooseSchemas = require('../src/generateMongooseSchemas')
const data = require('./data').generateMongooseSchemas
const errors = require('../src/errors')

describe('generateMongooseSchemas()', () => {
  it('should take valid configuration schemas and return corresponding mongoose schema contents', () => {

    const configurationSchemas = data.configurationSchemas
    const expectedMongooseSchemas = data.expectedMongooseSchemas

    const { generatedSchemaContents } = generateMongooseSchemas(configurationSchemas)

    Object.keys(generatedSchemaContents).forEach(generatedSchemaKey => {
      expect(generatedSchemaContents[generatedSchemaKey]).to.deep.equal(expectedMongooseSchemas[generatedSchemaKey])
    })

  })

  it('should take configuration schemas with undefined references and throw a SchemaError with code undefinedReference', () => {

    const configurationSchemas = data.configurationSchemasWithUndefinedReferences
    const test = () => {
      generateMongooseSchemas(configurationSchemas)
    }

    expect(test).to.throw(errors.SchemaError, /^undefinedReference/)

  })

  it('should take configuration schemas with circular references and throw a SchemaError with code circularReference', () => {

    const configurationSchemas = data.configurationSchemasWithCircularReferences
    const test = () => {
      generateMongooseSchemas(configurationSchemas)
    }

    expect(test).to.throw(errors.SchemaError, /^circularReference/)
  })

  it('should take configuration schemas with required self references and throw a SchemaError with code requiredSelfReference', () => {

    const configurationSchemas = data.configurationSchemasWithRequiredSelfReferences
    const test = () => {
      generateMongooseSchemas(configurationSchemas)
    }

    expect(test).to.throw(errors.SchemaError, /^requiredSelfReference/)
  })

  it('should take configuration schemas with embedded self references and throw a SchemaError with code embeddedSelfReference', () => {

    const configurationSchemas = data.configurationSchemasWithEmbeddedSelfReferences
    const test = () => {
      generateMongooseSchemas(configurationSchemas)
    }

    expect(test).to.throw(errors.SchemaError, /^embeddedSelfReference/)
  })

})
