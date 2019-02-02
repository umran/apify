const { printSchema } = require('graphql')

const generateGraphqlTypes = require('../../src/generateGraphqlTypes')
const generateGraphqlQueries = require('../../src/generateGraphqlQueries')
const generateGraphqlMutations = require('../../src/generateGraphqlMutations')
const generateGraphqlSchema = require('../../src/generateGraphqlSchema')

const schemas = require('../data/configurationSchemas')

const resolver = (method, model, root, args, context) => {
  // resolver method goes here
}

const types = generateGraphqlTypes(schemas, resolver)
const query = generateGraphqlQueries(schemas, types, resolver)
const mutation = generateGraphqlMutations(schemas, types, resolver)


const schema = generateGraphqlSchema(query, mutation)

console.log(printSchema(schema))