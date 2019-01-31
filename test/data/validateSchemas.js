const validConfigurationSchemas = require('./configurationSchemas')
const invalidConfigurationSchemas = require('./invalidConfigurationSchemas')
const configurationSchemasWithUndefinedReferences = require('./configurationSchemasWithUndefinedReferences')
const configurationSchemasWithCircularReferences = require('./configurationSchemasWithCircularReferences')
const configurationSchemasWithRequiredSelfReferences = require('./configurationSchemasWithRequiredSelfReferences')
const configurationSchemasWithEmbeddedSelfReferences = require('./configurationSchemasWithEmbeddedSelfReferences')

module.exports = {
  validConfigurationSchemas,
  invalidConfigurationSchemas,
  configurationSchemasWithUndefinedReferences,
  configurationSchemasWithCircularReferences,
  configurationSchemasWithRequiredSelfReferences,
  configurationSchemasWithEmbeddedSelfReferences
}
