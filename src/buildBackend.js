const validator = require('./validator')
const mongoose = require('./mongoose')
const elasticsearch = require('./elasticsearch')

module.exports = schemas => {
  // validate schemas
  validator.validateSchemas(schemas)

  // generate mongoose models
  const mongooseSchemas = mongoose.generateMongooseSchemas(schemas)
  const mongoose_models = mongoose.generateMongooseModels(schemas, mongooseSchemas)

  // generate elasticsearch mappings
  const elastic_mappings = elasticsearch.generateElasticMappings(schemas)

  return {
    mongoose_models,
    elastic_mappings
  }
}
