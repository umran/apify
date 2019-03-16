const schemas = require('../data/configurationSchemas.js')

const buildGraphql = require('../../').buildGraphql

const generateResolver = ({ mongoose_models, elastic_mappings, schemas }) => async ({ method, collection, root, args, context }) => {
  return
}

const graphqlSchema = buildGraphql(schemas, generateResolver)
