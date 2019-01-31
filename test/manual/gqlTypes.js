const { GraphQLList, GraphQLObjectType, GraphQLSchema, printSchema } = require('graphql')

const generateGraphqlTypes = require('../../src/generateGraphqlTypes')
const schemas = require('../data/configurationSchemas')

const types = generateGraphqlTypes(schemas, (method, model, root, args, context) => {
	// resolver method goes here
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: Object.keys(types).reduce((accumulator, schemaKey) => {
    accumulator[`findOne${schemaKey}`] = {
      type: types[schemaKey].objectType
    }

    accumulator[`find${schemaKey}`] = {
      type: new GraphQLList(types[schemaKey].objectType)
    }

    return accumulator
  }, {})
})

const schema = new GraphQLSchema({
  query: Query
})

console.log(printSchema(schema))