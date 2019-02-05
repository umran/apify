const { printSchema } = require('graphql')

const generateGraphqlTypes = require('../../src/graphql/generateGraphqlTypes')
const generateGraphqlQueries = require('../../src/graphql/generateGraphqlQueries')
const generateGraphqlMutations = require('../../src/graphql/generateGraphqlMutations')
const generateGraphqlSchema = require('../../src/graphql/generateGraphqlSchema')

const schemas = require('../data/configurationSchemas')

const resolver = (method, model, root, args, context) => {
  // resolver method goes here
}

const types = generateGraphqlTypes(schemas, resolver)
const query = generateGraphqlQueries(schemas, types, resolver)
const mutation = generateGraphqlMutations(schemas, types, resolver)


const schema = generateGraphqlSchema(query, mutation)

console.log(printSchema(schema))