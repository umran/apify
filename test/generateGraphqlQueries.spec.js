const expect = require('chai').expect
const generateGraphqlTypes = require('../src/graphql/generateGraphqlTypes')
const generateGraphqlQueries = require('../src/graphql/generateGraphqlQueries')
const data = require('./data').generateGraphqlQueries
const errors = require('../src/errors')
const { GraphQLObjectType } = require('graphql')

describe('generateGraphqlQueries()', () => {
  it('should take valid configuration schemas and return a valid GraphQL object', () => {

    const configurationSchemas = data.configurationSchemas
    const dummyResolver = (method, model, root, args, context) => {
      return 'hello world'
    } 

    const graphqlTypes = generateGraphqlTypes(configurationSchemas, dummyResolver)
    const graphqlQueries = generateGraphqlQueries(configurationSchemas, graphqlTypes, dummyResolver)

    
    expect(graphqlQueries).to.be.instanceOf(GraphQLObjectType)

  })

})