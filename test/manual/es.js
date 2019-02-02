const generateElasticMappings = require('../../src/generateElasticMappings')
const data = require('../data').generateElasticMappings

const configurationSchemas = data.configurationSchemas
const expectedElasticMappings = data.expectedElasticMappings

const generatedMappings = generateElasticMappings(configurationSchemas)

// Object.keys(generatedMappings).forEach(generatedMappingKey => {
//   console.log(generatedMappings[generatedMappingKey]())
// })

console.log(generatedMappings['Parent']().properties)