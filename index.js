const validateSchemas = require('./src/validateSchemas')
const generateMongooseModels = require('./src/generateMongooseModels')
const generateElasticMappings = require('./src/generateElasticMappings')

module.exports = {
  validateSchemas,
  generateMongooseModels,
  generateElasticMappings
}
