const expect = require('chai').expect
const generateElasticMappings = require('../src/generateElasticMappings')
const data = require('./data').generateElasticMappings

describe('generateElasticMappings()', () => {
  it('should take valid configuration schemas and return corresponding elastic search mappings', () => {

    const configurationSchemas = data.configurationSchemas
    const expectedElasticMappings = data.expectedElasticMappings

    const generatedMappings = generateElasticMappings(configurationSchemas)

    Object.keys(generatedMappings).forEach(generatedMappingKey => {
      expect(generatedMappings[generatedMappingKey]()).to.deep.equal(expectedElasticMappings[generatedMappingKey])
    })

  })

})
