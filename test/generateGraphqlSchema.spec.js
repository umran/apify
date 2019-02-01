const expect = require('chai').expect
const generateGraphqlTypes = require('../src/generateGraphqlTypes')
const generateGraphqlQueries = require('../src/generateGraphqlQueries')
const generateGraphqlMutations = require('../src/generateGraphqlMutations')
const generateGraphqlSchema = require('../src/generateGraphqlSchema')
const data = require('./data').generateGraphqlSchema
const errors = require('../src/errors')
const { GraphQLSchema } = require('graphql')

describe('generateGraphqlQueries()', () => {
  it('should take valid configuration schemas and return a valid GraphQL schema', () => {

    const configurationSchemas = data.configurationSchemas
    const dummyResolver = (method, model, root, args, context) => {
      return 'hello world'
    } 

    const graphqlTypes = generateGraphqlTypes(configurationSchemas, dummyResolver)
    const graphqlQueries = generateGraphqlQueries(configurationSchemas, graphqlTypes, dummyResolver)
    const graphqlMutations = generateGraphqlMutations(configurationSchemas, graphqlTypes, dummyResolver)

    const graphqlSchema = generateGraphqlSchema(graphqlQueries, graphqlMutations)
    
    expect(graphqlSchema).to.be.instanceOf(GraphQLSchema)

  })

})