const { GraphQLList, GraphQLObjectType, GraphQLSchema, printSchema } = require('graphql')

const generateGraphqlTypes = require('../../src/generateGraphqlTypes')
const generateGraphqlQueries = require('../../src/generateGraphqlQueries')
const generateGraphqlMutations = require('../../src/generateGraphqlMutations')
const schemas = require('../data/configurationSchemas')

const resolver = (method, model, root, args, context) => {
  // resolver method goes here
}

const types = generateGraphqlTypes(schemas, resolver)
const Query = generateGraphqlQueries(schemas, types, resolver)
const Mutation = generateGraphqlMutations(schemas, types, resolver)

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})

console.log(printSchema(schema))