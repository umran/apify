const expect = require('chai').expect
const validateSchemas = require('../src/validator/validateSchemas')
const data = require('./data').validateSchemas
const errors = require('../src/errors')

describe('validateSchemas()', () => {
  it('should validate a valid set of configuration schemas without raising an exception', () => {

    const configurationSchemas = data.validConfigurationSchemas

    const test = () => {
      validateSchemas(configurationSchemas)
    }

    expect(test).to.not.throw()

  })

  it('should throw a SchemaError with a code of validationError on validating an invalid set of configuration schemas', () => {

    const configurationSchemas = data.invalidConfigurationSchemas

    const test = () => {
      validateSchemas(configurationSchemas)
    }

    expect(test).to.throw(errors.SchemaError, /^validationError/)

  })

  it('should take configuration schemas with undefined references and throw a SchemaError with code undefinedReference', () => {

    const configurationSchemas = data.configurationSchemasWithUndefinedReferences
    const test = () => {
      validateSchemas(configurationSchemas)
    }

    expect(test).to.throw(errors.SchemaError, /^undefinedReference/)

  })

  it('should take configuration schemas with circular references and throw a SchemaError with code circularReference', () => {

    const configurationSchemas = data.configurationSchemasWithCircularReferences
    const test = () => {
      validateSchemas(configurationSchemas)
    }

    expect(test).to.throw(errors.SchemaError, /^circularReference/)
  })

  it('should take collection level configuration schemas with required self references and throw a SchemaError with code requiredSelfReference', () => {

    const configurationSchemas = data.configurationSchemasWithRequiredSelfReferences
    const test = () => {
      validateSchemas(configurationSchemas)
    }

    expect(test).to.throw(errors.SchemaError, /^requiredSelfReference/)
  })

  // it('should take configuration schemas with embedded self references and throw a SchemaError with code embeddedSelfReference', () => {
  //
  //   const configurationSchemas = data.configurationSchemasWithEmbeddedSelfReferences
  //   const test = () => {
  //     validateSchemas(configurationSchemas)
  //   }
  //
  //   expect(test).to.throw(errors.SchemaError, /^embeddedSelfReference/)
  // })
})
