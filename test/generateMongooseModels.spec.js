const expect = require('chai').expect
const generateMongooseSchemas = require('../src/generateMongooseSchemas')
const generateMongooseModels = require('../src/generateMongooseModels')
const data = require('./data').generateMongooseModels
const errors = require('../src/errors')

describe('generateMongooseModels()', () => {
  it('should generate mongoose models for all collection level schemas', () => {

    const configurationSchemas = data.configurationSchemas
    const mongooseSchemas = generateMongooseSchemas(configurationSchemas)

    const generatedModels = generateMongooseModels(configurationSchemas, mongooseSchemas)

    Object.keys(configurationSchemas).forEach(schemaKey => {
      if (configurationSchemas[schemaKey].class === 'collection') {
        expect(generatedModels).to.include.keys(schemaKey)
      }
    })

  })

})
