const expect = require('chai').expect
const generateMongooseModels = require('../src/generateMongooseModels')
const data = require('./data').generateMongooseModels
const errors = require('../src/errors')

describe('generateMongooseSchemas()', () => {
  it('should generate mongoose models for all collection level schemas', () => {

    const configurationSchemas = data.configurationSchemas

    const generatedModels = generateMongooseModels(configurationSchemas)

    Object.keys(configurationSchemas).forEach(schemaKey => {
      if (configurationSchemas[schemaKey].class === 'collection') {
        expect(generatedModels).to.include.keys(schemaKey)
      }
    })

  })

})
