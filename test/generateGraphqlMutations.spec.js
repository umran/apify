const expect = require('chai').expect
const generateGraphqlTypes = require('../src/graphql/generateGraphqlTypes')
const generateGraphqlMutations = require('../src/graphql/generateGraphqlMutations')
const data = require('./data').generateGraphqlMutations
const errors = require('../src/errors')
const { GraphQLObjectType } = require('graphql')

describe('generateGraphqlMutations()', () => {
  it('should take valid configuration schemas and return a valid GraphQL object', () => {

    const configurationSchemas = data.configurationSchemas
    const dummyResolver = (method, model, root, args, context) => {
      return 'hello world'
    }

    const graphqlTypes = generateGraphqlTypes(configurationSchemas, dummyResolver)
    const graphqlMutations = generateGraphqlMutations(configurationSchemas, graphqlTypes, dummyResolver)


    expect(graphqlMutations).to.be.instanceOf(GraphQLObjectType)

  })

})
