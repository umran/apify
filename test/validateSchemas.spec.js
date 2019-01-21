const expect = require('chai').expect
const validateSchemas = require('../src/validateSchemas')
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
})
